import React, { useEffect, useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import ReactPixel from 'react-facebook-pixel'
import { useMedia } from 'react-use-media'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useRouter } from 'hooks/useRouter'

import MainHeader from 'components/common/MainHeader'
import Collapse from 'components/base/Collapse'
import { Down, Up, Info } from 'components/wematch-ui/Icon'
import { Triangle, Check, LevelA, LevelB, LevelC, LevelN, LevelS, Question } from 'components/Icon'
import ProcessBar from './processBar'
import NewModal from 'components/NewModalTemplate'
import ResponsiveSkeleton from 'components/common/Skeleton/responsiveSkeleton'

import * as commonSelector from 'store/common/selectors'
import * as commonActions from 'store/common/actions'
import * as partnerActions from 'store/partner/actions'
import * as cleanActions from 'store/clean/actions'
import * as cleanSelector from 'store/clean/selectors'
import * as moveActions from 'store/form/actions'
import * as moveSelector from 'store/form/selectors'
import * as colors from 'styles/colors'
import { MOVE_URL, CLEAN_URL } from 'constants/env'
import { dataLayer } from 'lib/dataLayerUtil'
import { events } from 'lib/appsflyer'
import { whatDay } from 'lib/dateUtil'
import * as sentry from '@sentry/react'
import { Severity } from '@sentry/react'
import dayjs from 'dayjs'
import NewLevelN from '../../../components/Icon/generated/NewLevelN'
import NewLevelOther from '../../../components/Icon/generated/NewLevelOther'
import NewLevelS from '../../../components/Icon/generated/NewLevelS'
import { Level } from '../../../types/partner'
import { getUser } from 'store/user/selectors'
import { phoneSplit } from 'components/wematch-ui/utils/form'

const S = {
  Container: styled.div`
    background-color: #fafafa;
    padding-bottom: 56px;
    @media screen and (min-width: 1200px) {
      padding-bottom: 106px;
    }
  `,
  TopContainer: styled.div`
    background-color: ${colors.white};
    border-bottom: 1px solid #ebeef2;
  `,
  TopContents: styled.div`
    padding: 50px 0 8px;
    margin: 0 24px;
    @media screen and (max-width: 320px) {
      padding: 40px 0 0;
    }
    @media screen and (min-width: 768px) {
      width: 720px;
      margin: 15px auto 0;
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
    background-color: #1672f7;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -9px;
      margin-left: -13px;
    }
  `,
  TopTitle: styled.p`
    margin: 15px auto 0;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid #ebeef2;

    em {
      font-weight: 700;
    }

    span {
      display: inline-block;
      margin-top: 14px;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 24px;
    }

    @media screen and (min-width: 768px) {
      width: 720px;
      margin: 15px auto 0;
    }
    @media screen and (min-width: 1200px) {
      font-size: 24px;
    }
  `,
  TitleWrap: styled.div`
    overflow: hidden;
    padding-top: 24px;
    border-bottom: 1px solid #ebeef2;

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
    font-size: 22px;
    font-weight: 700;
    line-height: 24px;

    em {
      color: #1672f7;
    }
  `,
  LevelInfo: styled.div`
    float: right;
    padding-top: 4px;
    font-size: 14px;
    cursor: pointer;
    color: ${colors.gray66};

    svg {
      float: left;
      margin-right: 5px;
    }
  `,
  LevelInfoBox: styled.div<{ visible: boolean }>`
    display: ${(props) => (props.visible ? 'block' : 'none')};
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
    margin-bottom: 66px;
  `,
  Card: styled.li`
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
    background-color: ${colors.white};
    padding: 16px;
    margin: 16px 0;
    box-sizing: border-box;
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
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      display: inline-block;
      margin-top: 4px;
      font-size: 14px;
      font-weight: 400;
      @media screen and (max-width: 320px) {
        margin-top: 4px;
        font-size: 12px;
      }
    }

    @media screen and (max-width: 320px) {
      margin: 5px 0 0 10px;
      font-size: 15px;
    }
  `,
  HorizontalBar: styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.lineDefault};
    margin: 16px 0;
  `,
  LinkCompany: styled.a`
    display: block;
    font-size: 14px;
    text-align: center;
    color: ${colors.pointBlue};
    @media screen and (max-width: 320px) {
      margin-top: 12px;
      font-size: 13px;
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
    font-size: 16px;
    color: ${colors.gray88};
  `,
  MoveSubtext: styled.p`
    float: left;
    width: 73%;
    font-size: 16px;
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
      border-bottom: 1px solid #ebeef2;
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
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    height: 56px;
    font-size: 18px;
    background: #1672f7;
    color: #fff;
    @media screen and (min-width: 1200px) {
      left: 0;
      right: 0;
      width: 720px;
      margin: 0 auto;
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
  `
}

export default function Completed() {
  const moveForm = useSelector(moveSelector.getFormData)
  const cleanForm = useSelector(cleanSelector.getCleanForm)
  const { start: moveStartAddr, end: moveEndAddr, type: moveAddrType } = useSelector(commonSelector.getJuso)
  const { moving_type } = useSelector(moveSelector.getFormData)
  const { type: cleanType } = useSelector(cleanSelector.getCleanForm)
  const { data, loading, error } = useSelector(commonSelector.getCompletedData)
  const { data: cleanData, loading: cleanLoading } = useSelector(cleanSelector.getCleanMatchData)
  const { data: moveData, loading: moveLoading } = useSelector(moveSelector.getSubmittedForm)
  const { user } = useSelector(getUser)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const isDesktop = useMedia({
    minWidth: 1200
  })
  const [sessionVisible, setSessionVisible] = useState(false)
  const [expand, setExpand] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [firstLoading, setFirstLoading] = useState(true)
  const {
    query: { msg }
  } = useRouter()
  const params = new URLSearchParams(location.search)
  const inquiry_idx = params.get('inquiry_idx')
  const serviceType = params.get('serviceType')

  const togglePopup = () => {
    setShowPopup(!showPopup)
    history.push('/myrequest')
  }

  useEffect(() => {
    if (loading || cleanLoading || moveLoading) {
      setFirstLoading(false)
    }
  }, [loading, cleanLoading, moveLoading])

  useEffect(() => {
    if (serviceType === 'clean' && !cleanType) {
      setFirstLoading(false)
      setSessionVisible(true)
    } else if (serviceType === 'move' && !moving_type) {
      setFirstLoading(false)
      setSessionVisible(true)
    }
  }, [serviceType, cleanType, moving_type, error])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const inquiry_idx = params.get('inquiry_idx')
    const serviceType = params.get('serviceType')

    if (inquiry_idx) {
      dispatch(commonActions.fetchCompletedMoveIdx.request({ inquiry_idx }))
      return
    }

    if (!user) {
      history.replace('/')
      return
    }

    if (serviceType === 'clean' && cleanType) {
      dispatch(cleanActions.fetchCleanAutoMatch.request())
      return
    }

    if (serviceType === 'move' && moving_type) {
      dispatch(moveActions.fetchMoveData())
    }
  }, [dispatch, location, history, user, cleanType, moving_type])

  useEffect(() => {
    if (data !== null && !loading && !error && msg !== 'true') {
      dataLayer({
        event: 'complete',
        category: '매칭완료',
        action: `매칭완료_${data?.partners?.length}`,
        label: `${data?.start_address?.replace(/ /g, '-')}층_${data?.end_address?.replace(/ /g, '-')}층`,
        CD6: `${data.type === '가정이사' ? '가정' : '사무실'}`,
        CD12: '바로매칭'
      })

      events({
        action: 'app_move_done'
      })
      ReactPixel.fbq('track', 'Purchase')

      TenpingScript.SendConversion()

      gtag('event', 'conversion', {
        send_to: 'AW-862163644/CmzdCIej6G0QvKWOmwM'
      })
    }
  }, [data, loading, error, msg])

  useEffect(() => {
    return () => {
      dispatch(commonActions.resetCompletedMove())
      dispatch(moveActions.resetFormData())
      dispatch(cleanActions.resetCleanForm())
    }
  }, [dispatch])

  const handleCleanConfirm = useCallback(() => {
    if (data !== null) {
      const pl = new Promise((resolve) => {
        dataLayer({
          event: 'msg_complete',
          category: msg ? '매칭완료메시지_크로스셀' : '매칭완료_크로스셀',
          action: '입주청소찾기',
          label: '바로찾기',
          CD6: `${data.type === '가정이사' ? '가정' : '사무실'}`
        })
        resolve(null)
      })
      pl.then(() => (window.location.href = `${CLEAN_URL}`))
    }
  }, [msg, data])

  const handleCleanCancel = useCallback(() => {
    if (data !== null) {
      const pl = new Promise((resolve) => {
        dataLayer({
          event: 'msg_complete',
          category: msg ? '매칭완료메시지_크로스셀' : '매칭완료_크로스셀',
          action: '입주청소찾기',
          label: '다음에',
          CD6: `${data.type === '가정이사' ? '가정' : '사무실'}`
        })
        resolve(null)
      })
      pl.then(() => togglePopup())
    }
  }, [msg, data])

  const compileLevelText = (level: Level) => {
    switch (level) {
      case 'S':
        return '최고 등급의 검증된 파트너 업체'
      case 'NEW':
        return '의욕적인 신규 파트너 업체'
      default:
        return '믿을 수 있는 우수 파트너 업체'
    }
  }

  const companyListData = useMemo(() => {
    if (inquiry_idx) {
      return data?.partners
    }

    if (serviceType === 'move') {
      return moveData?.match_list
    } else if (serviceType === 'clean') {
      return cleanData?.match_list
    }
  }, [inquiry_idx, serviceType, data, cleanData, moveData])

  const renderMoveUserInfo = ({ contact, movingDate, movingType, startAddr, endAddr, memo }: { contact: string; movingDate: string; movingType: string; startAddr: string; endAddr: string; memo: string }) => (
    <S.MoveInfo>
      <li>
        <S.MoveText>연락처</S.MoveText>
        <S.MoveSubtext>{contact}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>이사날짜</S.MoveText>
        <S.MoveSubtext>{movingDate}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>이사 종류</S.MoveText>
        <S.MoveSubtext>{movingType}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>출발지</S.MoveText>
        <S.MoveSubtext>{startAddr}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>도착지</S.MoveText>
        <S.MoveSubtext>{endAddr}</S.MoveSubtext>
      </li>
      {memo !== '' ? (
        <li>
          <S.MoveText>전달메모</S.MoveText>
          <S.MoveSubtext>{memo}</S.MoveSubtext>
        </li>
      ) : (
        <></>
      )}
    </S.MoveInfo>
  )

  const renderCleanUserInfo = ({ contact, cleaningDate, cleanAddr, memo }: { contact: string; cleaningDate: string; cleanAddr?: string; memo: string }) => (
    <S.MoveInfo>
      <li>
        <S.MoveText>연락처</S.MoveText>
        <S.MoveSubtext>{contact}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>청소날짜</S.MoveText>
        <S.MoveSubtext>{cleaningDate}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>청소지</S.MoveText>
        <S.MoveSubtext>{cleanAddr}</S.MoveSubtext>
      </li>
      <li>
        <S.MoveText>요청사항</S.MoveText>
        <S.MoveSubtext>{memo}</S.MoveSubtext>
      </li>
    </S.MoveInfo>
  )

  const renderUserInfo = () => {
    let userInfo
    if (inquiry_idx && data !== null) {
      if (data.type.includes('이사')) {
        userInfo = {
          contact: `(${data?.name}) ${data?.phone_number}`,
          movingDate: `(${whatDay(data?.moving_date)}) ${dayjs(data?.moving_date).format('YYYY.MM.DD')}`,
          movingType: `${data?.type}`,
          startAddr: `${data?.start_address}층`,
          endAddr: `${data?.end_address}층`,
          memo: `${data?.memo}`
        }

        return renderMoveUserInfo({ ...userInfo })
      } else {
        userInfo = {
          contact: `(${data?.name}) ${data?.phone_number}`,
          cleaningDate: `(${whatDay(data?.moving_date)}) ${dayjs(data?.moving_date).format('YYYY.MM.DD')}`,
          cleanAddr: `${data?.start_address}층`,
          memo: `${data?.memo}`
        }

        return renderCleanUserInfo({ ...userInfo })
      }
    }

    if (serviceType === 'move' && moving_type) {
      userInfo = {
        contact: `(${moveForm.name}) ${moveForm.phone1}-${moveForm.phone2}-${moveForm.phone3}`,
        movingDate: `(${whatDay(moveForm.moving_date)}) ${moveForm.moving_date}`,
        movingType: `${moveForm.moving_type}`,
        startAddr: moveAddrType.start === 'road' ? `${moveStartAddr?.roadAddr}` : `${moveStartAddr?.jibunAddr}`,
        endAddr: moveAddrType.start === 'road' ? `${moveEndAddr?.roadAddr}` : `${moveEndAddr?.jibunAddr}`,
        memo: `${moveForm.memo}`
      }

      return renderMoveUserInfo({ ...userInfo })
    } else if (serviceType === 'clean' && cleanType && user !== null) {
      const { phone1, phone2, phone3 } = phoneSplit(user.tel)
      userInfo = {
        contact: `(${user?.name}) ${phone1}-${phone2}-${phone3}`,
        cleaningDate: cleanForm.date[0],
        cleanAddr: cleanForm.addressType === 'road' ? cleanForm.address?.roadAddr : cleanForm.address?.jibunAddr,
        memo: cleanForm.cleanMemo
      }

      return renderCleanUserInfo({ ...userInfo })
    }
  }

  if (loading || firstLoading || cleanLoading || moveLoading) {
    return <ResponsiveSkeleton />
  }

  return (
    <S.Container>
      {isDesktop && <MainHeader />}
      <S.TopContainer>
        <S.TopContents>
          <S.Icon>
            <Check fill={'#fff'} />
          </S.Icon>
          <S.TopTitle>
            <em>{serviceType !== 'clean' && !cleanType ? `이사업체` : `청소업체`}</em> 매칭완료 <br />
            {serviceType !== 'clean' && !cleanType ? (
              <span>
                업체에서 2시간 이상 연락이 없다면 보내드린 <br />
                알림톡/문자의 업체 전화번호로 먼저 전화해보세요!
              </span>
            ) : (
              <span>
                업체에서 연락이 없다면 아래 번호로 문의해주세요!
                <br />
                (고객센터 1522-2483)
              </span>
            )}
          </S.TopTitle>
          {serviceType !== 'clean' && !cleanType && <ProcessBar />}
        </S.TopContents>
      </S.TopContainer>
      <S.ContentsWrap>
        <S.TitleWrap>
          <S.BoxTitle>매칭 업체 정보</S.BoxTitle>
        </S.TitleWrap>
        <S.CompanyList>
          {companyListData?.map((list, index, arr) => (
            <S.Card key={index}>
              <S.ListBox>
                {list.level === 'NEW' && <NewLevelN />}
                {list.level === 'S' && <NewLevelS />}
                {list.level !== 'NEW' && list.level !== 'S' && <NewLevelOther />}
                <S.CompanyTitle>
                  {list.adminname} <br />
                  <span>{compileLevelText(list.level)}</span>
                </S.CompanyTitle>
              </S.ListBox>
              <S.HorizontalBar />
              <S.LinkCompany
                onClick={() => {
                  dataLayer({
                    event: msg !== 'true' ? 'complete' : 'msg_complete',
                    category: msg !== 'true' ? '매칭완료' : '매칭완료페이지_업체정보',
                    action: '고객평가_확인',
                    label: `${arr.length}_${index + 1}`,
                    // CD6: data.type,
                    CD6: `${data?.type === '가정이사' ? '가정' : '사무실'}`
                  })
                  /* 페이지 재접속시 이전상태 초기화 */
                  dispatch(partnerActions.detailReset())
                  history.push(`/requests/completed/${list.adminid}`)
                }}>
                {`업체 정보 자세히 보기 (후기 ${list.feedback_cnt}개)`}
              </S.LinkCompany>
            </S.Card>
          ))}
        </S.CompanyList>
        <S.TitleWrap onClick={() => setExpand(!expand)} className="toggle">
          <S.BoxTitle>내 신청 정보</S.BoxTitle>
          {expand ? <Up style={{ marginTop: 6 }} /> : <Down style={{ marginTop: 6 }} />}
        </S.TitleWrap>
        <Collapse expand={expand}>{renderUserInfo()}</Collapse>
      </S.ContentsWrap>
      {serviceType !== 'clean' && !cleanType && (
        <S.Box href={CLEAN_URL}>
          <img className="left" src={require('assets/images/components/Completed/home.svg')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사" />
          <div>
            <h3 className="title">
              {data?.end_address
                .split(' ')
                .slice(0, -1)
                .pop()}
            </h3>
            <p className="desc">잘하는 입주청소 업체 찾기</p>
          </div>
          <img className="right" src={require('assets/images/components/Completed/right.svg')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사" />
        </S.Box>
      )}
      <S.Button onClick={() => setShowPopup(!showPopup)}>신청 정보 확인완료</S.Button>
      <NewModal visible={showPopup} title={'입주청소 찾기'} content={'입주청소도 필요하세요?'} confirmText={'바로 찾기'} cancelText={'다음에'} confirmClick={handleCleanConfirm} cancelClick={handleCleanCancel} />
      <NewModal visible={sessionVisible} title={'정보 만료'} content={'현재 페이지의 정보가 만료되었습니다. 다시 조회해 주세요.'} confirmClick={() => history.push('/')} confirmText={'홈으로 가기'} />
    </S.Container>
  )
}
