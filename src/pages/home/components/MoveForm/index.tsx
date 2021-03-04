import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useCookies} from 'react-cookie'
import {useRouter} from 'hooks/useRouter'
import queryString from 'query-string'
import styled, {css} from 'styled-components'
import {debounce, get, isEmpty} from 'lodash'
import dayjs from 'dayjs'
import {Checkbox} from 'components/wematch-ui/Checkbox'

import Button from 'components/common/Button'
// import PhoneVerifyPopup from 'components/common/Popup/PhoneVerifyPopup'
import NoticePopup from 'components/common/Popup/NoticePopup'
import OneroomNoticePopup from 'components/common/Popup/OneroomNoticePopup'
import TermsModal from 'components/common/Modal/TermsModal'

import ButtonGroup from 'components/common/ButtonGroup'
import MoveInput from 'pages/home/components/MoveInput'

import * as commonSelector from 'store/common/selectors'
import * as commonActions from 'store/common/actions'
import * as commonTypes from 'store/common/types'
import * as formSelector from 'store/form/selectors'
import * as formActions from 'store/form/actions'
import * as userActions from 'store/user/actions';
import * as userSelector from 'store/user/selectors';

import * as colors from 'styles/colors'
import {addressSplit, phoneSplit, translateMovingType} from 'components/wematch-ui/utils/form'

import {calcRouteByDirectionService, calcRouteByGeoCoder} from 'lib/distanceUtil'
import {dataLayer} from 'lib/dataLayerUtil'
import {MOVE_URL, ONEROOM_URL} from 'constants/env'
import useHashToggle from 'hooks/useHashToggle'
import LoginModal from 'components/common/Modal/LoginModal'
import {events} from 'lib/appsflyer'
import { useHistory } from 'react-router-dom'
import { ESignInCase } from 'store/user/types'

const Visual = {
    Section: styled.section`
      padding: 0 24px 80px;
    `,
    Container: styled.div`
      padding-top: 32px;
      padding-bottom: 16px;

      strong {
        display: block;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        letter-spacing: -0.03em;
        color: ${colors.gray33};
        margin-bottom: 8px;
      }

      p {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: ${colors.gray66};
      }
    `,
    ButtonGroupContainer: styled.div`
      margin-top: 26px;
    `,
}

const Description = {
    Container: styled.div`
      margin-top: 40px;
      margin-bottom: 20px;
    `,
    Box: styled.div`
      padding: 16px;
      border: 1px solid #d7dbe2;
      border-radius: 8px;
      background-color: #f7f8fa;
      letter-spacing: -1px;
      margin-bottom: 16px;

      strong {
        font-weight: 700;
      }

      ul {
        padding-top: 10px;
        line-height: 26px;
      }
    `,
    InfoType: styled.div<{ selectMoveType: 'house' | 'oneroom' | 'office' | undefined }>`
      display: ${props => props.selectMoveType === 'office' ? 'block' : 'none'};
      text-align: center;
      margin-bottom: 28px;

      p {
        font-size: 16px;
        font-weight: 700;
        line-height: 25px;
        letter-spacing: -0.5px;
      }

      a {
        display: inline-block;
        margin-top: 15px;
        font-size: 15px;
        color: ${colors.pointBlue};
        text-decoration: underline;
        letter-spacing: -0.5px;
      }
    `
}

const Terms = {
    Container: styled.div<{ selectMoveType: boolean }>`
      position: relative;
      display: ${props => props.selectMoveType ? 'flex' : 'none'};
      flex-direction: column;
      margin-bottom: 14px;

      label {
        margin-top: 14px;
      }
    `,
    View: styled.div`
      cursor: pointer;
    `,
    CheckWrapper: styled.div`
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    `,
    Collapse: styled.div<{ isShow: boolean }>`
      display: none;
      ${props => props.isShow && css`
        display: flex;
        flex-direction: column;
        border-top: 1px solid #d7d8e2;
        margin-top: 16px;
      `};
    `,
    NewLink: styled.div`
      display: flex;
      align-items: flex-end;

      a {
        color: ${colors.gray33};
        text-decoration: underline;
        margin-left: 5px;
        line-height: 24px;
        margin-bottom: -2px;
      }
    `,
    SubmitContainer: styled.div<{ selectMoveType: boolean }>`
      display: ${props => props.selectMoveType ? 'flex' : 'none'};
      flex-direction: column;

      .text {
        margin: 24px 0;
        text-align: center;

        .mobile-enter {
          display: initial;
        }

        p {
          text-align: center;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.03em;
          color: ${colors.gray66};
        }

        strong {
          font-weight: bold;

          &:last-child {
            color: ${colors.pointBlue};
          }
        }
      }

      @media screen and (min-width: 1200px) {
        .text {
          .mobile-enter {
            display: none;
          }
        }
      }
    `
}

const HouseTitle = styled.div<{ selectMoveType: 'house' | 'oneroom' | 'office' | undefined }>`
  display: ${props => props.selectMoveType === 'house' ? 'block' : 'none'};
  text-align: center;

  strong {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.03em;
    color: ${colors.gray33};
  }
`


interface Props {
    headerRef?: React.RefObject<HTMLDivElement>;
    isFixed?: boolean;
    setIsFixed?: React.Dispatch<boolean>;
}

const MoveForm = ({headerRef, isFixed, setIsFixed}: Props) => {
    const dispatch = useDispatch()
    const getMoveType = useSelector(formSelector.getType)
    const getMoveDate = useSelector(formSelector.getDate)
    const getAddress = useSelector(formSelector.getAddress)
    const getFloor = useSelector(formSelector.getFloor)
    const getIsMoveStore = useSelector(formSelector.getIsMoveStore)
    const {user} = useSelector(userSelector.getUser);
    const history = useHistory();
    const [visibleTerms, setVisibleTerms] = useHashToggle('#terms')
    const [visibleOneroom, setVisibleOneroom] = useState(false)
    const [isVerifySuccess, setIsVerifySuccess] = useState(false)
    const selectedSubmitType = useRef<'curation' | 'select' | null>(null)
    const [cookies, setCookies, removeCookies] = useCookies(['0dj38gepoekf98234aplyadmin'])
    const router = useRouter();

    const validateHouseOrOfficeForm = () => {
        if (isEmpty(getMoveDate)) {
            alert('날짜를 선택해 주세요.')
            return false;
        }
        if (isEmpty(getAddress.start)) {
            alert('출발지를 입력해 주세요.')
            return false;
        }
        if (isEmpty(getFloor.start)) {
            alert('출발지를 층수를 입력해 주세요.')
            return false;
        }
        if (isEmpty(getAddress.detailStart)) {
            alert('출발지 상세주소를 입력해 주세요.')
            return false;
        }
        if (isEmpty(getAddress.end)) {
            alert('도착지를 입력해 주세요.')
            return false;
        }
        if (isEmpty(getFloor.end)) {
            alert('도착지 층수를 입력해 주세요.')
            return false;
        }
        if (isEmpty(getAddress.detailEnd)) {
            alert('도착지 상세주소를 입력해 주세요.')
            return false;
        }
        return true
    }

    const handleRequestClick = (submitType: 'curation' | 'select') => {
        if (!validateHouseOrOfficeForm()) return;
        selectedSubmitType.current = submitType;
        dispatch(formActions.setSubmitType(submitType));

        if(!user) {
          dispatch(userActions.signIn({prevPage: ESignInCase.FORM}))
          history.push('/login')
        } else {
          dispatch(formActions.fetchMoveData())
        }
    }

    useEffect(() => {
        const {type} = router.query
        if (cookies.formData) {
            dispatch(formActions.setInitialFormData(cookies.formData))
        }

        if (type === 'house') {
            dispatch(formActions.setMoveType("house" as formActions.MoveTypeProp))
        }
    }, [dispatch])

    return (
        <Visual.Section>
            <Visual.Container>
                <strong>어떤 이사업체를 찾으세요?</strong>
                <p>이사 종류를 선택해주세요.</p>
            </Visual.Container>
            <ButtonGroup headerRef={headerRef} isFixed={isFixed} setIsFixed={setIsFixed}
                         onClick={(type: 'house' | 'oneroom' | 'office' | undefined) => {
                             if (type === 'oneroom') {
                                 document.location.href = `${ONEROOM_URL}`
                                 return
                             }
                             dispatch(formActions.setMoveType(type as formActions.MoveTypeProp))
                         }}/>
            <Visual.ButtonGroupContainer>
                {getMoveType === undefined && (
                    <Description.Container>
                        <Description.Box>
                            <strong>Q 이사종류 어떻게 구분하나요?</strong>
                            <ul>
                                <li>- 가정이사 : 거주자 2명이상, 투룸 이상의 짐량</li>
                                <li>- 원룸이사 : 거주자 1명, 1톤 트럭 이내 포장이사</li>
                                <li>- 사무실이사 : 빌딩, 공장, 상가 등 1톤 트럭 초과</li>
                            </ul>
                        </Description.Box>
                    </Description.Container>
                )}
                <HouseTitle selectMoveType={getMoveType}>
                    <strong>거주자 2명이상, 투룸 이상의 짐량</strong>
                </HouseTitle>
                <Description.InfoType style={{ marginBottom: 0 }} selectMoveType={getMoveType}>
                    <p>빌딩, 공장, 상가 등 짐량 1톤 트럭 초과</p>
                </Description.InfoType>
                <MoveInput type={getMoveType} style={{ marginTop: 30 }} />
            </Visual.ButtonGroupContainer>
            <>
                <Terms.Container selectMoveType={getMoveType !== undefined}>
                    <Checkbox label="보관이사 필요" checked={getIsMoveStore} onChange={() => dispatch(formActions.setIsMoveStore(!getIsMoveStore))} />
                </Terms.Container>
                <Terms.SubmitContainer selectMoveType={getMoveType !== undefined}>
                    <div className="text">
                        <p>
                            내 조건에 맞는 업체<strong>(최대 3개)</strong>에 <br className="mobile-enter"/>
                            비용산정을 위한 <strong>무료 견적상담</strong>을 신청합니다
                        </p>
                    </div>
                    <div id="dsl_move_button_requests_1">

                        {/******* AUTO MATCH *******/}
                        <Button theme="primary" bold border onClick={() => handleRequestClick('curation')}>추천업체 바로 신청하기</Button>
                        {/* {getMoveType !== 'oneroom' && (
                          <Button theme="default" onClick={() => handleRequestClick('select')}>업체 직접고르기</Button>
                        )} */}
                    </div>
                </Terms.SubmitContainer>
            </>
            <NoticePopup visible={isVerifySuccess} footerButton border onClose={() => setIsVerifySuccess(!isVerifySuccess)} />
            <TermsModal visible={visibleTerms} onClose={() => setVisibleTerms(!visibleTerms)} />
            <OneroomNoticePopup visible={visibleOneroom} footerButton border onClose={() => setVisibleOneroom(!visibleOneroom)} />
        </Visual.Section>
    )
}

export default MoveForm
