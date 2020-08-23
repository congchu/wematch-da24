import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainHeader from './index'

import GlobalStyled from 'styles/global'

export default {
    title: 'components|MainHeader',
    component: MainHeader,
};

export const topHeader = () => {
    return (
        <>
            <GlobalStyled />
            <Router>
                <MainHeader />
            </Router>
        </>
    )
};

topHeader.story = {
    name: 'Default'
};