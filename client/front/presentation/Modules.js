import { useCallback, useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import ui from '/front/ui'
import { changeArrayItemPosition, clone } from '/front/lib/helpers'

import useFirstRender from '/front/lib/hooks/useFirstRender'
import id from '/front/lib/id'

export default function Modules({ modules: _modules=[], moduleMap={}, onChange: _onChange=()=>null }) {

    const {
        Actions,
        Modal,
    } = ui()

    const [ modules, setModules ] = useState([])

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
        <div className="ft-modules">
            {modules.map((module, index) => {

                if(!moduleMap[module._type]) {
                    console.warn({ module, moduleMap }, `Module type "${module._type}" does not exist in module map`)
                    return null
                }

                const Component = moduleMap[module._type].component

                const Settings = moduleMap[module._type].settings

                return (
                    <Module
                        key={module._key+'-'+index}
                        className={`ft-module module-${module._type}`}
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
                            <Modal
                                onClose={() => setModuleSettings(false)}
                                title={moduleMap[module._type].title+' module'}
                            >
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