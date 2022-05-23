import { useRef, useEffect } from 'react'
import {
    MdAutorenew,
    MdBuild,
    MdDeleteForever,
    MdHelpOutline,
    MdHighlightOff,
    MdClear,
    MdNoteAdd,
    MdLaunch,
    MdSettings,
    MdSearch,
    MdToc,
    MdVisibility,
    MdAdd,
    MdContentCopy,
    MdAttachFile,
    MdInsertLink,
    MdPhoneIphone,
    MdLaptop,
    MdColorLens,
    MdKeyboardArrowDown,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardArrowUp,
} from 'react-icons/md'

import Button from './Button'

import styles from '/front/styles/ui/Actions.module.scss'

export default function Actions ({
    align='top',
    fixed,
    className,
    ...rest
}) {

    const actionsRef = useRef(null)

    const iconMap = {
        onrefresh: MdAutorenew,
        onBild: MdBuild,
        onDelete: MdDeleteForever,
        onHelp: MdHelpOutline,
        onClear: MdHighlightOff, //MdClear,
        onExternal: MdLaunch,
        onEdit: MdSettings,
        onSearch: MdSearch,
        onList: MdToc,
        onPreview: MdVisibility,
        onAdd: MdAdd,
        onCopy: MdContentCopy,
        onAtach: MdAttachFile,
        onLink: MdInsertLink,
        onPhone: MdPhoneIphone,
        onDesktop: MdLaptop,
        onColor: MdColorLens,
        onAddPage: MdNoteAdd,
        onMoveDown: MdKeyboardArrowDown,
        onMoveLeft: MdKeyboardArrowLeft,
        onMoveRight: MdKeyboardArrowRight,
        onMoveUp: MdKeyboardArrowUp,
    }

    useEffect(() => {
        const parentEl = actionsRef?.current?.parentNode
        if(parentEl && !parentEl.classList.contains('has-front-actions')) {
            parentEl.classList.add('has-front-actions')
        }
    }, [actionsRef])

    return (
        <>
            <style jsx global>{`
                .has-front-actions {
                    position: relative;
                }
                .has-front-actions > .front-actions {
                    opacity: 0;
                    visibility: hidden;
                }
                .has-front-actions:hover > .front-actions {
                    opacity: 1;
                    visibility: visible;
                }
            `}</style>
            <div
                ref={actionsRef}
                className={[
                    'front-actions',
                    className,
                    styles.wrapper,
                    align === 'top' && styles.alignTop,
                    align === 'bottom' && styles.alignBottom,
                    align === 'left' && styles.alignLeft,
                    align === 'right' && styles.alignRight,
                    fixed && styles.fixed,
                ].filter(x=>x).join(' ')}
            >
                {Object.keys(rest)
                    .filter(k => !k.indexOf('on'))
                    .filter(k => typeof rest[k] === 'function')
                    .map(k => <Button
                        key={k}
                        secondary
                        sharp
                        medium
                        icon={iconMap[k]}
                        onClick={rest[k]}
                    />)}
            </div>
        </>
    )
}