import editor from '~/editor'


import imageUrlBuilder from '@sanity/image-url'
import { client } from '~/api'
const imageUrl = source => imageUrlBuilder(client).image(source)

export default function Image ({ data, onChange, onMove, onRemove }) {

    const {
        editMode,
        Editable,
        Actions,
    } = editor()

    console.log('Module', data._type, data)

    return(
        <div className="container has-actions mb-60">
            {editMode ?
            <>
                <img
                    className="block clickable"
                    src={imageUrl(data?.asset).auto('format').url()}
                />
            </> :
            <>
                <img
                    className="block clickable"
                    src={imageUrl(data?.asset).auto('format').url()}
                />
            </>}
            <Actions
                onMoveUp={() => onMove(-1)}
                onMoveDown={() => onMove(1)}
                onDelete={onRemove}
            />
        </div>
    )
}