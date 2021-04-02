import React, { useState } from 'react'
import Styled from 'styled-components'
import { Provider } from 'react-redux'

import Button from 'components/common/Button';
import Modal from './ModalTemplate'
import CalendarModal from './CalendarModal';
import AddressModal from './AddressModal';
// import PhoneVerifyPopup from '../Popup/PhoneVerifyPopup'
import BasePopupTemplate from '../Popup/PopupTemplate'
import TermsModal from './TermsModal'

import { withKnobs } from '@storybook/addon-knobs'

import GlobalStyled from 'styles/global'
import store from 'store/index'

export default {
    title: 'ReviewItem|Modal',
    component: Modal,
    decorators: [withKnobs],
    parameters: {
        docs: {
            inlineStories: false
        }
    }
};

const CalendarModalSample = () => {
    const [visible, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle}>켈린더 모달 오픈</Button>
            <CalendarModal title="이사 예정일은 언제인가요?" visible={visible} onOverlayClose={toggle} onClose={toggle} />
        </>
    )
}

const AddressModalSample = () => {
    const [visible, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle}>주소 모달 오픈</Button>
            <AddressModal visible={visible} title="주소 검색" onOverlayClose={toggle} onClose={toggle} />
        </>
    )
}

const PhoneModalSample = () => {
    const [visible, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle}>핸드폰 인증 모달 오픈</Button>
                {/* <PhoneVerifyPopup visible={visible} phone="01012341234" onClose={toggle} /> */}
        </>
    )
}

const TermsModalSample = () => {
    const [visible, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle}>약관동의 모달창 오픈</Button>
            <TermsModal visible={visible} onClose={toggle} />
        </>
    )
}

const BaseTemplateSample = () => {
    const [visible, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!visible);

    return (
        <>
            <Button theme="primary" onClick={toggle}>테스트 인증 모달 오픈</Button>
            <BasePopupTemplate visible={visible} />
        </>
    )
}

const S = {
    Container: Styled.div`
      button + button {
        margin-top: 15px;
      }
    `
}

export const modal = () => {
    return (
        <>
            <GlobalStyled />
            <S.Container>
                <CalendarModalSample />
                <AddressModalSample />
                <PhoneModalSample />
                <BaseTemplateSample />
                <TermsModalSample />
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