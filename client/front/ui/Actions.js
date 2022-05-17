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
                    secondary
                    sharp
                    medium
                    icon={iconMap[k]}
                    onClick={rest[k]}
                />)}
        </Wrapper>
    )
}

const spacing = 0

const Wrapper = styled.div`
    z-index: 20;
    overflow: visible;
    display: flex;
    position: absolute;
    top: ${props => props.offset}px;
    left: calc(50% + ${spacing/2}px);
    transform: translateX(-50%) translateY(-50%);
    width: auto;
    button {
        margin: 0 ${spacing}px 0 0 ;
        &:last-child {
            margin: none;
        }
    }
    &.align-right {
        flex-direction: column;
        top: calc(50% + ${spacing/2}px);
        left: auto;
        right: ${props => props.offset}px;
        transform: translateX(50%) translateY(-50%);
        button {
            margin: 0 0 ${spacing}px 0;
            &:last-child {
                margin: none;
            }
        }
    }
    &.align-bottom {
        top: auto;
        bottom: ${props => props.offset}px;
        left: calc(50% + ${spacing/2}px);
        transform: translateX(-50%) translateY(50%);
    }
    &.align-left {
        flex-direction: column;
        top: calc(50% + ${spacing/2}px);
        left: ${props => props.offset}px;
        transform: translateX(-50%) translateY(-50%);
        button {
            margin: 0 0 ${spacing}px 0;
            &:last-child {
                margin: none;
            }
        }
    }
    &.align-center {
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    &.fixed {
        position: fixed;
    }
`