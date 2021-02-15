import React, { useState } from 'react'
import Styled from 'styled-components'

import Button from "components/common/Button"
import Popup from './PopupTemplate'
import PopupTemplate from './PopupTemplate'
import PhoneVerifyPopup from './PhoneVerifyPopup'
import NoticePopup from './NoticePopup';

import { withKnobs } from '@storybook/addon-knobs'

import GlobalStyled from 'styles/global'
import {Provider} from "react-redux";

import store from 'store/index'

export default {
    title: 'ReviewItem|Popup',
    component: Popup,
    decorators: [withKnobs],
    parameters: {
        docs: {
            inlineStories: false
        }
    }
};

const BasePopupSample = () => {
    const [visible, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle} style={{ margin: '5px' }}>기본 팝업창 오픈</Button>
            <PopupTemplate visible={visible} onOverlayClose={toggle}>
                이 부분에 내용이 들어갑니다.
            </PopupTemplate>
        </>
    )
}

const PhoneVerifyPopupSample = () => {
    const [visible, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle} style={{ margin: '5px' }}>핸드폰 인증 팝업창 오픈</Button>
            <PhoneVerifyPopup visible={visible} phone="01012341234" onClose={toggle} />
        </>
    )
}


const NotificationPopupSample = () => {
    const [visible, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle} style={{ margin: '5px' }}>예/아니오 팝업창 오픈</Button>
            <NoticePopup visible={visible} onClose={toggle} border footerButton />
        </>
    )
}

const S = {
    Container: Styled.div``
}

export const modal = () => {
    return (
        <>
            <GlobalStyled />
            <S.Container>
                <BasePopupSample />
                <PhoneVerifyPopupSample />
                <NotificationPopupSample />
            </S.Container>
        </>
    )
};

modal.story = {
    name: 'Default',
    decorators: [(storyFn: any) => (
        <Provider store={store}>
            {storyFn()}
        </Provider>
    )]
};