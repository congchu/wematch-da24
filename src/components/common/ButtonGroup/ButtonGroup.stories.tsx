import React from 'react'
import ButtonGroup from './index'
import { withKnobs, array, select } from '@storybook/addon-knobs';

import GlobalStyled from 'styles/global'

export default {
    title: 'components|ButtonGroup',
    component: ButtonGroup,
    decorators: [withKnobs]
};

export const buttonGroup = () => {
    // const defaultValue = ['이사', '원룸', '사무실']
    // const group = array('group', defaultValue)
    const direction = select('direction', ['row', 'column'], 'row');

    return (
        <>
            <GlobalStyled />
            <ButtonGroup direction={direction} />
        </>
    )
};

buttonGroup.story = {
    name: 'Default'
};