import { useEffect } from "react"
import Router from 'next/router'
import imageUrlBuilder from '@sanity/image-url'

import { client } from '/api'

export const isObject = v => v && v.constructor !== Array && v === Object(v) && typeof v !== 'function' && v instanceof Promise === false && v instanceof Date === false;

export const cookie = {
    set: (cname, cvalue, exdays=1) => {
        if(typeof window === 'undefined') return false
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    get: cname => {
        if(typeof window === 'undefined') return false
        var name = cname + "=";
        return document.cookie.split(';')
            .map(s => s.trim())
            .filter(s => ~s.indexOf(name))
            .map(s => s.replace(name, ''))
            [0] || ''
    },
    getFromString: (cname, string) => {
        if(!string) return ''
        var name = cname + "=";
        return string.split(';')
            .map(s => s.trim())
            .filter(s => ~s.indexOf(name))
            .map(s => s.replace(name, ''))
            [0] || ''
    }
}
export const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export const truncate = (fullStr, strLen) => {
    if(typeof fullStr !== 'string') return ''

    if (fullStr.length <= strLen) return fullStr

    const separator = '...'
    const sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substring(0, frontChars) +
           separator +
           fullStr.substring(fullStr.length - backChars)
}

export const onClickOutside = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) callback()
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    })
}

export const goTo = (path, as, asNewTab) => {
    if(typeof window === 'undefined') return
    if(asNewTab) {
        return window.open(process.env.NEXT_PUBLIC_APP_URL + (as || path), '_blank').focus()
    }
    if(window.event && (window.event.metaKey || window.event.ctrlKey)) {
        return window.open(process.env.NEXT_PUBLIC_APP_URL + (as || path), '_blank')
    }
    Router.push(path, as || path).then(() => window.scrollTo(0, 0))
    return null
}

export const trim2 = val =>  parseInt(val * 100)/100

export const trim1 = val =>  parseInt(val * 10)/10

export const percentOf = (x, y) => Math.ceil((x / (y || 1)) * 100)

export const percentOfPrecise = (x, y) => (x / (y || 1)) * 100

export const percentToNum = (per, max) => Math.ceil((max / 100) * per)

export const percentToNumPrecise = (per, max) => (max / 100) * per

export const getPixelRatio = () => {
    const ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1

    return dpr / bsr
}

export const imageUrl = source => imageUrlBuilder(client).image(source)

export const clone = object => JSON.parse(JSON.stringify(object))

export const changeArrayItemPosition = (array, currentIndex, newIndex) => {
    let _array = [...array]
    const a = _array[currentIndex]
    const b = _array[newIndex]
    if(!a || !b) return array
    _array[currentIndex] = b
    _array[newIndex] = a
    return _array
}