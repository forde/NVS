import { styled } from 'linaria/react'
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

export default function Actions ({
    align='top',
    offset='0',
    fixed,
    className,
    ...rest
}) {

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

    return(
        <Wrapper offset={offset} className={`actions ${className || ''} align-${align} ${fixed ? 'fixed' : ''}`} >
            {Object.keys(rest)
                .filter(k => !k.indexOf('on'))
                .filter(k => typeof rest[k] === 'function')
                .map(k => <Button
                    key={k}
                    tertiary
                    small
                    icon={iconMap[k]}
                    onClick={rest[k]}
                />)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    z-index: 20;
    overflow: visible;
    display: flex;
    position: absolute;
    top: ${props => props.offset}px;
    left: calc(50% + 4px);
    transform: translateX(-50%) translateY(-50%);
    width: auto;
    button {
        margin: 0 8px 0 0 ;
        background: #fff;
        &:last-child {
            margin: none;
        }
    }
    &.align-right {
        flex-direction: column;
        top: calc(50% + 4px);
        left: auto;
        right: ${props => props.offset}px;
        transform: translateX(50%) translateY(-50%);
        button {
            margin: 0 0 8px 0;
            background: #fff;
            &:last-child {
                margin: none;
            }
        }
    }
    &.align-bottom {
        top: auto;
        bottom: ${props => props.offset}px;
        left: calc(50% + 4px);
        transform: translateX(-50%) translateY(50%);
    }
    &.align-left {
        flex-direction: column;
        top: calc(50% + 4px);
        left: ${props => props.offset}px;
        transform: translateX(-50%) translateY(-50%);
        button {
            margin: 0 0 8px 0;
            background: #fff;
            &:last-child {
                margin: none;
            }
        }
    }
    &.fixed {
        position: fixed;
    }
`