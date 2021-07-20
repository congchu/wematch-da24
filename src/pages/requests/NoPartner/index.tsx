import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactPixel from 'react-facebook-pixel'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useHistory, useLocation} from 'react-router-dom'
import { useMedia } from 'react-use-media'
import useHashToggle from 'hooks/useHashToggle'
import { useCookies } from 'react-cookie'

import MainHeader from 'components/common/MainHeader'
import Input from 'components/common/Input'
import { SoldOut } from 'components/Icon'
import CalendarModal from 'components/common/Modal/CalendarModal'
import { CalendarDate } from 'components/wematch-ui/utils/date'
import ResponsiveSkeleton from 'components/common/Skeleton/responsiveSkeleton';

import * as formActions from 'store/form/actions'
import * as formSelectors from 'store/form/selectors'
import * as formSelector from 'store/form/selectors'
import * as userSelector from 'store/user/selectors'
import {FormState} from 'store/form/reducers'

import { CALENDAR_MAX_DAYS } from 'constants/values';
import { dataLayer } from 'lib/dataLayerUtil'
import { events } from 'lib/appsflyer'
import { isExceedDiffDay } from 'lib/dateUtil'
import {debounce} from "lodash";
import {showToast} from "components/common/Toast";
import * as commonSelector from "store/common/selectors";


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
  Container: styled.div`
    padding-bottom: 24px;
  `,
  Contents: styled.div`
      margin-top: 56px;
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
      margin-top: 18px;
      font-size: 16px;
      line-height: 22px;
      @media screen and (max-width: 320px) {
        margin-top: 6px;
        font-size: 15px;
      }
    `,
  Subtext: styled.p`
      font-size: 14px;
      color: #666;
      line-height: 22px;
      margin-bottom: 24px;
      text-align: center;
      @media screen and (max-width: 320px) {
        margin-top: 6px;
        font-size: 14px;
        line-height: 20px;
      }
    `,
  ChangeDate: styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 117px;
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
      margin-bottom: 8px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      @media screen and (max-width: 320px) {
        margin-bottom: 10px;
      }
    `,
  DateSelect: styled.button`
      width: 100%;
      height: 56px;
      margin-top: 12px;
      font-size: 18px;
      font-weight: 700;
      border-radius: 6px;
      color: #fff;
      background: #1672F7;
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
      padding-top: 6px;
      font-size: 14px;
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
    const location = useLocation();


    const params = new URLSearchParams(location.search)
    const serviceType = params.get('serviceType') || 'move'

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
    const { user } = useSelector(userSelector.getUser)
    const getJuso = useSelector(commonSelector.getJuso)

    const [visibleCalendarModal, setVisibleCalendarModal] = useHashToggle('#calendar');
    const [cookies, setCookie] = useCookies(['report'])
    const [isCookie, setIsCookie] = useState(false) //새로고침 시 픽셀,데이터 레이어 재요청 방지용


    const getMoveTypeText = useCallback(() => {
        if (getMoveType === 'house') {
            return '가정'
        } else if (getMoveType === 'office') {
            return '사무실'
        }
    }, [getMoveType])

    const handleSubmit = () => {
        if (!getSubmittedForm.data?.result) {
            showToast({
                message: '이사 정보가 존재하지 않습니다.',
                type: 'error',
                position: 'bottom'
            })
            return
        }
        dispatch(formActions.submitFormAsync.request({formData: { uuid: user?.uuid, ...getFormData}}))
    }

    const toggleCalendarCancel = () => {
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

    const debounceSelectDate = debounce(() => {
        setVisibleCalendarModal(!visibleCalendarModal)
    }, 300)

    const onSelectDate = (date: CalendarDate) => {
        if (isExceedDiffDay(date, CALENDAR_MAX_DAYS)) {
          alert(`이사업체조회는 내일부터 최장${CALENDAR_MAX_DAYS}일까지만 비교가 가능합니다.`);
          return;
        }
        dispatch(formActions.setMoveDate([date.date.format('YYYY-MM-DD')]))
        dispatch(formActions.setFormData({
          ...getFormData,
          'moving_date': date.date.format('YYYY-MM-DD')
        }))

        debounceSelectDate()
    }

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
            category: '업체마감',
            action: '업체마감',
            label: `${getDong('start')}_${getDong('end')}`,
            CD6: `${getMoveType === 'house' ? '가정' : '사무실'}`,
            CD12: '바로매칭',
          })
          ReactPixel.fbq('track', 'Purchase')

          gtag('event', 'conversion', { 'send_to': 'AW-862163644/CmzdCIej6G0QvKWOmwM' })
        }

        events({
          action: 'app_move_nopartner'
        })
    }, [])

    useEffect(() => {
        if (cookies.report && !getSubmittedForm?.data && !getSubmittedForm?.loading) {
          setIsCookie(true)
          dispatch(formActions.submitFormAsync.success(cookies.report))
        }
        // if (!cookies.report && !getSubmittedForm.report && !getSubmittedForm?.loading) {
        //   history.push('/myrequest')
        // }
    }, [getSubmittedForm])

    useEffect(() => {
        if (getSubmittedForm.data?.result === 'no partner' && !getSubmittedForm.loading) {
            const now = new Date()
            const time = now.getTime() + (3600 * 1000)
            now.setTime(time)
            setCookie('report', formState, {
            path: '/',
            expires: now
            })
        }
    }, [getSubmittedForm?.data?.result, getSubmittedForm.loading])

    if (getSubmittedForm.loading) {
        return <ResponsiveSkeleton />
    }

    return (
        <S.Container>
          {isDesktop ? <MainHeader /> : <S.Header><Link to="/"><span>위매치</span></Link></S.Header>}
          <S.Contents>
            <SoldOut />
            <S.Title>선택하신 날짜에 업체가 모두 마감됐습니다.</S.Title>
            <S.LinkAlarm id='dsl_a_alarm_noPartner' href="https://pf.kakao.com/_Ppsxexd/chat"
              target="_blank">가능업체발생 시 알림 신청하기</S.LinkAlarm>
          </S.Contents>
          <S.ChangeDate>
            <S.DateTitle>다른 날짜에 이사가 가능하신가요?</S.DateTitle>
            <S.Subtext>*실제 이사가 가능한 날짜만 선택해주세요! <br/> 날짜에 따라 이사 비용이 변동될 수 있습니다.</S.Subtext>
            <Input theme="default" border readOnly placeholder="이사예정일"
              onClick={() => setVisibleCalendarModal(true)} value={getMoveDate}
              style={{ backgroundColor: "transparent" }} rootStyle={{width: '100%'}} icon={'down'}/>
            <CalendarModal visible={visibleCalendarModal} title="이사 예정일이 언제세요?"
                           serviceType={serviceType === 'clean' ? 'clean' : 'move'}
              onClose={toggleCalendarCancel}
              onConfirm={toggleCalendarConfirm} onSelect={onSelectDate}
              selected={getMoveDate} />
            <S.DateSelect id='dsl_button_retry' onClick={handleSubmit}>변경한 날짜로 업체 추천 받기</S.DateSelect>
          </S.ChangeDate>
        </S.Container>
    )
}

