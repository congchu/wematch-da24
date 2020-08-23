import React from 'react'
import Styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import BottomNav from './index'

import GlobalStyled from 'styles/global'

export default {
    title: 'components|BottomNav',
    component: BottomNav,
    parameters: {
        docs: {
            inlineStories: false
        }
    }
};

export const buttonNav = () => {
    return (
        <>
            <GlobalStyled />
            <Router>
                <BottomNav />
            </Router>
        </>
    )
};

buttonNav.story = {
    name: 'Default'
};