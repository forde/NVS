import { useRef, useState, useCallback, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { MdSearch, MdKeyboardBackspace, MdDesktopMac, MdPhoneIphone } from 'react-icons/md'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import Modal from './Modal'
import { getImages, getImageMeta, client } from '/api'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import { percentOfPrecise, percentToNumPrecise, truncate, bytesToSize, trim2 } from '/front/lib/helpers'
import useWindowWidth from '/front/lib/hooks/useWindowWidth'
import useFirstRender from '/front/lib/hooks/useFirstRender'
import Loader from './Loader'
import ConfirmButton from './ConfirmButton'

import styles from '/front/styles/ui/MediaBrowser.module.scss'

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
                    //console.log('Image metadata fetched', metadata);
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

    const onImageReadyToCrop = useCallback(e => {
        e.target.crossOrigin = 'Anonymous'
        croppedImageRef.current = e.target
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
        <Modal
            onClose={onClose}
            width="90vw"
            height="90vh"
            title={selectedImage ? 'Image settings' : 'Media browser'}
            toolbarChildren={<>
                {selectedImage ? (
                    <Button secondary small icon={MdKeyboardBackspace} onClick={backToImageGrid} children="Back to media browser" />
                ) : (
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
                            secondary
                            onClick={() => fileInputRef.current.click()}
                        >Upload image</Button>
                        <input
                            ref={fileInputRef}
                            style={{ position: 'fixed', top: '-100em'}}
                            type="file"
                            multiple
                            onChange={onFileSelected}
                            accept="image/jpeg, image/jpg, image/png, image/heif, image/heic"
                        />
                    </>
                )}
            </>}
        >
            <div className={styles.wrapper}>
                {!_selectedImage && loading && 'Loading...'}
                {!selectedImage ?
                    <ul className={styles.imageGrid}>
                        {[...uploads, ...images].map((image, i) => {
                            return(
                                <li
                                    key={i}
                                    className={!image._id ? styles.gridItemBusy : ''}
                                    onClick={() => onImageClick(image)}
                                >
                                    {image._id && <img src={imageUrl(image).width(300).url()} />}
                                    {!image._id && <Loader color="black"/>}
                                </li>
                            )
                        })}
                    </ul>
                    :
                    <div className={styles.imageDetails}>
                        <div className={styles.imageContainer} ref={imageContainerRef}>
                            <div className="front-image-editor" style={{maxWidth:imageEditorMaxWidth}}>
                                <ReactCrop
                                    crop={crop}
                                    onChange={setCrop}
                                    onComplete={setCompletedCrop}
                                    units="%"
                                    crossorigin="Anonymous"
                                    ruleOfThirds={true}
                                    aspect={ratioLock}
                                >
                                    <img
                                        src={imageUrl({
                                            ...selectedImage,
                                            crop: null, // we always show full image here so discard crop/hotspot if any
                                            hotspot: null, // we always show full image here so discard crop/hotspot if any
                                        }).width(1200).url()}
                                        onLoad={onImageReadyToCrop}
                                    />
                                </ReactCrop>
                                <canvas/>
                            </div>
                        </div>
                        <div className={styles.detailsContainer}>
                            <div>
                                <span>
                                    {truncate(selectedImage.originalFilename, 30)}<br/>
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
                                    medium
                                    className="mb-24"
                                    label="Image title"
                                    value={selectedImageTitle}
                                    onChange={val => setSelectedImageTitle(val)}
                                />
                                <Input
                                    medium
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
                                    medium
                                    onClick={useImage}
                                    className="w-100i mb-24"
                                >Use image</Button>
                                <ConfirmButton
                                    medium
                                    secondary
                                    onConfirm={deleteImage}
                                    fullWidth
                                    busy={deleting}
                                >Delete image</ConfirmButton>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Modal>
    )
}