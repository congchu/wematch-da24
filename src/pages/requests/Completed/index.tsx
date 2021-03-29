import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import ReactPixel from 'react-facebook-pixel'
import last from 'lodash/last'
import {useMedia} from 'react-use-media'
import {useDispatch, useSelector} from 'react-redux'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

import MainHeader from 'components/common/MainHeader'
import Collapse from 'components/base/Collapse'
import {Down, Up, Info} from 'components/wematch-ui/Icon'
import {Triangle, Check, LevelA, LevelB, LevelC, LevelN, LevelS} from 'components/Icon'
import ToastPopup from 'components/wematch-ui/ToastPopup'

import * as formActions from 'store/form/actions'
import * as partnerActions from 'store/partner/actions'
import * as formSelectors from 'store/form/selectors'
import * as formSelector from 'store/form/selectors'

import {FormState} from 'store/form/reducers';

import * as colors from 'styles/colors'
import {MOVE_URL,CLEAN_URL} from 'constants/env'
import {dataLayer} from 'lib/dataLayerUtil'
import {events} from 'lib/appsflyer'
import {formatDateDash2Dot, whatDay} from 'lib/dateUtil'
import validatePhone from 'lib/validatePhone'
import * as sentry from "@sentry/react";
import {Severity} from "@sentry/react";
import NewModal from "../../../components/NewModalTemplate";

const S = {
    Container: styled.div``,
    TopContents: styled.div`
      padding: 50px 0 8px;
      @media screen and (max-width: 320px) {
        padding: 40px 0 0;
      }
    `,
    ContentsWrap: styled.div`
      position: relative;
      padding: 0 24px 42px;
      @media screen and (min-width: 768px) {
        width: 720px;
        margin: 0 auto;
        padding: 0 0 42px;
      }

      .toggle {
        cursor: pointer;
      }
    `,
    Icon: styled.div`
      position: relative;
      width: 56px;
      height: 56px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #1672F7;

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -9px;
        margin-left: -13px;
      }
    `,
    TopTitle: styled.p`
      margin-top: 15px;
      font-size: 18px;
      text-align: center;

      em {
        font-weight: 700;
      }

      span {
        display: inline-block;
        margin-top: 14px;
        font-size: 14px;
        line-height: 20px;
      }

      @media screen and (min-width: 1200px) {
        font-size: 24px;
      }
    `,
    TitleWrap: styled.div`
      overflow: hidden;
      padding-top: 32px;
      border-bottom: 1px solid #EBEEF2;

      svg {
        float: right;
      }

      @media screen and (min-width: 768px) {
        padding-top: 52px;
      }
    `,
    BoxTitle: styled.strong`
      display: block;
      float: left;
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;

      em {
        color: #1672F7;
      }
    `,
    LevelInfo: styled.p`
      float: right;
      padding-top: 4px;
      font-size: 14px;
      cursor: pointer;

      svg {
        margin-left: 8px;
      }
    `,
    LevelInfoBox: styled.div<{ visible: boolean }>`
      display: ${props => (props.visible ? 'block' : 'none')};
      position: absolute;
      top: 64px;
      right: 24px;
      width: 193px;
      height: 56px;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.75);
      color: #fff;
      box-sizing: border-box;
      line-height: 18px;

      svg {
        position: absolute;
        top: -8px;
        right: 20px;
      }

      @media screen and (min-width: 768px) {
        top: 84px;
        right: 0;
      }
    `,
    CompanyList: styled.ul`
      li {
        overflow: hidden;
        padding: 20px 0 9px;
      }
    `,
    ListBox: styled.div`
      overflow: hidden;

      svg {
        float: left;
        @media screen and (max-width: 320px) {
          width: 48px;
          height: 48px;
        }
      }
    `,
    CompanyTitle: styled.p`
      overflow: hidden;
      float: left;
      width: 76%;
      margin: 7px 0 0 10px;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      text-overflow: ellipsis;

      span {
        display: inline-block;
        margin-top: 12px;
        font-size: 14px;
        font-weight: 400;
        @media screen and (max-width: 320px) {
          margin-top: 6px;
          font-size: 12px;
        }
      }

      @media screen and (max-width: 320px) {
        margin: 5px 0 0 10px;
        font-size: 15px;
      }
    `,
    LinkCompany: styled.a`
      display: block;
      margin-top: 20px;
      padding: 12px 0;
      border: 1px solid #D7DBE2;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
      @media screen and (max-width: 320px) {
        margin-top: 12px;
        font-size: 13px;
      }

      em {
        font-weight: 700;
        color: #1672F7;
      }
    `,
    MoveInfo: styled.ul`
      padding: 21px 0 6px;

      li {
        overflow: hidden;
        margin-bottom: 15px;
      }
    `,
    MoveText: styled.p`
      float: left;
      width: 27%;
      padding-top: 3px;
      font-size: 15px;
      color: ${colors.gray88};
    `,
    MoveSubtext: styled.p`
      float: left;
      width: 73%;
      font-size: 15px;
      color: #333;
      line-height: 22px;
    `,
    MoveOption: styled.ul`
      padding-top: 24px;

      li {
        overflow: hidden;
        margin-bottom: 20px;
      }

      li:first-child {
        padding-bottom: 16px;
        border-bottom: 1px solid #EBEEF2;
      }
    `,
    ServiceList: styled.div`
      overflow: hidden;
      clear: both;
    `,
    ServiceLink: styled.a`
      float: left;
      width: 25%;

      svg {
        display: block;
        margin: 17px auto 0;
      }
    `,
    ServiceText: styled.p`
      margin-top: 20px;
      font-size: 15px;
      text-align: center;
    `,
    Button: styled.button`
      display: block;
      width: 100%;
      height: 56px;
      font-size: 18px;
      background: #1672F7;
      color: #fff;
      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0 auto 106px;
      }
    `,
    Box: styled.a`
      position: relative;
      display: flex;
      align-items: center;
      height: 104px;
      border: 1px solid ${colors.lineDefault};
      box-sizing: border-box;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 16px;
      line-height: 23px;
      letter-spacing: -1px;
      margin: 0 24px 30px;
      padding: 36px 24px;
      overflow: hidden;
      
      .left {
        float: left;
        margin-right: 24px;
      }
      
      .right {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .title {
        font-weight: bold;
        color: ${colors.pointBlue};
      }
      
      .desc {
        color: ${colors.gray33};
      }
      @media screen and (min-width: 768px) {
        width: 720px;
        margin: 0 auto 30px;
      }
      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0 auto 30px;
      }
    `,
}

export default function Completed() {

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

    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies(['report'])
    const history = useHistory()

    const isDesktop = useMedia({
        minWidth: 1200,
    })

    const getSubmittedForm = useSelector(formSelectors.getSubmittedForm)

    const [infoVisible, setInfoVisible] = useState(false)
    const [expand, setExpand] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [isCookie, setIsCookie] = useState(false) //새로고침 시 픽셀,데이터 레이어 재요청 방지용

    const toggleInfoBox = () => {
        setInfoVisible(!infoVisible)
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
        window.location.href = `${MOVE_URL}`;
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

    useEffect(() => {
        if (cookies.report && !getSubmittedForm?.data && !getSubmittedForm?.loading) {
            setIsCookie(true)
            dispatch(formActions.submitFormAsync.success(cookies.report))
        }
        if (!cookies.report && !getSubmittedForm.report && !getSubmittedForm?.loading) {
            history.push('/myrequest')
        }
    }, [])

    useEffect(() => {
        if (getSubmittedForm.data && !getSubmittedForm.loading && !isCookie) {
            dataLayer({
                event: 'complete',
                category: '매칭완료',
                action: `매칭완료_${getSubmittedForm.data?.match_list?.length}`,
                label: `${last(getAddress.start.split(' '))}_${last(getAddress.end.split(' '))}`,
                CD6: `${getMoveType === 'house' ? '가정' : '사무실'}`,
                CD12: '바로매칭',
            })

            events({
                action: 'app_move_done'
            })
            ReactPixel.fbq('track', 'Purchase')

            TenpingScript.SendConversion()

            gtag('event', 'conversion', {'send_to': 'AW-862163644/CmzdCIej6G0QvKWOmwM'})
        }
    }, [getSubmittedForm])

    useEffect(() => {
        if (getSubmittedForm.data?.result === 'success' && !getSubmittedForm.loading) {
            const now = new Date()
            const time = now.getTime() + (3600 * 1000)
            now.setTime(time)

            setCookie('report', formState, {
                path: '/',
                expires: now
            })
        }
    }, [getSubmittedForm?.data?.result, getSubmittedForm.loading])

    const {
        start,
        end,
        detailStart,
        detailEnd
    }: { start: string, end: string, detailStart: string, detailEnd: string } = getAddress;
    const {start: startFloor, end: endFloor} = getFloor

    const userRequestInfo: {
        contact: string;
        movingDate: string;
        movingType: string;
        startAddr: string;
        endAddr: string;
        memo: string;
    } = {

        contact: '(' + getName + ') ' + validatePhone(getPhone, true),
        movingDate: !getMoveDate[0]? getMoveDate[0]:formatDateDash2Dot(getMoveDate[0]) + ' ' + whatDay(getMoveDate[0]),
        movingType: (getMoveType === 'house' ? '가정이사' : '사무실이사') + ' (' + (getIsMoveStore ? '보관이사 해당 있음' : '보관이사 해당 없음') + ')',
        startAddr: start + ' ' + detailStart + ' ' + startFloor + '층',
        endAddr: end + ' ' + detailEnd + ' ' + endFloor + '층',
        memo: getContents|| ''
    };

    if(!cookies.report && !getSubmittedForm.report) {
        return <></>
    }

    return (
        <S.Container>
            {isDesktop && <MainHeader/>}
            <S.TopContents>
                <S.Icon><Check fill={'#fff'}/></S.Icon>
                <S.TopTitle>
                    <em>이사업체 매칭</em> 완료 <br/>
                    <span>업체에서 연락이 없다면 먼저 전화해주세요!<br/> 전화번호를 문자로 보내드립니다.</span>
                </S.TopTitle>
            </S.TopContents>
            <S.ContentsWrap>
                <S.TitleWrap>
                    <S.BoxTitle>업체 정보</S.BoxTitle>
                    <S.LevelInfo onClick={toggleInfoBox}>소비자평가등급 <Info/></S.LevelInfo>
                </S.TitleWrap>
                <S.LevelInfoBox visible={infoVisible}>
                    <Triangle/>
                    이용 고객이 평가한 내용으로 산출한 빅 데이터 등급입니다.
                </S.LevelInfoBox>
                <S.CompanyList>
                    {getSubmittedForm?.data?.["match_list"]?.map((list, index) => (
                        <li key={index}>
                            <S.ListBox>
                                {list.level === 'NEW' && <LevelN/>}
                                {list.level === 'S' && <LevelS/>}
                                {list.level === 'A' && <LevelA/>}
                                {list.level === 'B' && <LevelB/>}
                                {list.level === 'C' && <LevelC/>}
                                <S.CompanyTitle>
                                    {list.adminname} <br/>
                                    <span>{list.level_text}</span>
                                </S.CompanyTitle>
                            </S.ListBox>
                            <S.LinkCompany onClick={() => {
                                dataLayer({
                                    event: 'complete',
                                    category: '매칭완료',
                                    action: '고객평가_확인',
                                    label: `${getSubmittedForm?.data?.["match_list"].length}_${index + 1}`,
                                    CD6: `${getMoveType === 'house' ? '가정' : '사무실'}`,
                                    CD12: '바로매칭',
                                })
                                /* 페이지 재접속시 이전상태 초기화 */
                                dispatch(partnerActions.detailReset())
                                history.push(`/requests/completed/${list.adminid}`)
                            }}>
                                <em>{list.feedback_cnt}</em> 명의 고객 평가 확인
                            </S.LinkCompany>
                        </li>
                    ))}
                </S.CompanyList>
                <S.TitleWrap onClick={() => setExpand(!expand)} className="toggle">
                    <S.BoxTitle>내 신청 정보</S.BoxTitle>
                    {expand ? <Up style={{marginTop: 6}}/> : <Down style={{marginTop: 6}}/>}
                </S.TitleWrap>
                <Collapse expand={expand}>
                    <S.MoveInfo>
                        <li>
                            <S.MoveText>연락처</S.MoveText>
                            <S.MoveSubtext>{userRequestInfo.contact}</S.MoveSubtext>
                        </li>
                        <li>
                            <S.MoveText>이사날짜</S.MoveText>
                            <S.MoveSubtext>{userRequestInfo.movingDate}</S.MoveSubtext>
                        </li>
                        <li>
                            <S.MoveText>이사 종류</S.MoveText>
                            <S.MoveSubtext>{userRequestInfo.movingType}</S.MoveSubtext>
                        </li>
                        <li>
                            <S.MoveText>출발지</S.MoveText>
                            <S.MoveSubtext>{userRequestInfo.startAddr}</S.MoveSubtext>
                        </li>
                        <li>
                            <S.MoveText>도착지</S.MoveText>
                            <S.MoveSubtext>{userRequestInfo.endAddr}</S.MoveSubtext>
                        </li>
                        <li>
                            <S.MoveText>전달메모</S.MoveText>
                            <S.MoveSubtext>{userRequestInfo.memo}</S.MoveSubtext>
                        </li>
                    </S.MoveInfo>
                </Collapse>
            </S.ContentsWrap>
            <S.Box href={CLEAN_URL}>
                <img className='left' src={require('assets/images/components/Completed/home.svg')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사"/>
                <div>
                    <h3 className='title'>{last(getAddress.end.split(' '))}</h3>
                    <p className='desc'>잘하는 입주청소 업체 찾기</p>
                </div>
                <img className='right' src={require('assets/images/components/Completed/right.svg')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사"/>
            </S.Box>
            <S.Button onClick={() => setShowPopup(!showPopup)}>신청 정보 확인완료</S.Button>
            <NewModal visible={showPopup} title={"입주청소 찾기?"} content={"입주청소도 필요하세요"} confirmText={"바로 찾기"} cancelText={"다음에"} confirmClick={() => window.location.href = `${CLEAN_URL}`} cancelClick={() => togglePopup()} />
        </S.Container>
    )
}
