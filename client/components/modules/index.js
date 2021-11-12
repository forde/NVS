import { createElement, useCallback, useState, useEffect } from 'react'

import editor from '~/editor'
import { changeArrayItemPosition } from '~/lib/helpers'
import availableModules from './modules'

export default function Modules({ modules: _modules=[], onChange: _onChange=()=>null }) {

    const {
        editMode,
        Actions,
    } = editor()

    const [ modules, setModules ] = useState(_modules)

    useEffect(() => {
        _onChange(modules)
    }, [modules])

    const onChange = useCallback((key, data) => {
        setModules(prevModules => prevModules.map(m => m._key === key ? { ...m, ...data } : m))
    }, [])

    const onMove = useCallback((key, dir) => {
        setModules(prevModules => {
            // dir = 1 | -1
            const currentIndex = prevModules.reduce((acc, m, i) => m._key === key ? i : acc, -1)
            const newIndex = dir === -1 ? currentIndex - 1 : currentIndex + 1
            return changeArrayItemPosition(prevModules, currentIndex, newIndex)
        })
    }, [])

    const onRemove = useCallback((key) => {
        setModules(prevModules => prevModules.filter(m => m._key !== key))
    }, [])

    return (
        <div>
            {modules.map((module, index) => {

                if(!availableModules[module._type]) {
                    return <p key="nomodule" style={{color: 'red'}}>Module "{module._type}" does not exist</p>
                }

                const PreloadedActions = (moduleActions={}) => <Actions
                    onMoveUp={index ? () => onMove(module._key, -1) : null}
                    onMoveDown={index < modules.length-1 ? () => onMove(module._key, 1) : null}
                    onDelete={() => onRemove(module._key)}
                    {...moduleActions}
                />

                return (
                    <div key={module._key} className={'module-'+module._type}>
                        {createElement(
                            availableModules[module._type].component,
                            {
                                module,
                                onChange,
                                onMove,
                                onRemove,
                                Actions: PreloadedActions
                            }
                        )}
                    </div>
                )
            })}

        </div>
    )
}