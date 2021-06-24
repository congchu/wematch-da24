import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use-media'
import styled from 'styled-components'
import ReactPixel from 'react-facebook-pixel'
import { useCookies } from 'react-cookie'

import MainHeader from 'components/common/MainHeader'
import AreaIcon from 'components/Icon/generated/AreaIcon'
import Kakao from 'components/Icon/generated/Kakao_fit'

import * as commonSelector from "store/common/selectors";
import * as formActions from 'store/form/actions'
import * as formSelectors from 'store/form/selectors'
import { FormState } from 'store/form/reducers'

import { MOVE_URL } from 'constants/env'
import { dataLayer } from 'lib/dataLayerUtil'
import { events } from 'lib/appsflyer'
import { Link, useHistory } from 'react-router-dom'

const S = {
    Header: styled.header`
        display: block;
        height: 55px;
        padding: 0 24px;
        margin-top:0;
        
        a {
        display: block;
        width: 87px;
        height: 16px;
        padding: 24px 0 10px;
        }
        
        span {
        display: block;
        width: 87px;
        height: 16px;
        font-size: 1px;
        background: url(https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/logo/wematch_c.png) 0 0 no-repeat;
        background-size: 100% auto;
        color: transparent;
        }
        @media screen and (min-width:768px) {
        height: 72px;
        
        a {
            width: 108px;
            height: 20px;
            padding-top: 26px;
        }
        }
    `,
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
      display: block;
      height: 36px;
      padding: 10px 0;
      font-weight: 700;
      background: #FFE500;
      text-align: center;
      border-radius: 6px;
      margin-top: 40px;
      margin-right: 24px;
      margin-left: 24px;
      font-size: 18px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

      svg {
        margin-top: -2px;
        margin-right: 10px;
        vertical-align: middle;
      }
      
      span {
        line-height: 35px;
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
    const history = useHistory();
    const getSubmittedForm = useSelector(formSelectors.getSubmittedForm)
    const getMoveType = useSelector(formSelectors.getType)
    const getMoveDate = useSelector(formSelectors.getDate)
    const getAddress = useSelector(formSelectors.getAddress)
    const getFloor = useSelector(formSelectors.getFloor)
    const getName = useSelector(formSelectors.getName)
    const getPhone = useSelector(formSelectors.getPhone)
    const getIsMoveStore = useSelector(formSelectors.getIsMoveStore)
    const getContents = useSelector(formSelectors.getContents)
    const getFormData = useSelector(formSelectors.getFormData)
    const getAgree = useSelector(formSelectors.getAgree)
    const getJuso = useSelector(commonSelector.getJuso)

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

    const getDong = useCallback((dongType: 'start' | 'end') => {
        if (getJuso.type[dongType] === 'jibun') {
            return getJuso.start?.jibunAddr.replace(/ /g, '-')
        }
        return getJuso[dongType]?.roadAddr?.replace(/ /g, '-')
    }, [])

    useEffect(() => {
        if (getSubmittedForm.data && !getSubmittedForm.loading && !isCookie) {
            dataLayer({
                event: 'complete',
                category: '업체없음',
                action: '업체없음',
                label: `${getDong('start')}_${getDong('end')}`,
                CD6: `${getMoveType === 'house' ? '가정' : '사무실'}`,
                CD12: '바로매칭',
            })

            ReactPixel.fbq('track', 'Purchase')
            gtag('event', 'conversion', { 'send_to': 'AW-862163644/CmzdCIej6G0QvKWOmwM' })
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
        // if (!cookies.report && !getSubmittedForm.report && !getSubmittedForm?.loading) {
        //     history.push('/myrequest')
        // }
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
        <S.Container>
            {/* {isDesktop ? <MainHeader/> : <NavHeader title="" onPreviousButtonClick={goHome}/>} */}
            {isDesktop ? <MainHeader /> : <S.Header><Link to="/"><span>위매치</span></Link></S.Header>}
            <S.Contents>
                <AreaIcon />
                <S.Title>해당 지역은 서비스 준비 중입니다.</S.Title>
                <S.Subtext>빠른 시일 내 이용 가능하도록<br />최선을 다하겠습니다.</S.Subtext>
            </S.Contents>
            <S.LinkAlarm id='dsl_a_alarm_noService' href="https://pf.kakao.com/_Ppsxexd/chat" target="_blank">
                <Kakao />
                <span>가능업체 알림 신청</span>
            </S.LinkAlarm>
        </S.Container>
    )
}
