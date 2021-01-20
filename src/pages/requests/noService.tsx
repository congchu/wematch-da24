import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMedia } from 'react-use-media'
import styled from 'styled-components'

import MainHeader from 'components/common/MainHeader/index'
import NavHeader from 'components/common/NavHeader/index'
import AreaIcon from 'components/Icon/generated/AreaIcon'
// import SvgKakaoIcon from 'components/Icon/generated/KakaoIcon'
import Kakao from "../../components/Icon/generated/Kakao_fit";


import { MOVE_URL } from 'constants/env'

import * as formSelectors from 'store/form/selectors'

import { dataLayer } from 'lib/dataLayerUtil'
import { events } from 'lib/appsflyer'

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


  const getSubmittedForm  = useSelector(formSelectors.getSubmittedForm)

  useEffect(() => {
    dataLayer({
      event: 'pageview',
    })
    events({
      action: 'app_move_noservice'
    })
  }, [])

  useEffect(() => {
    if (!getSubmittedForm.data && !getSubmittedForm?.report) {
      window.location.href = `${MOVE_URL}/myconsult.asp`
    }
  }, [getSubmittedForm])


  return (
    <S.Container>
      {isDesktop ? <MainHeader /> : <NavHeader title="" /> }
      <S.Contents>
        <AreaIcon />
        <S.Title>해당 지역은 서비스 준비 중입니다.</S.Title>
        <S.Subtext>빠른 시일 내 이용 가능하도록<br/>최선을 다하겠습니다.</S.Subtext>
      </S.Contents>
      <S.LinkAlarm id='dsl_a_alarm_noService' href="https://pf.kakao.com/_Ppsxexd/chat" target="_blank">
        <Kakao/>가능업체 알림 신청
      </S.LinkAlarm>
    </S.Container>
  )
}
