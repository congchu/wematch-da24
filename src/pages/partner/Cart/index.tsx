import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {useMedia} from "react-use-media";
import styled from 'styled-components'

import MainHeader from "components/MainHeader";
import TopGnb from "components/TopGnb";

import * as colors from 'styles/colors'
import Card from "./component/Card";
import ModalTemplate from "../../../components/Modal/ModalTemplate";

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
      margin-top: 14px;
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
      position: absolute;
      bottom: 0;
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
    const history = useHistory()
    const dispatch = useDispatch()
    const isDesktop = useMedia({
        minWidth: 1200,
    })
    return (
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
                        <Card/>
                        <S.PartnerMoreBtn>업체 더 고르기</S.PartnerMoreBtn>
                    </S.CardWrapper>
                </S.Wrapper>
                <S.HorizontalLine/>
                <S.Wrapper>
                    <S.CardWrapper>
                        <S.CurationTitle>이런 업체는 어떠세요?</S.CurationTitle>
                        <S.CurationSubTitle>고객의 가성비, 평가 키워드, 선택률 데이터 기준으로 추천드려요.</S.CurationSubTitle>
                        <Card/>
                        <Card/>
                    </S.CardWrapper>
                </S.Wrapper>
                <S.OrderBtnWrapper>
                    <S.OrderBtn>
                        <div>3</div>
                        <span>방문견적(무료) 요청보내기</span>
                    </S.OrderBtn>
                </S.OrderBtnWrapper>
            </S.CartContainer>
        </S.CartWrapper>
    )
};

export default PartnerCart