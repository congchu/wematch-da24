import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useMedia} from 'react-use-media';
import useHashToggle from 'hooks/useHashToggle'

import MainHeader from 'components/common/MainHeader';
import NavHeader from 'components/common/NavHeader';
import Input from 'components/common/Input'
import {SoldOut} from 'components/Icon'
import CalendarModal from 'components/common/Modal/CalendarModal'
import {CalendarDate} from 'components/wematch-ui/utils/date'

import * as formActions from 'store/form/actions'
import * as formSelectors from 'store/form/selectors'
import * as formSelector from 'store/form/selectors'

import {CALENDAR_MAX_DAYS} from 'constants/values';
import {MOVE_URL} from 'constants/env'
import {dataLayer} from 'lib/dataLayerUtil'
import {events} from 'lib/appsflyer'
import {isExceedDiffDay} from 'lib/dateUtil'


const S = {
    Container: styled.div``,
    Contents: styled.div`
      margin-top: 96px;
      text-align: center;
      letter-spacing: -0.5px;

      svg {
        display: block;
        margin: 0 auto;
        @media screen and (max-width: 320px) {
          width: 80px;
          height: 80px;
        }
      }

      @media screen and (min-width: 1200px) {
        margin: 172px 0 63px;
      }
      @media screen and (max-width: 320px) {
        margin-top: 46px;
      }
    `,
    Title: styled.strong`
      display: inline-block;
      margin-top: 20px;
      font-size: 16px;
      line-height: 22px;
      @media screen and (max-width: 320px) {
        margin-top: 6px;
        font-size: 15px;
      }
    `,
    Subtext: styled.p`
      margin-top: 10px;
      font-size: 15px;
      color: #666;
      line-height: 22px;
      @media screen and (max-width: 320px) {
        margin-top: 6px;
        font-size: 14px;
        line-height: 20px;
      }
    `,
    ChangeDate: styled.div`
      margin-top: 34px;
      padding: 0 24px;
      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0 auto;
      }
      @media screen and (max-width: 320px) {
        margin-top: 22px;
      }
    `,
    DateTitle: styled.strong`
      display: inline-block;
      margin-bottom: 14px;
      font-size: 15px;
      font-weight: 700;
      @media screen and (max-width: 320px) {
        margin-bottom: 10px;
      }
    `,
    DateSelect: styled.button`
      width: 100%;
      height: 56px;
      margin: 10px 0 4px;
      font-size: 18px;
      font-weight: 700;
      border-radius: 6px;
      color: #fff;
      background: #1672F7;
      box-shadow: 0 4px 10px rgba(22, 114, 247, 0.25);
      @media screen and (min-width: 1200px) {
        margin: 22px 0 13px;
      }
      @media screen and (max-width: 320px) {
        height: 50px;
        font-size: 16px;
      }
    `,
    LinkAlarm: styled.a`
      display: inline-block;
      width: 100%;
      height: 36px;
      padding-top: 20px;
      font-size: 15px;
      text-align: center;
      text-decoration: underline;
      letter-spacing: -0.5px;
      cursor: pointer;
    `,
}


export default function NoPartner() {

    const isDesktop = useMedia({
        minWidth: 1200,
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const formData = useSelector(formSelectors.getFormData)
    const getSubmittedForm = useSelector(formSelectors.getSubmittedForm)
    const getMoveType = useSelector(formSelector.getType)
    const getMoveDate = useSelector(formSelector.getDate)

    const [visibleCalendarModal, setVisibleCalendarModal] = useHashToggle('#calendar');

    const getMoveTypeText = useCallback(() => {
        if (getMoveType === 'house') {
            return '가정'
        } else if (getMoveType === 'office') {
            return '사무실'
        }
    }, [getMoveType])


    const handleSubmit = () => {
        dispatch(formActions.submitFormAsync.request({formData}))
        history.push('/requests/completed')
    }

    const toggleCalendarCancel = () => {
        dispatch(formActions.setMoveDate([]))
        setVisibleCalendarModal(!visibleCalendarModal)
    }
    const toggleCalendarConfirm = () => {
        dataLayer({
            event: 'input_info',
            category: '다이사_메인_입력창_1',
            label: getMoveDate[0],
            action: '이사날짜',
            CD6: getMoveTypeText()
        })
        setVisibleCalendarModal(!visibleCalendarModal)
    }
    const onSelectDate = (date: CalendarDate) => {
        if (isExceedDiffDay(date, CALENDAR_MAX_DAYS)) {
            alert(`이사업체조회는 내일부터 최장${CALENDAR_MAX_DAYS}일까지만 비교가 가능합니다.`);
            return;
        }
        dispatch(formActions.setMoveDate([date.date.format('YYYY-MM-DD')]))
    }
    /* CALENDAR */


    useEffect(() => {
        dataLayer({
            event: 'pageview',
        })

        events({
            action: 'app_move_nopartner'
        })
    }, [])

    useEffect(() => {
        if (!getSubmittedForm.data && !getSubmittedForm?.report) {
            window.location.href = `${MOVE_URL}/myconsult.asp`
        }
    }, [getSubmittedForm])


    return (
        <>
            { !getSubmittedForm.report ? <></> :
                <S.Container>
                    {isDesktop ? <MainHeader/> : <NavHeader title=""/>}
                    <S.Contents>
                        <SoldOut/>
                        <S.Title>선택하신 날짜에 업체가 모두 마감됐습니다.</S.Title>
                        <S.Subtext>다른날짜로 선택해서<br/>비교견적 받아보세요.</S.Subtext>
                    </S.Contents>
                    <S.ChangeDate>
                        <S.DateTitle>날짜 변경</S.DateTitle>
                        <Input theme="default" border readOnly placeholder="이사예정일"
                               onClick={() => setVisibleCalendarModal(true)} value={getMoveDate}
                               style={{backgroundColor: "transparent"}}/>
                        <CalendarModal visible={visibleCalendarModal} title="이사 예정일이 언제세요?"
                                       onClose={toggleCalendarCancel}
                                       onConfirm={toggleCalendarConfirm} onSelect={onSelectDate}
                                       selected={getMoveDate}/>

                        <S.DateSelect id='dsl_button_retry' onClick={handleSubmit}>다른 날짜로 견적 재요청</S.DateSelect>
                        <S.LinkAlarm id='dsl_a_alarm_noPartner' href="https://pf.kakao.com/_Ppsxexd/chat"
                                     target="_blank">가능업체
                            발생 시 알림신청</S.LinkAlarm>
                    </S.ChangeDate>
                </S.Container>
            }
        </>
    )
}

