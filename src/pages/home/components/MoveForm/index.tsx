import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { get, isEmpty, debounce } from 'lodash'
import { useCookies } from 'react-cookie'
import queryString from 'query-string'
import dayjs, {Dayjs} from "dayjs";

import {useRouter} from 'hooks/useRouter'
import { Checkbox } from 'components/wematch-ui/Checkbox'
import { Icon } from 'components/wematch-ui'
import Button from 'components/common/Button'
import ButtonGroup from 'components/common/ButtonGroup'
import MoveInput  from 'pages/home/components/MoveInput'
import PhoneVerifyPopup from 'components/common/Popup/PhoneVerifyPopup'
import NoticePopup from 'components/common/Popup/NoticePopup';
import OneroomNoticePopup from 'components/common/Popup/OneroomNoticePopup'
import TermsModal from "components/common/Modal/TermsModal"
import ToastPopup from "components/wematch-ui/ToastPopup";
import promotionImage from 'assets/images/promotion/promotion_img.svg'

import * as commonSelector from 'store/common/selectors'
import * as formSelector from 'store/form/selectors'
import * as formActions from 'store/form/actions'
import * as colors from 'styles/colors'
import * as commonActions from '../../../../store/common/actions'
import * as commonTypes from 'store/common/types'
import { addressSplit, phoneSplit, translateMovingType } from 'components/wematch-ui/utils/form'

import { calcRouteByDirectionService, calcRouteByGeoCoder } from 'lib/distanceUtil'
import { MOVE_URL, MAIN_URL } from 'constants/env'

const Visual = {
    Section: styled.section`
        padding: 0 24px 24px;
        border-bottom: 8px solid ${colors.lineDeco};
    `,
    Container: styled.div`
        padding-top: 46px;
        color: ${colors.black};
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0;
        
        em {
            display: block;
            padding-top: 35px;
            padding-bottom: 20px;
            font-size: 16px;
            font-weight: 400;
        } 
    `,
    ButtonGroupContainer: styled.div`
        //margin: 40px 0 24px 0;
        margin-top: 40px;
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
        background-color:#f7f8fa;
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
    InfoType: styled.div`
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
    Container: styled.div`
        position: relative;
        display: flex;
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
        ${({isShow}) => isShow && css`
            display: flex;
            flex-direction: column;
            border-top: 1px solid #d7d8e2;
            margin-top: 16px;
        `}
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
    SubmitContainer: styled.div`
        display: flex;
        flex-direction: column;
    `,
}

const Promotions = {
    Wrapper: styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    leftBox: styled.div`
      line-height: 1.5;
      .text1 {
        font-size: 15px; 
      }
      .text2 {
        width: 182px;
        font-size: 18px;
        font-weight: 700;
      }
      .text3 {
        font-size: 14px;
        padding-top: 5px;
      }
      a {
        display: inline-block;
        margin-left: 5px;
        color: #1672f7;
        text-decoration: underline;
      }
      @media screen and (min-width: 1200px) {
        .text1 {
          font-size: 17px;
        }
        .text2 {
          width: 450px;
          font-size: 20px;
          margin-top: 4px;
        }
        .text3 {
          font-size: 16px;
        }
      }
    `,
    rightBox: styled.div`
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: url(${promotionImage}) no-repeat 0 0;
    `,
}

const MoveForm = () => {
    const dispatch = useDispatch()

    const getMoveType = useSelector(formSelector.getType)
    const getMoveDate = useSelector(formSelector.getDate)
    const getAddress = useSelector(formSelector.getAddress)
    const getFloor = useSelector(formSelector.getFloor)
    const getName = useSelector(formSelector.getName)
    const getPhone = useSelector(formSelector.getPhone)
    const getIsMoveStore = useSelector(formSelector.getIsMoveStore)
    const getAgree = useSelector(formSelector.getAgree)
    const getFormData = useSelector(formSelector.getFormData)

    const getPhoneVerified = useSelector(commonSelector.getPhoneVerified)
    const getMoveIdxData = useSelector(commonSelector.getMoveIdxData)

    const [collapse, setCollapse] = useState<boolean>(false)
    const [visibleTerms, setVisibleTerms] = useState<boolean>(false)
    const [visibleVerifyPhone, setVisibleVerifyPhone] = useState(false)
    const [visibleOneroom, setVisibleOneroom] = useState(false)
    const [isVerifySuccess, setIsVerifySuccess] = useState(false)
    const [distance, setDistance] = useState<string | null>(null)
    const [submitType, setSubmitType] = useState<'curation' | 'select' | null>(null)

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
        if (isEmpty(getName)) {
            alert('이름을 입력해 주세요.')
            return false;
        }
        const validatePhoneResult = phoneSplit(getPhone)
        if (isEmpty(getPhone) || !validatePhoneResult.phone1 || !validatePhoneResult.phone2 || !validatePhoneResult.phone3) {
            alert('휴대폰 번호를 정확히 입력해 주세요.')
            return false;
        }

        if (!getAgree.terms || !getAgree.privacy) {
            alert('이용약관 및 개인정보처리방침에 동의해 주세요.')
            return false;
        }

        return true
    }

    const validateOneroomForm = () => {
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
        if (isEmpty(getAddress.end)) {
            alert('도착지를 입력해 주세요.')
            return false;
        }
        if (isEmpty(getFloor.end)) {
            alert('도착지 층수를 입력해 주세요.')
            return false;
        }
        return true;
    }

    const handleSubmit = debounce(() => {
        let result = false
        if (getMoveType === 'house' || getMoveType === 'office') {
            result = validateHouseOrOfficeForm()
        } else if (getMoveType === 'oneroom') {
            result = validateOneroomForm()
        }


        if (result) {
            calcRouteByDirectionService({
                start: getAddress.start,
                end: getAddress.end
            }, (distance) => {
                if (distance) {
                    setDistance(distance)
                } else {
                    calcRouteByGeoCoder([getAddress.start, getAddress.end], (coords) => {
                        if (coords) {
                            setDistance(String(google.maps.geometry.spherical.computeDistanceBetween(coords[0], coords[1]) / 1000))
                        }
                    })
                }

                if (getMoveType === 'oneroom') {
                    // default_legacy.asp?movingtype=oneroom&keepmove=ok&start_adr=서울특별시 금천구 시흥제1동&start_flr=4층&arrive_adr=서울특별시 금천구 시흥제1동&arrive_flr=4층&distance=10.0&movingdate=2020/09/01
                    document.location.href = `${MOVE_URL}/default_legacy.asp?movingType=${getMoveType}&keepMove=${getIsMoveStore}&address=${getAddress.start}&floor=${getFloor.start}&address2=${getAddress.end}&floor2=${getFloor.end}&distance=${distance}&movingDate=${getMoveDate[0]}`
                    return
                }

                const formData:commonTypes.RequestUserInfoInsert = {
                    moving_type: translateMovingType(getMoveType),
                    moving_date: getMoveDate[0],
                    floor: `${getFloor.start}`,
                    detail_addr: getAddress.detailStart,
                    sido: addressSplit(getAddress.start).sido,
                    gugun: addressSplit(getAddress.start).gugun,
                    dong: addressSplit(getAddress.start).dong,
                    sido2: addressSplit(getAddress.end).sido,
                    gugun2: addressSplit(getAddress.end).gugun,
                    dong2: addressSplit(getAddress.end).dong,
                    floor2: `${getFloor.end}`,
                    detail_addr2: getAddress.detailEnd,
                    name: getName,
                    phone1: phoneSplit(getPhone).phone1,
                    phone2: phoneSplit(getPhone).phone2,
                    phone3: phoneSplit(getPhone).phone3,
                    keep_move: getIsMoveStore,
                    mkt_agree: getAgree.marketing,
                    distance: Number(distance) || 1,
                    agent_id: queryString.parse(get(cookies, '0dj38gepoekf98234aplyadmin')).agentid
                }

                dispatch(formActions.setFormData(formData))

                if (get(cookies, 'form') !== undefined) {
                    removeCookies('formData')
                }
                setCookies('formData', {...formData, ...getAgree}, {expires: new Date(dayjs().add(2, 'day').format())})

            })

        }
    }, 500)

    const handleOnConfirm = ():void => {
        return router.history.push('/')
    }
    useEffect(() => {
        const { type } = router.query
        if(cookies.formData) {
            dispatch(formActions.setInitialFormData(cookies.formData))
        }
        if(type === 'oneroom') {
            dispatch(formActions.setMoveType(type as formActions.MoveTypeProp))
        } else {
            dispatch(formActions.setMoveType("house" as formActions.MoveTypeProp))
        }

    }, [])

    useEffect(() => {
        if (getPhoneVerified.data.is_verified) {
            setVisibleVerifyPhone(false)
            dispatch(commonActions.fetchMoveIdx.request(getFormData))
        }

    }, [getPhoneVerified.data.is_verified])

    useEffect(() => {
        if (getFormData && submitType) {
            setVisibleVerifyPhone(true)
        }
    }, [getFormData])

    useEffect(() => {
        if(getMoveIdxData.idx && submitType === 'curation') {
            document.location.href = `${MOVE_URL}/default_legacy.asp?move_idx=${getMoveIdxData.idx}`
        }
        if(getMoveIdxData.idx && submitType === 'select') {
            router.history.push(`/partner/list`)
        }
    }, [getMoveIdxData])

    return (
        <Visual.Section>
            <Visual.Container>
                <strong>어떤 이사업체를 찾으세요?</strong>
                <em>이사종류를 선택해주세요.</em>
            </Visual.Container>
            <ButtonGroup onClick={(type: 'house' | 'oneroom' | 'office' | undefined) => {
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
                {getMoveType === 'house' && (
                    <Promotions.Wrapper>
                        <Promotions.leftBox>
                            <p className="text1">가정이사 한정!</p>
                            <p className="text2">방문견적 인증 시 <br/>매트리스 무료 소독 1회권</p>
                            <p className="text3">기간 8/19~ <a href="https://da24.wematch.com/notice.asp">자세히</a></p>
                        </Promotions.leftBox>
                        <Promotions.rightBox/>
                    </Promotions.Wrapper>
                )}
                {getMoveType === 'oneroom' && (
                    <Description.InfoType>
                        <p>
                            거주자 1인, 1톤 트럭 이내 <br />
                            포장이사 견적을 신청합니다
                        </p>
                        <a href={MAIN_URL + '/용달_화물'}>단순 운반 차량만 필요하다면 ?</a>
                    </Description.InfoType>
                )}
                {getMoveType === "office" && (
                    <Description.InfoType>
                        <p>
                            빌딩, 공장, 상가 등 <br />
                            포장이사 견적을 신청합니다
                        </p>
                    </Description.InfoType>
                )}
                <MoveInput type={getMoveType} style={{ marginTop: 40 }} />
            </Visual.ButtonGroupContainer>
            {getMoveType !== undefined && (
                <>
                    <Terms.Container>
                        <Checkbox label="보관이사 필요" checked={getIsMoveStore} onChange={() => dispatch(formActions.setIsMoveStore(!getIsMoveStore))}/>
                        <Terms.CheckWrapper>
                            <Checkbox label="전체동의 필요" checked={getAgree.terms && getAgree.privacy && getAgree.marketing} onChange={() => {
                                if (getAgree.terms && getAgree.privacy && getAgree.marketing) {
                                    dispatch(formActions.setAgree({
                                        terms: false,
                                        privacy: false,
                                        marketing: false
                                    }))
                                } else {
                                    dispatch(formActions.setAgree({
                                        terms: true,
                                        privacy: true,
                                        marketing: true
                                    }))
                                }
                            }} />
                            <Terms.View onClick={() => setCollapse(!collapse)}>
                                {collapse ? <Icon.Up size={15} color={colors.gray33} /> : <Icon.Down size={15} color={colors.gray33} />}
                            </Terms.View>
                        </Terms.CheckWrapper>
                        <Terms.Collapse isShow={collapse}>
                            <Terms.NewLink>
                                <Checkbox label="이용약관 및 개인정보처리방침 동의" checked={getAgree.terms} onChange={() => dispatch(formActions.setAgree({
                                    ...getAgree,
                                    terms: !getAgree.terms
                                }))}/>
                                <a onClick={() => setVisibleTerms(true)}>보기</a>
                            </Terms.NewLink>
                            <Checkbox label="견적요청을 위해 이사업체에 개인정보제3자 제공동의" checked={getAgree.privacy} onChange={() => dispatch(formActions.setAgree({
                                ...getAgree,
                                privacy: !getAgree.privacy
                            }))}/>
                            <Checkbox label="마케팅 정보수신 동의(선택)" checked={getAgree.marketing} onChange={() => dispatch(formActions.setAgree({
                                ...getAgree,
                                marketing: !getAgree.marketing
                            }))}/>
                        </Terms.Collapse>
                    </Terms.Container>
                    <Terms.SubmitContainer>
                        <Button theme="primary" onClick={() => {
                            handleSubmit()
                            setSubmitType('curation')
                        }}>견적 신청하기</Button>
                        {getMoveType !== 'oneroom' && (
                            <Button theme="default" onClick={() => {
                                handleSubmit()
                                setSubmitType('select')
                            }}>업체 직접고르기</Button>
                        )}
                    </Terms.SubmitContainer>
                </>
            )}
            <PhoneVerifyPopup visible={visibleVerifyPhone} phone={getPhone} onClose={() => setVisibleVerifyPhone(!visibleVerifyPhone)} />
            <NoticePopup visible={isVerifySuccess} footerButton border onClose={() => setIsVerifySuccess(!isVerifySuccess)} />
            <TermsModal visible={visibleTerms} onClose={() => setVisibleTerms(!visibleTerms)} />
            <OneroomNoticePopup visible={visibleOneroom} footerButton border onClose={() => setVisibleOneroom(!visibleOneroom)} />
        </Visual.Section>
    )
}

export default MoveForm