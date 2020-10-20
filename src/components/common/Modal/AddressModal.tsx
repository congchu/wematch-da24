import React, { useState, useEffect } from 'react'

import Styled from 'styled-components'

import BaseModal from './ModalTemplate'
import Input from 'components/common/Input'
import List from 'components/common/List'

import { ItemsProps } from 'components/common/List'

import { useDispatch, useSelector } from 'react-redux'
import * as commonActions from 'store/common/actions'
import * as commonSelector from 'store/common/selectors'
import * as colors from 'styles/colors'

interface Props {
    /** 모달 visible */
    visible: boolean
    /** 타이틀 */
    title: string;
    /** 닫기 버튼 이벤트 정의 */
    onClose?: () => void;
    /** 오버레이 클릭 시 이벤트 정의 */
    onOverlayClose?: () => void;
    /** 클릭 이벤트 정의 */
    onClick?: () => void;
    /** Select 이벤트 정의 */
    onSelect?: (data: string) => void;
    /** 확인 버튼 이벤트 정의 */
    onConfirm?: () => void;
}

const S = {
    Container: Styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 35px 24px 6px;
    `,
    Empty: Styled.div`
        padding: 26px 0 0 16px;    
        letter-spacing: -1px;
        .title {
            font-size: 18px;
            color: ${colors.gray33};
        }
        .text {
            font-size: 13px;
            color: ${colors.gray66};
        }
        em {
            color: ${colors.pointBlue};
        }
    `
}

const AddressModal: React.FC<Props> = (props) => {
    const {
        visible = false,
        title,
        onClose,
        onOverlayClose,
        onClick,
        onConfirm,
        onSelect
    } = props

    const dispatch = useDispatch()
    const getAddressList = useSelector(commonSelector.getAddressList)

    const [items, setItems] = useState<ItemsProps[]>([])
    const [dong, setDong] = useState<string>('')

    useEffect(() => {
        if (getAddressList.data && !getAddressList.loading) {
            const newAddressList = getAddressList.data.map((address, idx) => {
                return {
                    id: idx,
                    label: `${address.sido} ${address.gugun} <em>${address.dong}</em>`,
                    value: `${address.sido} ${address.gugun} ${address.dong}`
                }
            })
            setItems(newAddressList)
        }
    }, [getAddressList])

    useEffect(() => {
        return () => setItems([])
    }, [visible])

    const requestAddressList = (dong: string) => {
        dispatch(commonActions.fetchAddressListAsync.request({
            dong
        }))
    }

    return (
        <BaseModal visible={visible} title={title} onClose={onClose} onOverlayClose={onOverlayClose} onConfirm={onConfirm} footer={false}>
            <S.Container>
                <Input theme="default" placeholder="읍/면/동으로 검색" icon="search" onChange={(e) => {
                    setDong(e.target.value)
                }} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        requestAddressList(dong)
                    }
                }} onKeyUp={(e) => {
                    if (dong.length >= 2) {
                        requestAddressList(dong)
                    }
                }} />
                {getAddressList.data?.length === 0 ? (
                    <S.Empty>
                        <p className="title">검색결과가 없습니다 </p>
                        <p className="text"><em>동(읍/면) 주소로 검색</em>하세요 </p>
                    </S.Empty>
                ) : (
                    <List type="address" direction="column" items={items} onClick={onClick} onSelect={onSelect} />
                )}
            </S.Container>
        </BaseModal>
    )
}

export default AddressModal
