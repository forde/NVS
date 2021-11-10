import { createElement, useCallback } from 'react'

import { changeArrayItemPosition } from '~/lib/helpers'
import availableModules from './modules'

export default function Modules({ modules=[], setModules=()=>null }) {

    const onChange = useCallback((key, data) => {
        setModules(modules.map(m => m._key === key ? { ...m, ...data } : m))
    }, [])

    const onMove = useCallback((key, dir) => {
        // dir = 1 | -1
        const currentIndex = modules.reduce((acc, m, i) => m._key === key ? i : acc, -1)
        const newIndex = dir === -1 ? currentIndex - 1 : currentIndex + 1
        setModules(changeArrayItemPosition(modules, currentIndex, newIndex))
    }, [])

    const onRemove = useCallback((key) => {
        setModules(modules.filter(m => m._key !== key))
    }, [])

    return (
        <div>
            {modules.map(module => {

                if(!availableModules[module._type]) {
                    return <p key="nomodule" style={{color: 'red'}}>Module "{module._type}" does not exist</p>
                }

                return (
                    <div key={module._key} className={'module-'+module._type}>
                        {createElement(
                            availableModules[module._type].component,
                            {
                                module,
                                onChange,
                                onMove,
                                onRemove,
                            }
                        )}
                    </div>
                )
            })}

        </div>
    )
}