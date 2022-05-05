import { useCallback, useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import editor from '/editor'
import { changeArrayItemPosition, clone } from '/lib/helpers'
import availableModules from './modules'
import useFirstRender from '/editor/hooks/useFirstRender'
import id from '/editor/lib/id'

export default function Modules({ modules: _modules=[], onChange: _onChange=()=>null }) {

    const {
        Actions,
        Modal,
    } = editor()

    const [ modules, setModules ] = useState(_modules)

    const [ moduleSettings, setModuleSettings ] = useState(false)

    const firstRender = useFirstRender()

    useEffect(() => {
        if(!firstRender) _onChange(modules)
    }, [modules])

    // when new module is added we need to update local state
    useEffect(() => {
        if(_modules.length > modules.length) setModules(_modules)
    }, [_modules])

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

    const onDuplicate = useCallback((key) => {
        setModules(prevModules => {
            const candidate = prevModules.find(m => m._key === key)
            const candidateIndex = prevModules.reduce((acc,m,i) => m._key === key ? i+1 : acc ,prevModules.length)
            const duplicate = { ...clone(candidate), _key: id() }
            return [
                ...prevModules.slice(0, candidateIndex),
                duplicate,
                ...prevModules.slice(candidateIndex)
            ]
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

                const Component = availableModules[module._type].component

                const Settings = availableModules[module._type].settings

                return (
                    <Module
                        key={module._key}
                        className={`module has-actions module-${module._type}`}
                    >
                        <Component module={module} onChange={onChange} />

                        <Actions
                            onMoveUp={index ? () => onMove(module._key, -1) : null}
                            onMoveDown={index < modules.length-1 ? () => onMove(module._key, 1) : null}
                            onCopy={() => onDuplicate(module._key)}
                            onEdit={Settings ? () => setModuleSettings(module._key) : null}
                            onDelete={() => onRemove(module._key)}
                        />

                        {moduleSettings === module._key &&
                            <Modal onClose={() => setModuleSettings(false)} className="p-16">
                                <Settings module={module} onChange={onChange} />
                            </Modal>
                        }

                    </Module>
                )
            })}
        </div>
    )
}

const Module = styled.div`
    position: relative;

`