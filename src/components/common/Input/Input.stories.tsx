import React from 'react'
import Input from './index'
import Styled from 'styled-components'

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import GlobalStyled from 'styles/global'

export default {
    title: 'ReviewItem|Input',
    component: Input,
    decorators: [withKnobs]
};

export const defaultInput = () => {
    const theme = select('theme', ['default', 'primary'], 'default')
    const placeholder = text('text', '연락처(-없이 입력)')
    const disabled = boolean('disabled', false)
    const border = boolean('border', false)

    return (
        <>
            <GlobalStyled />
            <Input theme={theme} onChange={action('onChange')} placeholder={placeholder} border={border} disabled={disabled} />
        </>
    )
};

defaultInput.story = {
    name: 'Default Input'
};

export const primaryInput = () => {
    return (
        <>
            <GlobalStyled />
            <Input theme="primary" onChange={action('onChange')} placeholder="이사 예정일" />
        </>
    )
}

export const disabledInput = () => {
    return (
        <>
            <GlobalStyled />
            <Input theme="default" onChange={action('onChange')} placeholder="이사 예정일" disabled />
        </>
    )
}

export const borderInput = () => {
    return (
        <>
            <GlobalStyled />
            <Input theme="default" onChange={action('onChange')} placeholder="이사 예정일" border />
        </>
    )
}

export const inputWithSearchIcon = () => {
    return (
        <>
            <GlobalStyled />
            <Input theme="default" onChange={action('onChange')} placeholder="이사 예정일" icon="search" />
        </>
    )
}