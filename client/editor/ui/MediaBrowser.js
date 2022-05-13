import { useRef, useState, useCallback, useEffect } from 'react'
import { styled } from 'linaria/react'
import imageUrlBuilder from '@sanity/image-url'
import { MdSearch, MdKeyboardBackspace, MdDesktopMac, MdPhoneIphone } from 'react-icons/md'
import { curry } from 'ramda'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import Modal from './Modal'
import { getImages, getImageMeta, client } from '/api'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import { percentOfPrecise, percentToNumPrecise, truncate, bytesToSize, trim2 } from '/editor/lib/helpers'
import useWindowWidth from '/editor/lib/hooks/useWindowWidth'
import useFirstRender from '/editor/lib/hooks/useFirstRender'
import { colors } from '/styles'
import Loader from './Loader'
import ConfirmButton from './ConfirmButton'

/*
Props:
    onClose: Function (required) - responsible for changing parent state & hiding media browser
    selectedImage - Object of {
        _id: String (required),
        crop: Object (optional),
        hotspot: Object (optional) ,
        title: String (optional),
        alt: String (optional)
    }
    onUse: Function (required) - returns image object (same structure as "image" prop.) selected & edited from media browser
*/

export default function MediaBrowser ({ onClose, onUse, selectedImage: _selectedImage, withSizeSettings }) {

    const [ search, setSearch ] = useState('')
    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ deleting, setDeleting ] = useState(false)
    const [ uploads, setUploads ] = useState([])
    const [ selectedImage, setSelectedImage ] = useState(null)
    const [ selectedImageTitle, setSelectedImageTitle ] = useState('')
    const [ selectedImageAlt, setSelectedImageAlt ] = useState('')
    const [ desktopWidth, setDesktopWidth ] = useState('')
    const [ mobileWidth, setMobileWidth ] = useState('')
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

    const firstRender = useFirstRender()

    const debug = false

    useEffect(() => {
        if(!selectedImage || !selectedImage.crop || !croppedImageRef.current) return

        const { top, left, bottom, right } = selectedImage.crop
        const x = percentToNumPrecise((left*100), croppedImageRef.current.width)
        const y = percentToNumPrecise((top*100), croppedImageRef.current.height)
        const width = croppedImageRef.current.width - x - percentToNumPrecise((right*100), croppedImageRef.current.width)
        const height = croppedImageRef.current.height - y - percentToNumPrecise((bottom*100), croppedImageRef.current.height)
        const unit = 'px'
        const aspect = trim2(width/height)

        setRatioLock(aspect)
        setCrop({ x, y, width, height, unit, aspect })
        setCompletedCrop({ x, y, width, height, unit, aspect })

    }, [croppedImageRef.current])

    useEffect(() => {

        if(!_selectedImage) {
            fetchImages()
            return
        }

        if(_selectedImage) {

            if(!_selectedImage?.metadata) {
                (async () => {
                    const metadata = await getImageMeta(_selectedImage?._id)
                    console.log('Image metadata fetched', metadata);
                    setSelectedImage({ ..._selectedImage, ...(metadata || {}) })
                })()
            } else {
                setSelectedImage(_selectedImage)
            }

            if(_selectedImage?.title) setSelectedImageTitle(_selectedImage.title)
            if(_selectedImage?.alt) setSelectedImageAlt(_selectedImage.alt)

        }

    }, [])

    useEffect(() => {
        if(!firstRender) fetchImages()
    }, [search])

    useEffect(() => {
        if(uploads.length && uploads.every(u => u._id)) {
            setTimeout(async () => {
                await fetchImages()
                setUploads([])
            }, 1000)
        }
    }, [uploads])

    useEffect(() => {
        if(!selectedImage || !imageContainerRef.current || !selectedImage.metadata) return
        const ratio = selectedImage.metadata?.dimensions?.aspectRatio
        const imageWidth = imageContainerRef.current.offsetHeight * ratio
        setImageEditorMaxWidth(`${imageWidth}px`)
    }, [selectedImage, windowWidth])

    useEffect(() => {
        setCrop({ ...crop, aspect: ratioLock })
    }, [ratioLock])

    const onImageReadyToCrop = useCallback(img => {
        img.crossOrigin = 'Anonymous'
        croppedImageRef.current = img
    }, [])

    const imageUrl = source => imageUrlBuilder(client).image(source)

    const fetchImages = async () => {
        const resp = await getImages({ search })
        setLoading(false)
        if(Array.isArray(resp)) setImages(resp)
    }

    const onImageClick = clickedImage => {
        if(!clickedImage._id) return
        setSelectedImage(clickedImage)
    }

    const backToImageGrid = () => {
        setSelectedImage(null)
        setSelectedImageTitle('')
        setSelectedImageAlt('')
        setCrop({ aspect: ratioLock })
        setCompletedCrop(null)
        setRatioLock(trim2(16/9))
        fetchImages()
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

    const onCropRatioChange = value => {
        setRatioLock(value)
        setCrop({ aspect: value })
        setCompletedCrop(null)
    }

    const useImage = async () => {

        let data = {
            _id: selectedImage._id,
            title: selectedImageTitle,
            alt: selectedImageAlt,
        }

        // add desktopWidth
        // add mobileWidth

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
            body: formData({ id:  selectedImage._id })
        })).json()

        await fetchImages()

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
                            <Button tertiary small icon={MdKeyboardBackspace} onClick={backToImageGrid}/>
                        </>
                    }
                </div>

                {!_selectedImage && loading && 'Loading...'}

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
                                    src={imageUrl({
                                        ...selectedImage,
                                        crop: null, // we always show full image here so discard crop/hotspot if any
                                        hotspot: null, // we always show full image here so discard crop/hotspot if any
                                    }).width(1000).url()}
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
                                    {selectedImage.metadata?.dimensions?.width} / {selectedImage.metadata?.dimensions?.height} px<br/>
                                    {bytesToSize(selectedImage.size || 0)}
                                </span>
                                <Select
                                    small
                                    className="mb-24"
                                    label="Crop ratio"
                                    value={ratioLock}
                                    onChange={onCropRatioChange}
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
                                    value={selectedImageTitle}
                                    onChange={val => setSelectedImageTitle(val)}
                                />
                                <Input
                                    small
                                    className="mb-24"
                                    label="Image alt text"
                                    value={selectedImageAlt}
                                    onChange={val => setSelectedImageAlt(val)}
                                />
                                {withSizeSettings &&
                                    <div className="size-settings mb-24 flex">
                                        <div className="flex align-center">
                                            <MdDesktopMac style={{minWidth:'24px', marginRight: '4px'}}/>
                                            <Input small suffix="px" value={desktopWidth} onChange={setDesktopWidth} />
                                        </div>
                                        <div className="flex align-center">
                                            <MdPhoneIphone style={{minWidth:'24px', marginLeft: '4px'}}/>
                                            <Input small suffix="px" value={mobileWidth} onChange={setMobileWidth} />
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