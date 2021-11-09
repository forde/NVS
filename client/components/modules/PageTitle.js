import editor from '~/editor'

export default function PageTitle ({ data, onChange, onMove, onRemove }) {

    const {
        editMode,
        Editable,
        Actions,
    } = editor()

    //console.log('Module', data._type, data)

    const title = data.content || ''

    return(
        <div className="container has-actions mb-60">
            {editMode ? <Editable
                value={title}
                onChange={val => onChange({ ...data, content: val })}
                placeholder="Page title"
                className="h-large"
            /> : <h1>{title}</h1>}
            <Actions
                onMoveUp={() => onMove(-1)}
                onMoveDown={() => onMove(1)}
                onDelete={onRemove}
            />
        </div>
    )
}