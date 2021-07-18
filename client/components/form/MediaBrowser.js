import { useRef, useState, useCallback, useEffect } from 'react'
import { styled } from 'linaria/react'
import imageUrlBuilder from '@sanity/image-url'
import { MdSearch, MdKeyboardBackspace } from 'react-icons/md'
import { curry } from 'ramda'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { v4 as uuid } from 'uuid'

import Modal from '~/components/Modal'
import { getImages, client } from '~/api'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import { getPixelRatio, percentOf, percentToNum, truncate, bytesToSize } from '~/lib/helpers'
import useWindowWidth from '~/hooks/useWindowWidth'
import { colors } from '~/styles'

export default function MediaBrowser ({ onClose }) {

    const [ search, setSearch ] = useState('')
    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ selectedImage, setSelectedImage ] = useState(null)
    const [ selectedImageMeta, setSelectedImageMeta ] = useState({ title: '', alt: ''})
    const [ ratioLock, setRatioLock ] = useState(16 / 9)
    const [ imageEditorMaxWidth, setImageEditorMaxWidth ] = useState('100%')

    const [ crop, setCrop ] = useState({ aspect: 16 / 9 })
    const [ completedCrop, setCompletedCrop ] = useState(null)
    const [ saving, setSaving ] = useState(false)

    const croppedImageRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const imageContainerRef = useRef(null)
    const fileInputRef = useRef(null)

    const windowWidth = useWindowWidth()

    const debug = false

    const imageUrl = source => imageUrlBuilder(client).image(source)

    const updateImageMeta = curry((key, val) => setSelectedImageMeta({ ...selectedImageMeta, [key]: val }))

    useEffect(() => {
        (async () => {
            const resp = await getImages({ search })
            setLoading(false)
            if(Array.isArray(resp)) setImages(resp)
        })()
    }, [search])

    const onImageReadyToCrop = useCallback(img => {
        img.crossOrigin = 'Anonymous'
        croppedImageRef.current = img
    }, [])

    useEffect(() => {
        if(!selectedImage || !imageContainerRef.current) return
        const imageWidth = imageContainerRef.current.offsetHeight * selectedImage.metadata.dimensions.aspectRatio
        setImageEditorMaxWidth(`${imageWidth}px`)
    }, [selectedImage, windowWidth])

    useEffect(() => {
        if(debug && croppedImageRef.current && previewCanvasRef.current && completedCrop?.width) getCroppedImg()
    }, [completedCrop])

    useEffect(() => {
        setCrop({ aspect: ratioLock })
    }, [ratioLock])

    const getCroppedImg = () => {
        const image = croppedImageRef.current
        const canvas = previewCanvasRef.current
        const crop = completedCrop

        const ctx = canvas.getContext('2d')
        const pixelRatio = getPixelRatio()

        const x1 = Math.round(percentToNum( percentOf(crop.x, image.width), image.naturalWidth ))
        const y1 = Math.round(percentToNum( percentOf(crop.y, image.height), image.naturalHeight ))
        const w1 = Math.round(percentToNum( percentOf(crop.width, image.width), image.naturalWidth ))
        const h1 = Math.round(percentToNum( percentOf(crop.height, image.height), image.naturalHeight ))

        canvas.width = Math.round(w1 * pixelRatio)
        canvas.height = Math.round(h1 * pixelRatio)

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = 'high'

        ctx.drawImage(image, x1, y1, w1, h1, 0, 0, w1, h1)

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if(!blob) return
                blob.name = 'image-'+uuid()
                resolve(blob)
            }, selectedImage.mimeType, 1)
        })
    }

    const saveCroppedImage = async () => {

        if(saving) return

        setSaving(true)

        const newImage = await getCroppedImg()
        if(newImage) {
            /*const upload = await api.media.customerUpload(newImage)
            setSaving(false)
            if(upload?.id) {
                onChange(images.map((file, i) => i === current ? { url: upload.url, name: upload.fileName } : file))
                setEditedImage(null)
                setCrop({ aspect: 16 / 9 })
            }*/
            console.log(newImage);
        }
    }

    const backToImageGrid = () => {
        setSelectedImage(null)
        setSelectedImageMeta({ title: '', alt: ''})
        setCrop({ aspect: ratioLock })
        setCompletedCrop(null)
    }

    const onFileSelected = async e => {

        const file = e.target.files[0]

        if(!file) return

        const resp = await client.assets.upload('image', file, { filename: file.name })

        console.log(resp);

    }

    const useImage = () => {

    }

    const deleteImage = () => {

    }

    return(
        <Modal onClose={onClose} width="90vw" height="90vh">
            <Wrapper>
                <div className="top-bar flex">
                    {!selectedImage ?
                        <>
                            <Input
                                icon={MdSearch}
                                small
                                className="search-input mr-16"
                                placeholder="Search"
                                value={search}
                                onChange={setSearch}
                            />
                            <Button
                                small
                                onClick={() => fileInputRef.current.click()}
                                className="mr-16"
                            >Upload image</Button>
                            <input
                                ref={fileInputRef}
                                style={{ position: 'fixed', top: '-100em'}}
                                type="file"
                                onChange={onFileSelected}
                                accept="image/jpeg, image/jpg, image/png, image/heif, image/heic"
                            />
                        </> : <>
                            <Button tertiary small icon={MdKeyboardBackspace} onClick={backToImageGrid}/>
                        </>
                    }
                </div>

                {loading && 'Loading...'}

                {!selectedImage ?
                    <ul className="image-grid">
                        {images.map(image => {
                            return(
                                <li width={[2,4,6]} key={image._id} onClick={() => setSelectedImage(image)}>
                                    <img src={imageUrl(image).width(300).url()} />
                                </li>
                            )
                        })}
                    </ul>
                    :
                    <div className="image-details">
                        <div className="image-container" ref={imageContainerRef}>
                            <ImageEditor debug={debug} style={{maxWidth:imageEditorMaxWidth}}>
                                <ReactCrop
                                    src={imageUrl(selectedImage).width(800).url()}
                                    crop={crop}
                                    onChange={setCrop}
                                    onImageLoaded={onImageReadyToCrop}
                                    onComplete={setCompletedCrop}
                                    units="%"
                                    crossorigin="Anonymous"
                                    ruleOfThirds={true}
                                />
                                <canvas ref={previewCanvasRef} />
                            </ImageEditor>
                        </div>
                        <div className="details-container">
                            <div>
                                <span>
                                    {truncate(selectedImage.originalFilename, 35)}<br/>
                                    {selectedImage.metadata.dimensions.width} / {selectedImage.metadata.dimensions.height} px<br/>
                                    {bytesToSize(selectedImage.size)}
                                </span>
                                <Select
                                    small
                                    className="mb-24"
                                    label="Crop ratio"
                                    value={ratioLock}
                                    onChange={setRatioLock}
                                    style={{minWidth:'100%', width:'100%'}}
                                    options={[
                                        { name: '16:9', value: 16/9 },
                                        { name: '4:3', value: 4/3 },
                                        { name: '3:4', value: 3/4 },
                                        { name: '9:16', value: 9/16 },
                                        { name: '1:1', value: 1 }
                                    ]}
                                />
                                <Button
                                    tertiary
                                    small
                                    busy={saving}
                                    disabled={!(completedCrop?.width > 0)}
                                    onClick={saveCroppedImage}
                                    className="w-100 mb-24"
                                >Crop & save</Button>
                                <Input
                                    small
                                    className="mb-24"
                                    label="Image title"
                                    value={selectedImageMeta.title}
                                    onChange={updateImageMeta('title')}
                                />
                                <Input
                                    small
                                    className="mb-24"
                                    label="Image alt text"
                                    value={selectedImageMeta.alt}
                                    onChange={updateImageMeta('alt')}
                                />
                                <Button
                                    small
                                    onClick={useImage}
                                    className="w-100 mb-24"
                                >Use image</Button>
                                <Button
                                    small
                                    secondary
                                    onClick={deleteImage}
                                    className="w-100"
                                >Delete image</Button>
                            </div>
                        </div>
                    </div>
                }

            </Wrapper>
        </Modal>
    )
}

const Wrapper = styled.div`
    padding: 16px;
    position: relative;
    height: calc(100% - 36px - 16px);
    .top-bar {
        margin-bottom:16px;
        .search-input {
            width: 200px;
        }
    }
    .image-grid {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding:0;
        width: calc(100% + 16px);
        margin-left: -8px;
        margin-right: -8px;
        li {
            list-style: none;
            margin: 0 8px 16px 8px;
            width: calc(16.66% - 16px);
            border: 1px dotted red;
            position: relative;
            transition: border .2s ease-in-out;
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                display: block;
                margin: 0;
                max-width: 100%;
                max-height: 100%;
                border: 3px solid transparent;
                cursor: pointer;
                &:hover {
                    border: 3px solid ${colors.main};
                }
            }
        }
    }
    .image-details {
        display: flex;
        height: 100%;
        .image-container {
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: center;
            height:100%;
            position:relative;
        }
        .details-container {
            width: 30%;
            padding-left:16px;
            height: 100%;
            > div {
                background: ${colors.lighterGray};
                border-radius: 10px;
                border: 1px solid ${colors.lightGray};
                padding: 16px;
                > span {
                    font-size: 16px;
                    color: gray;
                    line-height: 1.3;
                    margin-bottom: 20px;
                    display: block;
                    -webkit-font-smoothing: antialiased;
                }
            }
        }
    }
`

const ImageEditor = styled.div`
    position: relative;
    display: flex;
    margin: auto;
    max-height: 100%;
    .ReactCrop {
        max-height:100%;
        > div {
            height: 100%;
            width: fit-content;
            img {
                max-height: 100%;
            }
        }
    }
    .ReactCrop__drag-elements,
    .ReactCrop__rule-of-thirds-hz,
    .ReactCrop__rule-of-thirds-vt {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    canvas {
        position: fixed;
        top: 0;
        left: ${props => props.debug ? '0px' : '-99999px'};
        border: 1px solid black;
        z-index: -1;
    }
`