import Layout from '~/components/Layout'

import editor from '~/components/editor'

export default function New () {

    const { editMode, Input } = editor()

    console.log(editMode, Input);

    return(
        <Layout>
            <div className="container">
                ...
                {editMode && <Input />}
            </div>
        </Layout>
    )
}