import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useMedia} from 'react-use-media'
import styled from 'styled-components'
import last from 'lodash/last'
import ReactPixel from 'react-facebook-pixel'
import {useCookies} from 'react-cookie'

import MainHeader from 'components/common/MainHeader/index'
import NavHeader from 'components/common/NavHeader/index'
import AreaIcon from 'components/Icon/generated/AreaIcon'
import Kakao from 'components/Icon/generated/Kakao_fit'

import * as formSelectors from 'store/form/selectors'
import * as formActions from 'store/form/actions'
import * as formSelector from 'store/form/selectors'
import {FormState} from 'store/form/reducers'

import {MOVE_URL} from 'constants/env'
import {dataLayer} from 'lib/dataLayerUtil'
import {events} from 'lib/appsflyer'

const S = {
    Container: styled.div``,
    Contents: styled.div`
      margin-top: 120px;
      text-align: center;

      svg {
        display: block;
        margin: 0 auto;
      }

      @media screen and (min-width: 1200px) {
        margin-bottom: 150px;
      }
      @media screen and (max-width: 320px) {
        margin-top: 100px;
      }
    `,
    Title: styled.strong`
      display: inline-block;
      margin-top: 20px;
      font-size: 16px;
      line-height: 22px;
    `,
    Subtext: styled.p`
      margin-top: 10px;
      font-size: 15px;
      color: #666;
      line-height: 22px;
    `,
    LinkAlarm: styled.a`
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 36px;
      padding-top: 20px;
      font-weight: 700;
      background: #FFE500;
      text-align: center;

      svg {
        margin-top: -2px;
        margin-right: 10px;
        vertical-align: middle;
      }

      @media screen and (min-width: 1200px) {
        display: block;
        position: relative;
        width: 720px;
        margin: 0 auto;
      }
    `,
}


export default function NoService() {
    const isDesktop = useMedia({
        minWidth: 1200,
    })


    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['report'])
    const [isCookie, setIsCookie] = useState(false) //새로고침 시 픽셀,데이터 레이어 재요청 방지용

    const getSubmittedForm = useSelector(formSelectors.getSubmittedForm)
    const getMoveType = useSelector(formSelector.getType)
    const getMoveDate = useSelector(formSelector.getDate)
    const getAddress = useSelector(formSelector.getAddress)
    const getFloor = useSelector(formSelector.getFloor)
    const getName = useSelector(formSelector.getName)
    const getPhone = useSelector(formSelector.getPhone)
    const getIsMoveStore = useSelector(formSelector.getIsMoveStore)
    const getContents = useSelector(formSelector.getContents)
    const getFormData = useSelector(formSelector.getFormData)
    const getAgree = useSelector(formSelector.getAgree)


    const formState: FormState = {
        type: getMoveType,
        date: getMoveDate,
        address: getAddress,
        agree: getAgree,
        floor: getFloor,
        formData: getFormData,
        isMoveStore: getIsMoveStore,
        name: getName,
        phone: getPhone,
        submittedForm: getSubmittedForm,
        contents: getContents
    }

    const goHome = () => {
        window.location.href = `${MOVE_URL}`
    }

    useEffect(() => {
        if (getSubmittedForm.data && !getSubmittedForm.loading && !isCookie) {
            dataLayer({
                event: 'complete',
                category: '업체없음',
                action: '업체없음',
                label: `${last(getAddress.start.split(' '))}_${last(getAddress.end.split(' '))}`,
                CD6: `${getMoveType === 'house' ? '가정' : '사무실'}`,
                CD12: '바로매칭',
            })

            ReactPixel.fbq('track', 'Purchase')
        }

        events({
            action: 'app_move_noservice'
        })
    }, [])


    useEffect(() => {
        if (cookies.report && !getSubmittedForm?.data && !getSubmittedForm?.loading) {
            setIsCookie(true)
            dispatch(formActions.submitFormAsync.success(cookies.report))
        }
        if (!cookies.report && !getSubmittedForm.report && !getSubmittedForm?.loading) {
            window.location.href = `${MOVE_URL}/myconsult.asp`
        }

    }, [getSubmittedForm])

    useEffect(() => {
        if (getSubmittedForm.data?.result === 'no service' && !getSubmittedForm.loading) {
            const now = new Date()
            const time = now.getTime() + (3600 * 1000)
            now.setTime(time)
            setCookie('report', formState, {
                path: '/',
                expires: now
            })
        }
    }, [getSubmittedForm?.data?.result, getSubmittedForm.loading])

    return (
        <>
            { !getSubmittedForm.report ? <></> :
                <S.Container>
                    {isDesktop ? <MainHeader/> : <NavHeader title="" onPreviousButtonClick={goHome}/>}
                    <S.Contents>
                        <AreaIcon/>
                        <S.Title>해당 지역은 서비스 준비 중입니다.</S.Title>
                        <S.Subtext>빠른 시일 내 이용 가능하도록<br/>최선을 다하겠습니다.</S.Subtext>
                    </S.Contents>
                    <S.LinkAlarm id='dsl_a_alarm_noService' href="https://pf.kakao.com/_Ppsxexd/chat" target="_blank">
                        <Kakao/>가능업체 알림 신청
                    </S.LinkAlarm>
                </S.Container>
            }
        </>
    )
}
