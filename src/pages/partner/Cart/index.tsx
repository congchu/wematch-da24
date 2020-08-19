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
import PartnerDetailPopup from "./component/ToastPopup";

interface IList {
    id: number;
    title: string;
    subTitle: string;
    isChecked?: boolean;
}
const S = {
    CartWrapper: styled.div`
      height: 100%;
    `,
    CartContainer: styled.div`
      height: calc(100% - 56px);
      background-color: #f7f8fa;
      text-align: center;
      
      @media screen and (min-width: 768px) {
        height: calc(100% - 80px);
      }
    `,
    TitleWrapper: styled.div`
      background-color: white;
      border-bottom: 1px solid ${colors.lineDefault};
      @media screen and (min-width: 1200px) {
        border-top: 10px solid ${colors.grayBg};
      };
    `,
    Title: styled.div`
      display: inline-block;
      font-size: 16px;
      letter-spacing: -1px;
      width: 312px;
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
      };
    `,
    Wrapper: styled.div`
      display: inline-block;
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
};

const PartnerCart = () => {
    const [alertVisible, setAlertVisible] = useState(false)
    const [partnerDetailVisible, setPartnerDetailVisible] = useState(false)
    const [checkedList, setCheckedList]:any = useState([])
    const [loading, setLoading]:any = useState(false)
    const [selectList, setSelectList]:any = useState([])
    const [recommendedList, setRecommendedList]:any = useState([])
    const history = useHistory()
    const dispatch = useDispatch()
    const isDesktop = useMedia({
        minWidth: 1200,
    })
    useEffect(() => {
        initialPartnerList();
        setLoading(false)
    }, [])

    const selectPartnerList = [
        {id: 0, title: "내가 선택한 업체다", subTitle: "이 업체는 뭔가 느낌이 좋아 왜냐하면 오늘은 월요일이기 때문이지"},
        {id: 1, title: "월요일이 싫으신가요", subTitle: "월요일은 싫어요 월요일이 사라지면 화요일이 싫겠죠? 그냥 평일이 싫어요 주말만 있어라"},
    ]
    const recommandedPartnerList = [
        {id: 2, title: "502다이사", subTitle: "502 다이사는 별 의미가 없는 이름입니다. 최선을 다하겠습니다. 화이티이이이잉"},
        {id: 3, title: "내가 이사왕", subTitle: "안녕하세요 저보다 이사 잘하는사람은 세상에 존재하지 않습니다. 이유는 저기 때문이죠"},
    ]

    const initialPartnerList = () => {
        const checkedList:any = [];
        const b = selectPartnerList.map((list:any) => {
            if(checkedList.length < 3) {
                list.isChecked = true;
                checkedList.push(list.id)
            } else {
                list.isChecked = false;
            }
            return list
        });
        const c = recommandedPartnerList.map((list:any) => {
            if(checkedList.length < 3) {
                list.isChecked = true;
                checkedList.push(list.id)
            } else {
                list.isChecked = false;
            }
            return list
        });

        setSelectList(b)
        setRecommendedList(c)
        setCheckedList(checkedList)
    };

    const handleCheck = (list:IList, id:number) => {
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

    if (loading) {
        return <div>loading</div>
    }
    return (
        <>
        <S.CartWrapper>
            {isDesktop ? <MainHeader/> : <TopGnb title="방문견적 요청" count={1} onPrevious={() => history.goBack()}/>}
            <S.CartContainer>
                <S.TitleWrapper>
                    <S.Title>
                        <p>내가 선택한 업체</p>
                    </S.Title>
                </S.TitleWrapper>
                <S.Wrapper>
                    <S.CardWrapper>
                        {selectList.map((list:IList) => {
                            return <Card key={list.id} list={list} onSelect={handleCheck} openDetailPopup={() => setPartnerDetailVisible(!partnerDetailVisible)}/>
                        })}
                        <S.PartnerMoreBtn>업체 더 고르기</S.PartnerMoreBtn>
                    </S.CardWrapper>
                </S.Wrapper>
                <S.HorizontalLine/>
                <S.Wrapper>
                    <S.CardWrapper>
                        <S.CurationTitle>이런 업체는 어떠세요?</S.CurationTitle>
                        <S.CurationSubTitle>고객의 가성비, 평가 키워드, 선택률 데이터 기준으로 추천드려요.</S.CurationSubTitle>
                        {recommendedList.map((list:IList) => {
                            return <Card key={list.id} list={list} onSelect={handleCheck} openDetailPopup={() => setPartnerDetailVisible(!partnerDetailVisible)}/>
                        })}
                    </S.CardWrapper>
                </S.Wrapper>
                <S.OrderBtnWrapper>
                    <S.OrderBtn>
                        {checkedList.length > 0 && (
                            <div>{checkedList.length}</div>
                        )}
                        <span>방문견적(무료) 요청보내기</span>
                    </S.OrderBtn>
                </S.OrderBtnWrapper>
            </S.CartContainer>
        </S.CartWrapper>
        <AlertModal visible={alertVisible} onConfirm={() => setAlertVisible(!alertVisible)} title={"3개 비교할 때 \n 만족도가 가장 높아요!"} subTitle={"더 많은 업체 비교를 원하시면\n고객센터(1522-2483)에 문의해주세요"}/>
        <PartnerDetailPopup visible={partnerDetailVisible} onClose={() => setPartnerDetailVisible(!partnerDetailVisible)}/>
        {/*<TermsModal visible={true}/>*/}
        </>
    )
};

export default PartnerCart