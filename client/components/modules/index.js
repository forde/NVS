import { createElement, useState, useEffect } from 'react'

import { clone, changeArrayItemPosition } from '~/lib/helpers'
import PageTitle from './PageTitle'

const availableModules = {
    pageTitle: PageTitle
}

export default function Modules({ data=[] }) {

    const [ items, setItems ] = useState([])

    // clone and store module data as state so it can be manipulated
    useEffect(() => setItems(clone(data || [])), [data])

    // update module data in local state
    const changeModule = (key, data) => setItems(items.map(i => i._key !== key ? i : data))

    const removeModule = (key) => setItems(items.filter(i => i._key !== key))

    // dir = 1 | -1
    const moveModule = (key, dir) => {
        const currentIndex = items.reduce((acc, item, i) => item._key !== key ? acc : i, -1)
        const newIndex = dir === -1 ? currentIndex - 1 : currentIndex + 1
        setItems(changeArrayItemPosition(items, currentIndex, newIndex))
    }

    return(
        <div>
            {items.map(item => {

                if(!availableModules[item._type]) {
                    return <p key="nomodule" style={{color: 'red'}}>Module "{item._type}" does not exist</p>
                }

                return (
                    <div key={item._key} className={'module-'+item._type}>
                        {createElement(
                            availableModules[item._type],
                            {
                                data: item,
                                onChange: data => changeModule(item._key, data),
                                onMove: dir => moveModule(item._key, dir),
                                onRemove: () => removeModule(item._key)
                            }
                        )}
                    </div>
                )
            })}

        </div>
    )
}