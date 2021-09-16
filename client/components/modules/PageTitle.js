import editor from '~/editor'

export default function PageTitle ({ data, page, onChange }) {

    const {
        editMode,
        Editable,
    } = editor()

    console.log('Module', data.type, data, page)

    const title = data.content || page.title

    return(
        <div className="container">
            {editMode ? <Editable
                value={title}
                onChange={val => onChange({ ...data, content: val })}
                placeholder="Page title"
                className="h-large"
            /> : <h1>{title}</h1>}
        </div>
    )
}