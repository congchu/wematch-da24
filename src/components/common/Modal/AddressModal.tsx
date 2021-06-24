import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use-media'
import { DebounceInput } from 'react-debounce-input'
import { isEmpty } from 'lodash'

import List from 'components/common/List'
import PopupTemplate from 'components/wematch-ui/PopupTemplate'
import { Icon } from 'components/wematch-ui'

import * as commonActions from 'store/common/actions'
import * as commonSelector from 'store/common/selectors'
import { CNT_PER_PAGE } from 'store/common/reducers'
import {Juso, JusoType} from 'store/common/types'
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
    onSelect?: (juso: Juso, type: JusoType) => void;
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
        margin-top: 24px;    
        letter-spacing: -1px;
        color: ${colors.gray33};
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        em {
            font-weight: 600;
        }
        p {
          border-bottom: 1px solid ${colors.lineDeco};
          margin: 0 24px;
          padding-bottom: 22px;
        }
    `,
    Title: styled.h1`
        color: ${colors.gray33};
        font-size: 20px;
        font-weight: bold;
        line-height: 36px;
        margin-bottom:17px;
    `,
    InputContainer: styled.div`
        position: relative;
        display: block;
        
        /* svg {
          position: absolute;
          right: 15px;
          bottom: 24px;
        } */
        
        input {
            width: 100%;
            height: 56px;
            //background: white;
            border-radius: 8px;
            margin-bottom: 8px;
            padding: 0 16px 0 16px;
            line-height: 56px;
            font-size: 16px;
            overflow: hidden;
            letter-spacing: -1px;
            cursor: pointer;
            box-sizing: border-box;
            color: ${colors.gray33};
            border: 1px solid ${colors.lineDefault};

            &:focus {
                border: solid 1px ${colors.pointBlue};
            }
        }
    `,
    IconWrapper: styled.div`
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        //width: 56px;
        padding-bottom: 5px;
        right: 16px;
        bottom: 0;
    `,
    Content: styled.div`
        min-height: calc(100% - 157px - 56px);
        @media screen and (min-width: 768px) {
          min-height: calc(480px - 157px - 56px);
        }
    `,
    Tip: styled.div`
      font-style: normal;
      font-weight: normal;
      margin: 24px 24px 0;
      .title {
        font-weight: bold;
        font-size: 16px;
        line-height: 23px;
        color: ${colors.gray33};
        margin-bottom: 8px;
      }
      .desc {
        font-size: 14px;
        line-height: 21px;
      }
      ul {
        list-style-type : disc;
        padding-left: 14px;
      }
    `
}

const AddressModal: React.FC<Props> = (props) => {
    const {
        visible = false,
        title,
        onClose,
        onClick,
        onSelect
    } = props

    const dispatch = useDispatch()
    const headerRef = useRef<HTMLDivElement | null>(null)
    const getAddressList = useSelector(commonSelector.getAddressList)
    const [road, setRoad] = useState<string>('')
    // const [currPage, setCurrPage] = useState(1)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isMobile = useMedia({
        maxWidth: 767,
    })
    const currPage = useRef(1)

    useEffect(() => {
        return () => {
            setRoad('')
            dispatch(commonActions.resetAddressList())
        }
    }, [visible])

    useEffect(() => {
        if(road.length > 1) {
            dispatch(commonActions.fetchAddressListAsync.request({
                keyword: road,
                currPage: currPage.current,
                cntPerPage: CNT_PER_PAGE
            }))
        }
        if (road?.length <= 1) {
            dispatch(commonActions.resetAddressList())
        }
    }, [dispatch, road]);

    const handleOnChange = (address: string) => {
        setRoad(address);
        currPage.current = 1
    }

    const handleOnReset = () => {
        setRoad('')
        dispatch(commonActions.resetAddressList())
    }

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
                    <S.Title>{title}</S.Title>
                    <S.InputContainer>
                        <DebounceInput
                            placeholder='도로명, 지번, 건물명(2글자 이상)'
                            autoFocus
                            inputRef={inputRef}
                            debounceTimeout={500}
                            onChange={(e) => handleOnChange(e.target.value)}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    const ev = e.target as HTMLInputElement
                                    setRoad(ev.value);
                                    inputRef?.current?.blur()
                                }
                            }}
                            style={{ paddingRight: 85 }}
                            value={road}
                        />
                        {!isEmpty(road) && (
                            <S.IconWrapper style={{ right: 56, cursor: 'pointer' }} onClick={handleOnReset}>
                                <Icon.Cancel />
                            </S.IconWrapper>
                        )}
                        <S.IconWrapper onClick={e => e.preventDefault()}>
                            <Icon.Search size={24}/>
                        </S.IconWrapper>
                    </S.InputContainer>
                </S.Header>
                <S.Content>
                    {getAddressList?.data?.length === 0 && road?.length > 1 && !getAddressList.loading ? (
                        <S.Empty>
                            <p>
                                {getAddressList.error?.code === 'E0006' ?
                                    <><em>시도명</em>으로 검색할 수 없습니다.<br/></> : <><em>‘{road}'</em>검색 결과가 없습니다<br/></>}
                                정확한 도로명, 번지, 건물명으로 다시 검색해주세요.
                            </p>
                        </S.Empty>
                    ) : (
                        <List
                            addresses={getAddressList?.data}
                            onClick={onClick}
                            onSelect={onSelect}
                            style={{padding: '0 24px'}}
                            loading={getAddressList.loading}
                            onMoreAddresses={() => {
                                if (getAddressList.hasMore && !getAddressList.loading) {
                                    currPage.current++;
                                    dispatch(commonActions.fetchAddressMoreListAsync.request({
                                        keyword: road,
                                        currPage: currPage.current,
                                        cntPerPage: CNT_PER_PAGE
                                    }))
                                }
                            }
                        }/>
                    )}
                    {isEmpty(getAddressList?.data) && (
                        <S.Tip>
                            <h2 className="title">주소검색 Tip</h2>
                            <ul className="desc">
                                <li>도로명 + 건물번호 (예 : 테헤란로20길 9)</li>
                                <li>지번(동/읍.면/리) + 번지수 (예 : 역삼동 736-17)</li>
                                <li>건물명, 아파트명 (예 : 동궁빌딩)</li>
                            </ul>
                        </S.Tip>
                    )}
                </S.Content>
            </S.Container>
        </PopupTemplate>
    )
}

export default AddressModal
