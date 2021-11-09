import { createElement, useState, useEffect } from 'react'

import { clone, changeArrayItemPosition } from '~/lib/helpers'
import PageTitle from './PageTitle'

const availableModules = {
    pageTitle: PageTitle
}

export default function Modules({ data=[] }) {

    const [ modules, setModules ] = useState([])

    // clone and store module data as state so it can be manipulated
    useEffect(() => setModules(clone(data || [])), [data])

    // update module data in local state
    const changeModule = (key, data) => setModules(modules.map(i => i._key !== key ? i : data))

    const removeModule = (key) => setModules(modules.filter(i => i._key !== key))

    // dir = 1 | -1
    const moveModule = (key, dir) => {
        const currentIndex = modules.reduce((acc, module, i) => module._key !== key ? acc : i, -1)
        const newIndex = dir === -1 ? currentIndex - 1 : currentIndex + 1
        setModules(changeArrayItemPosition(modules, currentIndex, newIndex))
    }

    return(
        <div>
            {modules.map(module => {

                if(!availableModules[module._type]) {
                    return <p key="nomodule" style={{color: 'red'}}>Module "{module._type}" does not exist</p>
                }

                return (
                    <div key={module._key} className={'module-'+module._type}>
                        {createElement(
                            availableModules[module._type],
                            {
                                data: module,
                                onChange: data => changeModule(module._key, data),
                                onMove: dir => moveModule(module._key, dir),
                                onRemove: () => removeModule(module._key)
                            }
                        )}
                    </div>
                )
            })}

        </div>
    )
}