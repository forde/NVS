import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import slugify from 'slugify'

import ui from '/front/ui'
import { findPageBySlug } from '/api'

import styles from '/front/styles/AdminBar/PageSettings/SlugSettings.module.scss'

let timeout

export default function SlugSettings ({ slug, title, id, onChange }) {

    const [ editedSlug, setEditedSlug ] = useState(null)
    const [ editedSlugValid, setEditedSlugValid ] = useState(null)

    const { Label, Input, Button } = ui()

    useEffect(() => {
        clearTimeout(timeout)
        setEditedSlugValid(null)
        if(editedSlug) {
            timeout  = setTimeout(async () => {
                const check = await findPageBySlug(toSlug(editedSlug))
                setEditedSlugValid(!check.length)
            }, 500)
        }
    }, [editedSlug])

    useEffect(() => {
        if(!title) return onChange(nanoid(6))
        if(!id) {
            timeout  = setTimeout(async () => {
                const check = await findPageBySlug(toSlug(title))
                onChange(!check.length ? toSlug(title) : toSlug(title)+'-'+nanoid(6))
            }, 500)
        }
    }, [title])

    const toSlug = string => slugify(string, { lower: true, locale: 'nb', strict: true })

    const edit = () => setEditedSlug(slug || toSlug(title))

    const cancel = () => {
        setEditedSlug(null)
        setEditedSlugValid(null)
    }

    const set = () => {
        onChange(toSlug(editedSlug))
        setEditedSlug(null)
    }

    return (
        <div className={styles.wrapper}>
            {editedSlug === null && <Label className={styles.slug}>
                {process.env.NEXT_PUBLIC_APP_URL}/<span onClick={edit}>{slug || toSlug(title)}</span>
            </Label>}
            {editedSlug !== null &&
                <div className="flex">
                    <Input
                        small
                        value={editedSlug}
                        onChange={setEditedSlug}
                        className="mr-8"
                    />
                    <Button
                        small
                        secondary
                        disabled={editedSlug === '' || !editedSlugValid}
                        onClick={set}
                        className="mr-8"
                    >Set</Button>
                    <Button
                        small
                        tertiary
                        onClick={cancel}
                    >Cancel</Button>
                </div>
            }
        </div>
    )
}