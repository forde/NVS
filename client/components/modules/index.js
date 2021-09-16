import React, { useState } from 'react'

import editor from '~/editor'
import PageTitle from './PageTitle'

const availableModules = {
    pageTitle: PageTitle
}

export default function Modules({ data=[], page={} }) {

    const { editMode, Button } = editor()

    const [ items, setItems ] = useState(data)

    const changeModule = (key, data) => {
        setItems(items.map(i => i._key !== key ? i : data))
    }

    return(
        <div>
            {items.map(item => {

                if(!availableModules[item._type]) {
                    return <p key="nomodule" style={{color: 'red'}}>Module "{item._type}" does not exist</p>
                }

                return (
                    <div key={item._key} className={'module-'+item._type}>
                        {React.createElement(
                            availableModules[item._type],
                            {
                                data: item,
                                page,
                                onChange: data => changeModule(item._key, data)
                            }
                        )}
                    </div>
                )
            })}

            {editMode &&
                <div className="flex-center-x">
                    <Button tertiary small>Add module</Button>
                </div>
            }

        </div>
    )
}