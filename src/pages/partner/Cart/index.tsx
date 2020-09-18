import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useMedia} from "react-use-media";
import styled from 'styled-components'

import MainHeader from "components/MainHeader";
import TopGnb from "components/TopGnb";

import * as colors from 'styles/colors'
import Card from "./component/Card";
import AlertModal from "components/Modal/AlertModal";
import EmptyPage from "./emptyPage";
import GuidePopup from "./component/GuidePopup";
import GradeToastPopup from 'components/common/GradePopup';
import {useRouter} from "hooks/useRouter";
import * as partnerSelector from "../../../store/partner/selectors";
import * as partnerActions from "../../../store/partner/actions";
import { isEmpty } from 'lodash';
import * as commonSelector from "../../../store/common/selectors";

interface IList {
    id: number;
    title: string;
    description: string;
    isChecked?: boolean;
    adminid: string;
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
    Wrapper: styled.div`
      display: inline-block;
      width: 100%;


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
      position: sticky;
      bottom: 0;
      
      @media screen and (min-width: 768px) {
        position: absolute;
        bottom: 0; 
      }
      @media screen and (min-width: 1200px) {
        position: relative;
      };
    `,
    OrderBtn: styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 64px;
      background-color: #1672f7;
      &:hover {
        cursor: pointer;
      };
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
    const [checkedList, setCheckedList]:any = useState([])
    const [selectList, setSelectList]:any = useState([])
    const [recommendedList, setRecommendedList]:any = useState([])

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
            dispatch(partnerActions.fetchCartListAsync.request({idx: getMoveIdxData.idx}))
        }
    }, [])

    useEffect(() => {
        if (!getCartPartnerList.loading && !isEmpty(getPartnerPickList)) {
            initialPartnerList();
        }
    }, [getCartPartnerList])

    useEffect(() => {
        if (getMatchingData.idx.length > 0) {
            document.location.href = `http://m.dev.da24.wematch.com/move_step_complete.asp?move_idx=${getMatchingData.idx}`
        }
    }, [getMatchingData])
    const initialPartnerList = () => {
        const {selectedList, recommendedList} = getCartPartnerList
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
            if (!isEmpty(recommendedList)) {
                const c = recommendedList.map((list:any) => {
                    if(checkedList.length < 3) {
                        list.isChecked = true;
                        checkedList.push(list.adminid)
                    } else {
                        list.isChecked = false;
                    }
                    return list
                });
                setRecommendedList(c)
            }
            setSelectList(b)
            setCheckedList(checkedList)
    };
    const handleSubmit = () => {
        dispatch(partnerActions.fetchMatchingAsync.request({idx:getMoveIdxData.idx, partners:checkedList}))
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
        return <div>loading</div>
    }

    console.log('checkedList:',checkedList)
    return (
        <>
        <S.CartWrapper>
            {isDesktop ? <MainHeader/> : <TopGnb title="방문견적 요청" count={getPartnerPickList.data.length} onPrevious={() => history.goBack()}/>}
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
                        <S.Wrapper>
                            <S.CardWrapper>
                                {selectList.map((list:IList) => {
                                    return <Card key={list.id} list={list} onSelect={handleCheck}/>
                                })}
                                <S.PartnerMoreBtn onClick={() => history.goBack()}>업체 더 고르기</S.PartnerMoreBtn>
                            </S.CardWrapper>
                        </S.Wrapper>
                        <S.HorizontalLine/>
                        {
                            !isEmpty(recommendedList) && (
                                <S.Wrapper>
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
                        <S.OrderBtnWrapper>
                            <S.GuideBtn onClick={() => setGuideVisible(!guideVisible)}>
                                <div>방문없이 가격만 알 순 없나요?</div>
                                <div>></div>
                            </S.GuideBtn>
                            <S.OrderBtn onClick={() => handleSubmit()}>
                                {checkedList.length > 0 && (
                                    <div>{checkedList.length}</div>
                                )}
                                <span>방문견적(무료) 요청보내기</span>
                            </S.OrderBtn>
                        </S.OrderBtnWrapper>
                    </>
                }
            </S.CartContainer>
        </S.CartWrapper>
        <AlertModal visible={alertVisible} onConfirm={() => setAlertVisible(!alertVisible)} title={"3개 비교할 때 \n 만족도가 가장 높아요!"} subTitle={"더 많은 업체 비교를 원하시면\n고객센터(1522-2483)에 문의해주세요"}/>
        {/*<PartnerDetailPopup visible={partnerDetailVisible} onClose={() => setPartnerDetailVisible(!partnerDetailVisible)}/>*/}
        <GuidePopup visible={guideVisible} onClose={() => setGuideVisible(!guideVisible)}/>
        </>
    )
};

export default PartnerCart