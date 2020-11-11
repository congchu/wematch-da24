import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useMedia} from "react-use-media";
import styled from 'styled-components'
import { isEmpty } from 'lodash';

import MainHeader from "components/MainHeader";
import TopGnb from "components/TopGnb";
import Loading from "components/Loading";
import ToastPopup from "components/wematch-ui/ToastPopup";
import ConfirmPopup from "./component/ConfirmPopup";
import Card from "./component/Card";
import AlertModal from "components/Modal/AlertModal";
import EmptyPage from "./emptyPage";
import GuidePopup from "./component/GuidePopup";

import {useRouter} from "hooks/useRouter";
import {dataLayer} from "lib/dataLayerUtil";

import * as colors from 'styles/colors'
import * as partnerSelector from "store/partner/selectors";
import * as partnerActions from "store/partner/actions";
import * as commonSelector from "store/common/selectors";
import * as constants from 'constants/env'

interface IList {
    id: number;
    title: string;
    description: string;
    isChecked?: boolean;
    adminid: string;
    adminname: string;
    keyword?: string[];
    profile_img: string;
}

const S = {
    CartWrapper: styled.div`
      height: 100%;
    `,
    CartContainer: styled.div<{isEmpty: boolean}>`
      display: flex;
      flex-direction: ${props => !props.isEmpty && 'column'};
      background-color: #f7f8fa;
      text-align: center;
      min-height: calc(100% - 98px);
      
      @media screen and (min-width: 768px) {
        min-height: calc(100% - 132px);
      }
      
      @media screen and (min-width: 1200px) {
        min-height: calc(100% - 134px);
      }
    `,
    TitleWrapper: styled.div`
      background-color: white;
      border-bottom: 1px solid ${colors.lineDefault};
     
    `,
    Title: styled.div`
      display: inline-block;
      font-size: 16px;
      letter-spacing: -1px;
      width: 100%;
      padding-left: 24px;
      box-sizing: border-box;
      p {
        font-size: 16px;
        padding: 11px 0;
        text-align: left;
        @media screen and (min-width: 768px) {
          padding: 16px 0;
        }
        @media screen and (min-width: 1200px) {
          padding: 16px 0;
        }
      };
      @media screen and (min-width:768px) {
        width: 528px;
      };
      @media screen and (min-width:1200px) {
        width: 720px;
        padding-left: 102px;
      };
    `,
    Wrapper: styled.div<{marginBottom?: number | null}>`
      display: inline-block;
      width: 100%;

      @media screen and (max-width: 768px) {
        margin-bottom: ${props => props.marginBottom && props.marginBottom}px;
      }


      @media screen and (min-width: 1200px) {
        width: auto;
        margin: 0 auto;
      } 
    `,
    CardWrapper: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 24px;
    `,
    HorizontalLine: styled.div`
      width: 100%;
      height: 8px;
      background-color: #ebeef2;
      border-top: 1px solid ${colors.lineDefault};
      
      @media screen and (min-width:1200px) {
        width: 720px;
        margin: 0 auto;
      };
    `,
    PartnerMoreBtn: styled.button`
      text-align: right;
      font-size: 14px;
      color: ${colors.gray66};
      letter-spacing: -1px;
      text-decoration: underline;
      margin-top: 6px;
      
      cursor: pointer;
    `,
    CurationTitle: styled.div`
      font-size: 16px;
      letter-spacing: -1px;
      text-align: left;
    `,
    CurationSubTitle: styled.div`
      font-size: 12px;
      color: ${colors.gray88};
      line-height: 1.67;
      letter-spacing: -1px;
      margin-bottom: 15px;
      text-align: left;
    `,
    OrderBtnWrapper: styled.div`
      width: 100%;
      position: fixed;
      bottom: 0;
      
      @media screen and (min-width: 768px) {
        position: absolute;
        bottom: 0; 
      }
      @media screen and (min-width: 1200px) {
        position: relative;
      };
    `,
    OrderBtn: styled.div<{disabled: boolean}>`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 64px;
      background-color: ${props => props.disabled ? '#D7DBE2': '#1672f7'};
      pointer-events: ${props => props.disabled && 'none'};
      &:hover {
        cursor: pointer;
      }
      div {
        width: 25px;
        height: 25px;
        background-color: #f1fe24;
        border-radius: 50%;
        color: ${colors.gray33};
        font-size: 13px;
        font-weight: bold;
        margin-right: 7px;
        text-align: center;
        line-height: 2.2;
      };
      span {
        font-size: 18px;
        font-weight: bold;
        color: ${colors.white};
      }
      
      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0 auto;
      }
    `,
    GuideBtn: styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.85);
      border: 1px solid #1672F7;
      box-sizing: border-box;
      box-shadow: 0px 4px 10px rgba(45, 128, 247, 0.24);
      border-radius: 24px;
      height: 40px;
      padding: 24px;
      margin: 0 24px 24px;
      color: ${colors.pointVividBlue};
      font-size: 14px;
      line-height: 21px;
      letter-spacing: -1px;
    
      @media screen and (min-width: 768px) {
        width: 312px;
        margin: 0 auto;
        margin-bottom: 24px;
      }
    `,
};

const PartnerCart = () => {
    const [alertVisible, setAlertVisible] = useState(false)
    const [guideVisible, setGuideVisible] = useState(false)
    const [sessionVisible, setSessionVisible] = useState(false)
    const [orderConfirmVisible, setOrderConfirmVisible] = useState(false)
    const [checkedList, setCheckedList]:any = useState([])
    const [selectList, setSelectList]:any = useState([])
    const [recommendedList, setRecommendedList]:any = useState([])

    const recommendCart = React.useRef<HTMLDivElement>(null)

    const router = useRouter()
    const history = useHistory()
    const dispatch = useDispatch()

    const getCartPartnerList = useSelector(partnerSelector.getCartPartnerList)
    const getPartnerPickList = useSelector(partnerSelector.getPartnerPick)
    const getMatchingData = useSelector(partnerSelector.getMatchingData)
    const getMoveIdxData = useSelector(commonSelector.getMoveIdxData)

    const isDesktop = useMedia({
        minWidth: 1200,
    })

    useEffect(() => {
        if (!isEmpty(getPartnerPickList) && getMoveIdxData.idx) {
            const selectedId = getPartnerPickList.data.map(list => list.adminid)
            if(!isEmpty(selectedId)) {
                dispatch(partnerActions.fetchCartListAsync.request({idx: getMoveIdxData.idx, admin_id: selectedId}))
            }
        }

        if (!getMoveIdxData.idx) {
            setSessionVisible(true)
        }

    }, [])


    useEffect(() => {
        if (!getCartPartnerList.loading && !isEmpty(getPartnerPickList)) {
            initialPartnerList();
        }
    }, [getCartPartnerList])

    useEffect(() => {
        if (getMatchingData.idx.length > 0) {
            document.location.href = `${constants.MOVE_URL}/move_step_complete.asp?move_idx=${getMatchingData.idx}`
        }
    }, [getMatchingData])

    const initialPartnerList = () => {
        const {selectedList, recommendedList: recommended} = getCartPartnerList
        const checkedList:any = [];
            const b = selectedList.map((list:any) => {
                if(checkedList.length < 3) {
                    list.isChecked = true;
                    checkedList.push(list.adminid)
                } else {
                    list.isChecked = false;
                }
                return list
            });
            if (!isEmpty(recommended)) {
                const c = recommended.map((list:any) => {
                    if(checkedList.length < 3) {
                        list.isChecked = true;
                        checkedList.push(list.adminid)
                    } else {
                        list.isChecked = false;
                    }
                    return list
                });
                setRecommendedList(c)
            } else {
                setRecommendedList([])
            }
            setSelectList(b)
            setCheckedList(checkedList)
    };
    const handleSubmit = () => {
        dispatch(partnerActions.fetchMatchingAsync.request({idx:getMoveIdxData.idx, partners:checkedList}))
        dataLayer({event: 'request_approve'})
    }

    const handleOrderBtn = () => {
        const selectPartners = checkedList.filter((id:string) => {
            let result = 0
            selectList.map((list:any) => {list.adminid === id && result++})
            return result
        })

        const recommendPartners = checkedList.filter((id:string) => {
            let result = 0
            recommendedList.map((list:any) => {list.adminid === id && result++})
            return result
        })

        dataLayer({event: 'request_cta', CD9: `선택업체_${selectPartners.length}-${selectList.length},추천업체_${recommendPartners.length}-${recommendedList.length}`})
        setOrderConfirmVisible(true)
    }
    const handleCheck = (list:IList, id:string) => {
        if(list.isChecked) {
            // 이미 선택이 되어있는 경우 삭제하는 로직
            list.isChecked = !list.isChecked;
            setCheckedList(checkedList.filter((partnerId: any) => partnerId !== id));
        } else {
            if(checkedList.length === 3) {
                // 이미 선택 되어있는 업체수가 3일 경우 Alert 모달 출력
                setAlertVisible(true);
                return
            }

            // 선택이 되어있지 않으면서 업체수가 3개 미만일 경우 추가하는 로직
            list.isChecked = !list.isChecked;
            setCheckedList([...checkedList, id]);
        }
    };

    if (getCartPartnerList.loading || getMatchingData.loading) {
        return <Loading text={'견적요청 페이지로 이동 중입니다.'}/>
    }

    return (
        <>
        <S.CartWrapper>
            {isDesktop ? <MainHeader/> : <TopGnb title="방문견적 요청" count={0} onPrevious={() => history.goBack()} showTruck={false}/>}
                <S.TitleWrapper>
                    <S.Title>
                        <p>내가 선택한 업체</p>
                    </S.Title>
                </S.TitleWrapper>
            <S.CartContainer isEmpty={isEmpty(getCartPartnerList.selectedList)}>
                {isEmpty(getCartPartnerList.selectedList)
                    ? <EmptyPage />
                    :
                    <>
                        <S.Wrapper marginBottom={isEmpty(recommendedList) ? recommendCart.current?.offsetHeight : null}>
                            <S.CardWrapper>
                                {selectList.map((list:IList) => {
                                    return <Card key={list.id} list={list} onSelect={handleCheck}/>
                                })}
                                <S.PartnerMoreBtn onClick={() => router.push('/partner/list')} id="dsl_booking_cart_more">업체 더 고르기</S.PartnerMoreBtn>
                            </S.CardWrapper>
                        </S.Wrapper>
                        {!isEmpty(recommendedList) && <S.HorizontalLine/>}
                        {
                            !isEmpty(recommendedList) && (
                                <S.Wrapper marginBottom={recommendCart.current?.offsetHeight}>
                                    <S.CardWrapper>
                                        <S.CurationTitle>이런 업체는 어떠세요?</S.CurationTitle>
                                        <S.CurationSubTitle>고객의 가성비, 평가 키워드, 선택률 데이터 기준으로 추천드려요.</S.CurationSubTitle>
                                        {recommendedList.map((list:IList) => {
                                            return <Card key={list.id} list={list} onSelect={handleCheck}/>
                                        })}
                                    </S.CardWrapper>
                                </S.Wrapper>
                            )
                        }
                        <S.OrderBtnWrapper ref={recommendCart} id="dsl_booking_cart_buttons">
                            <S.GuideBtn onClick={() => setGuideVisible(!guideVisible)} id="dsl_booking_cart_content">
                                <div>방문없이 가격만 알 순 없나요?</div>
                                <div>></div>
                            </S.GuideBtn>
                            <S.OrderBtn onClick={() => handleOrderBtn()} id="dsl_booking_cart_cta" disabled={checkedList.length === 0}>
                                {checkedList.length > 0 && (
                                    <div>{checkedList.length}</div>
                                )}
                                <span>{checkedList.length === 0 ? '업체를 선택해주세요' : '방문견적(무료) 요청보내기'}</span>
                            </S.OrderBtn>
                        </S.OrderBtnWrapper>
                    </>
                }
            </S.CartContainer>
        </S.CartWrapper>
        <AlertModal visible={alertVisible} onConfirm={() => setAlertVisible(!alertVisible)} title={"3개 비교할 때 \n 만족도가 가장 높아요!"} subTitle={"더 많은 업체 비교를 원하시면\n고객센터(1522-2483)에 문의해주세요"}/>
        <GuidePopup visible={guideVisible} onClose={() => setGuideVisible(!guideVisible)}/>
        <ConfirmPopup visible={orderConfirmVisible} showHeaderCancelButton={true} cancelClick={() => setOrderConfirmVisible(!orderConfirmVisible)} confirmClick={() => {
            handleSubmit();
            setOrderConfirmVisible(false);
            }} orderCount={checkedList.length}
        />
        <ToastPopup visible={sessionVisible} confirmText={'홈으로 가기'} confirmClick={() => history.push('/')} showHeaderCancelButton={false}>
            <p>{'정보가 만료되었습니다.\n다시 조회해주세요'}</p>
        </ToastPopup>
        </>
    )
};

export default PartnerCart