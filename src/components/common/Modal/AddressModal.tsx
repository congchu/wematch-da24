import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'

import List from 'components/common/List'

import { ItemsProps } from 'components/common/List'

import { useDispatch, useSelector } from 'react-redux'
import * as commonActions from 'store/common/actions'
import * as commonSelector from 'store/common/selectors'
import * as colors from 'styles/colors'
import PopupTemplate from "../../wematch-ui/PopupTemplate";
import {Icon} from "../../wematch-ui";
import { useMedia } from 'react-use-media'

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
    Container: styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-top: 56px;
    `,
    Header: styled.div`
        padding: 16px 24px;
        border-bottom: 0.5px solid #D7DBE2;
        background: white;
    `,
    Empty: styled.div`
        text-align: center;
        margin-top: 40px;    
        letter-spacing: -1px;
        color: ${colors.gray33};
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        em {
            font-weight: 600;
        }
    `,
    Title: styled.h1`
        color: ${colors.gray33};
        font-size: 24px;
        font-weight: bold;
        line-height: 36px;
        margin-bottom:25px;
    `,
    InputContainer: styled.div`
        position: relative;
        display: block;
        
        svg {
          position: absolute;
          right: 15px;
          bottom: 24px;
        }
        
        input {
            width: 100%;
            height: 56px;
            //background: white;
            border-radius: 8px;
            margin-bottom: 8px;
            padding: 0 16px 0 16px;
            line-height: 56px;
            font-size: 15px;
            overflow: hidden;
            letter-spacing: -1px;
            cursor: pointer;
            box-sizing: border-box;
            color: ${colors.gray88};
            box-sizing: border-box;
            border: 1px solid ${colors.lineDefault};

            &:focus {
                border: solid 1px ${colors.pointBlue};
            }
        }
    `,
    Content: styled.div`
        padding: 0 24px;
        min-height: calc(100% - 157px - 56px);
        
        @media screen and (min-width: 768px) {
          min-height: calc(480px - 157px - 56px);
        }
    `,
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
    const headerRef = useRef<HTMLDivElement | null>(null)
    const getAddressList = useSelector(commonSelector.getAddressList)
    const [items, setItems] = useState<ItemsProps[]>([])
    const [dong, setDong] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isMobile = useMedia({
        maxWidth: 767,
    })

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

    useEffect(() => {
        if(dong.length > 0) {
            dispatch(commonActions.fetchAddressListAsync.request({
                dong
            }))
        } else {
            setItems([])
        }
    }, [dispatch, dong]);


    const handleOnChange = debounce((address: string) => {
        setDong(address);
    }, 500)

    useEffect(() => {
        const keyboardOffEvent = () => {
            inputRef.current?.blur();
        }
        if(visible && isMobile)  {
            document.addEventListener('touchstart', keyboardOffEvent)
        } 
        return () => { document.removeEventListener('touchstart', keyboardOffEvent) }
    }, [visible])

    return (
        <PopupTemplate visible={visible} onClose={onClose}>
            <S.Container>
                <S.Header ref={headerRef}>
                    <S.Title>주소검색</S.Title>
                    <S.InputContainer>
                        <input placeholder="읍/면/동까지만 입력해주세요"
                               type="text"
                               ref={inputRef}
                               onChange={(e) => handleOnChange(e.target.value)}
                               autoFocus={true}
                               onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                   if (e.key === 'Enter') {
                                        const ev = e.target as HTMLInputElement
                                        handleOnChange.cancel();
                                        setDong(ev.value);
                                   }
                               }}
                        />
                        <div>
                            <Icon.Search size={24}/>
                        </div>
                    </S.InputContainer>
                </S.Header>
                <S.Content>
                    {getAddressList.data?.length === 0 && dong.length > 0 && !getAddressList.loading ? (
                      <S.Empty>
                          <p><em>'{dong}'</em>에 대한 검색 결과가 없습니다.
                              <br/>정확한 읍/면/동(지번)주소로 다시 검색해주세요.
                          </p>
                      </S.Empty>
                    ) : (
                      <List type="address" direction="column" items={items} onClick={onClick} onSelect={onSelect}/>
                    )}
                </S.Content>
            </S.Container>
        </PopupTemplate>
    )
}

export default AddressModal
