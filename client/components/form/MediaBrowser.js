import { useRef, useState, useCallback, useEffect } from 'react'
import { styled } from 'linaria/react'
import imageUrlBuilder from '@sanity/image-url'
import { MdSearch, MdKeyboardBackspace, MdDesktopMac, MdPhoneIphone } from 'react-icons/md'
import { curry } from 'ramda'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import Modal from '~/components/Modal'
import { getImages, client } from '~/api'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import { percentOfPrecise, percentToNumPrecise, truncate, bytesToSize, trim2 } from '~/lib/helpers'
import useWindowWidth from '~/hooks/useWindowWidth'
import { colors } from '~/styles'
import Loader from './Loader'
import ConfirmButton from './ConfirmButton'

export default function MediaBrowser ({ onClose, onUse, image, withSizeSettings }) {

    const defaultImageMeta = {
        title: image?.title || '',
        alt: image?.alt || '',
        preferredWidth: image?.preferredWidth || '800',
    }

    const [ search, setSearch ] = useState('')
    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ deleting, setDeleting ] = useState(false)
    const [ uploads, setUploads ] = useState([])
    const [ selectedImage, setSelectedImage ] = useState(image?.asset || null)
    const [ selectedImageMeta, setSelectedImageMeta ] = useState(defaultImageMeta)
    const [ ratioLock, setRatioLock ] = useState(trim2(16/9))
    const [ imageEditorMaxWidth, setImageEditorMaxWidth ] = useState('100%')

    const [ crop, setCrop ] = useState({ aspect: trim2(16/9) })
    const [ completedCrop, setCompletedCrop ] = useState(null)

    const croppedImageRef = useRef(null)
    const imageContainerRef = useRef(null)
    const fileInputRef = useRef(null)
    const uploadsStateRef = useRef()

    uploadsStateRef.current = uploads

    const windowWidth = useWindowWidth()

    const debug = false

    const imageUrl = source => imageUrlBuilder(client).image(source)

    const updateImageMeta = curry((key, val) => setSelectedImageMeta({ ...selectedImageMeta, [key]: val }))

    const getData = async () => {
        if(image) return // dont load assets when dealing with edited image only
        const resp = await getImages({ search })
        setLoading(false)
        if(Array.isArray(resp)) setImages(resp)
    }

    useEffect(() => {
        if(!image || !image.crop || !croppedImageRef.current) return
        const { top, left, bottom, right } = image.crop
        const x = percentToNumPrecise((left*100), croppedImageRef.current.width)
        const y = percentToNumPrecise((top*100), croppedImageRef.current.height)
        const width = croppedImageRef.current.width - x - percentToNumPrecise((right*100), croppedImageRef.current.width)
        const height = croppedImageRef.current.height - y - percentToNumPrecise((bottom*100), croppedImageRef.current.height)
        const unit = 'px'
        const ratio = trim2(width/height)

        setRatioLock(ratio)
        setCrop({ x, y, width, height, unit, ratio })
        setCompletedCrop({ x, y, width, height, unit, ratio })

    }, [croppedImageRef.current])

    useEffect(() => {
        getData()
    }, [search])

    useEffect(() => {
        if(uploads.length && uploads.every(u => u._id)) {
            setTimeout(async () => {
                await getData()
                setUploads([])
            }, 1000)
        }
    }, [uploads])

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
        setCrop({ ...crop, aspect: ratioLock })
    }, [ratioLock])

    const onImageClick = image => {
        if(!image._id) return null
        setSelectedImage(image)
    }

    const backToImageGrid = () => {
        setSelectedImage(null)
        setSelectedImageMeta(defaultImageMeta)
        setCrop({ aspect: ratioLock })
        setCompletedCrop(null)
    }

    const formData = data => {
        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        return formData
    }

    const onFileSelected = async e => {

        if(!e.target.files.length) return

        const files = Array.from(e.target.files)

        setUploads(files)

        files.forEach((file, i) => {
            fetch('/api/sanity/image', {
                method: 'PUT',
                body: formData({ file, filename: file.name })
            })
                .then(response => response.json())
                .then(data => {
                    const replaceUploaded = upload => upload.name === data?.originalFilename ? data : upload
                    setUploads(uploadsStateRef.current.map(replaceUploaded))
                })
        })
    }

    const useImage = async () => {

        let data = {
            _type: 'image',
            asset: {
                ...selectedImage
            },
            ...selectedImageMeta,
        }

        if(completedCrop?.width && completedCrop?.height) {
            const left = percentOfPrecise(completedCrop.x, croppedImageRef.current.width) / 100
            const top = percentOfPrecise(completedCrop.y, croppedImageRef.current.height) / 100
            const right = ((100 - percentOfPrecise(completedCrop.width, croppedImageRef.current.width)) / 100) - left
            const bottom = ((100 - percentOfPrecise(completedCrop.height, croppedImageRef.current.height)) / 100) - top

            const height = percentOfPrecise(completedCrop.height, croppedImageRef.current.height) / 100
            const width = percentOfPrecise(completedCrop.width, croppedImageRef.current.width) / 100
            const x = width / 2
            const y = height / 2

            data.crop = { _type: 'sanity.imageCrop', top, left, bottom, right }
            data.hotspot = { _type: 'sanity.imageHotspot', x, y, width, height }
        }

        onUse(data)
    }

    const deleteImage = async () => {

        setDeleting(true)

        await (await fetch('/api/sanity/image', {
            method: 'DELETE',
            body: formData({
                id:  selectedImage._id,
                title: selectedImageMeta.title,
                alt: selectedImageMeta.alt,
            })
        })).json()

        await getData()

        setDeleting(false)
        backToImageGrid()
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
                                multiple
                                onChange={onFileSelected}
                                accept="image/jpeg, image/jpg, image/png, image/heif, image/heic"
                            />
                        </> : <>
                            {!image && <Button tertiary small icon={MdKeyboardBackspace} onClick={backToImageGrid}/>}
                        </>
                    }
                </div>

                {!image && loading && 'Loading...'}

                {!selectedImage ?
                    <ul className="image-grid">
                        {[...uploads, ...images].map((image, i) => {
                            return(
                                <li
                                    key={i}
                                    className={!image._id ? 'upload' : ''}
                                    onClick={() => onImageClick(image)}
                                >
                                    {image._id && <img src={imageUrl(image).width(300).url()} />}
                                    {!image._id && <Loader color="black"/>}
                                </li>
                            )
                        })}
                    </ul>
                    :
                    <div className="image-details">
                        <div className="image-container" ref={imageContainerRef}>
                            <ImageEditor debug={debug} style={{maxWidth:imageEditorMaxWidth}}>
                                <ReactCrop
                                    src={imageUrl(selectedImage).width(1000).url()}
                                    crop={crop}
                                    onChange={setCrop}
                                    onImageLoaded={onImageReadyToCrop}
                                    onComplete={setCompletedCrop}
                                    units="%"
                                    crossorigin="Anonymous"
                                    ruleOfThirds={true}
                                />
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
                                        { name: '16:9', value: trim2(16/9) },
                                        { name: '4:3', value: trim2(4/3) },
                                        { name: '3:4', value: trim2(3/4) },
                                        { name: '9:16', value: trim2(9/16) },
                                        { name: '1:1', value: 1 }
                                    ]}
                                />
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
                                {withSizeSettings &&
                                    <div className="size-settings mb-24 flex">
                                        <div className="flex align-center">
                                            <MdDesktopMac style={{minWidth:'24px', marginRight: '4px'}}/>
                                            <Input small suffix="px" value={selectedImageMeta.preferredWidth} onChange={updateImageMeta('preferredWidth')} />
                                        </div>
                                        <div className="flex align-center">
                                            <MdPhoneIphone style={{minWidth:'24px', marginLeft: '4px'}}/>
                                            <Input small suffix="%" disabled value="100" onChange={_=>null} />
                                        </div>
                                    </div>
                                }
                                <Button
                                    small
                                    onClick={useImage}
                                    className="w-100 mb-24"
                                >Use image</Button>
                                <ConfirmButton
                                    small
                                    secondary
                                    onConfirm={deleteImage}
                                    fullWidth
                                    busy={deleting}
                                >Delete image</ConfirmButton>
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
        height: 36px;
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
            position: relative;
            transition: border .2s ease-in-out;
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
            @media(max-width: 767px) {
                width: calc(33.33% - 16px);
            }
            &.upload {
                background: ${colors.lightGray}
            }
            img {
                display: block;
                margin: 0;
                max-width: 100%;
                max-height: 100%;
                border: 3px solid transparent;
                cursor: pointer;
                &:hover {
                    border: 3px solid ${colors.ui};
                }
            }
        }
    }
    .image-details {
        display: flex;
        height: 100%;
        .image-container {
            width: calc(100% - 316px);
            display: flex;
            align-items: center;
            justify-content: center;
            height:100%;
            position:relative;
            background-color: #e6e8ec;
            background-image: linear-gradient(45deg, #fafafa 25%, transparent 25%),
                              linear-gradient(-45deg, #fafafa 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, #fafafa 75%),
                              linear-gradient(-45deg, transparent 75%, #fafafa 75%);
            background-size: 16px 16px;
            background-position: 0 0,0 8px,8px -8px,-8px 0;
        }
        .details-container {
            width: 300px;
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