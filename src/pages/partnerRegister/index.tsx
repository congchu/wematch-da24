import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import useHashToggle from 'hooks/useHashToggle'
import { Swiper, SwiperSlide } from 'swiper/react'

import Layout from 'components/base/Layout'
import Input from 'components/common/Input'
import Select from 'components/common/Select'

import * as colors from 'styles/colors'
import SvgSearch from "../../components/wematch-ui/Icon/generated/Search";
import {Checkbox} from "../../components/wematch-ui";
import * as formActions from "../../store/form/actions";
import TermsModal from "../../components/common/Modal/TermsModal";
import {gray33, gray66, pointBlue} from "styles/colors";
import {dataLayer} from "../../lib/dataLayerUtil";


const CustomSwiper = styled(Swiper)`  
  .swiper-pagination-bullets {
    display: block;
    bottom: 40px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  
  .swiper-pagination-bullet {
    color: #C4C9D1;
  }
  
  .swiper-pagination-bullet-active {
    border-radius: 40px;
    background: ${pointBlue};
  }
`

const Slide = styled.div<{image: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 90%;
  height: 410px;
  margin: 0;
  padding: 20px;
  
  ${props => props.image && css`
    background-image: url(${props.image});
  `};
  background-size: 85%;
  background-repeat: no-repeat;
  background-position: center center;

  font-style: normal;
  font-weight: normal;
  color: ${gray33};

  @media screen and (min-width: 768px){
    padding: 60px 0;
  }
  
  
  .wrapper {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
  }
  
  span {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
    
    > strong {
      font-weight: bold;
    }
  } 
  
  p {
    font-size: 24px;
    line-height: 35px;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
    
    > strong {
      font-weight: bold;
    }
  }
  
  a {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.01em;
    color: ${gray66};
  }
  
  @media screen and (min-width: 768px) {
    width: 608px;
    height: 410px;
    background-size: 60%;
    ${props => props.image && css`
      background-image: url(${props.image});
    `};
  }
  
  @media screen and (min-width: 1200px) {
    width: 720px;
    height: 410px;
    background-size: 50%;
    span {
      font-size: 18px;
      line-height: 27px;
    } 
    
    p {
      font-size: 36px;
      line-height: 52px;
    } 
  }
`






const S = {
    Container: styled.div`
      display: block;
    `,
    Title: styled.h3`
      display: block;
      padding: 40px 0 16px;
      font-weight: 600;
      font-size: 22px;
      line-height: 33px;
      color: #333;
      letter-spacing: -1px;
      text-align: center;
      
      strong{
        display: block;
        padding-top: 0;
        font-size: 20px;
        font-weight: 600;
        line-height: 29px;
      }
      
      span{
        display: block;
        font-weight: 100;
        font-size: 16px;
        line-height: 24px;
      }
      
      .br_m {
        display: block;
      }

      @media screen and (min-width: 1200px){
        display: none;
      }
      
      @media screen and (min-width: 768px){
        strong{
          padding-top: 0;
          font-size: 32px;
          font-weight: 600;
          line-height: 34px;
        }
        
        span{
          padding-top: 10px;
          font-size: 18px;
        }
        
        .br_m {
          display: inline;
        }
        
      }
      
    `,
    VideoContainer: styled.div`
      display: block;
      width: 100%;
      max-width: 360px;
      height: 180px;
      margin: 26px auto 0;
      background-color: #000;
      @media screen and (min-width: 768px) {
        max-width: none;
        height: 375px;
        margin-top: 3px;
      }
      @media screen and (min-width: 1200px) {
        margin: 0;
      }
    `,
    ReasonContainer: styled.div`
      border-top: 0 none;
      padding: 35px 0 38px;
      text-align: center;

      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0;
        padding: 58px 0;
      }

      @media screen and (min-width: 768px) and (max-width: 1119px) {
        width: 608px;
        margin: 0 auto;
        padding: 58px 0;
      }

      h3 {
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: -1px;
      }

      ul {
        list-style: none;

        @media screen and (min-width: 768px) {
          overflow: hidden;
        }

        li {
          letter-spacing: -0.75px;
          padding-top: 20px;

          @media screen and (min-width: 768px) {
            float: left;
            width: 33.33%;
            padding-top: 32px;

          }

          p {
            font-size: 14px;
            line-height: 20px;
          }

          strong {
            display: block;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            font-style: normal;
          }

          .display_t {
            display: none !important;
            @media screen and (min-width: 768px) {
              display: block !important;
              em {
                display: block;
                padding: 16px 0 5px;
                font-size: 16px;
                font-weight: 700;
                color: #888;
                line-height: 20px;
                letter-spacing: -0.5px;
              }
            }

            p {
              font-size: 14px;
              line-height: 20px;
              display: block;
              margin-block-start: 1em;
              margin-block-end: 1em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
              @media screen and (min-width: 768px) {
                .br_t {
                  display: block;
                }
              }

              img {
                width: 194px;
                margin: 0 auto 16px;
                border: 0 none;

                @media screen and (min-width: 768px) {
                  width: 76px;
                  height: 47px;
                  margin: 0 0 16px;

                }
              }

            }


          }


        }


    `,
    BenefitContainer: styled.div`
      border-top: 0 none;
      padding: 35px 0 38px;
      text-align: center;

      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0 auto;
        padding: 58px 0;
      }

      @media screen and (min-width: 768px) and (max-width: 1119px) {
        width: 608px;
        margin: 0 auto;
        padding: 58px 0;
      }

      h3 {
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: -1px;
      }

      ul {
        list-style: none;

        @media screen and (min-width: 768px) {
          overflow: hidden;
        }

        li {
          letter-spacing: -0.75px;
          padding-top: 20px;

          @media screen and (min-width: 768px) {
            float: left;
            width: 30%;
            padding-left: 18px;
            padding-top: 32px;

          }

          p {
            font-size: 14px;
            line-height: 20px;
          }

          strong {
            display: block;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            font-style: normal;
          }
          
          img {
            width: 194px;
            margin: 0 auto 16px;
            border: 0 none;
            @media screen and (min-width: 768px){
              display: block;
              width: 100%;
              margin: 0 0 16px;
            }
            
          }
          
        }
      }

    `,
    GuideContainer: styled.div`
      padding: 0;
      margin: 0 24px;
      text-align: center;
      display: block;

      @media screen and (min-width: 768px){
        overflow: hidden;
        padding: 64px 0 60px;
        width: 608px;
        margin: 0 auto;
        text-align: center;
      }

      .box_process {
        padding: 36px 0 38px;
        @media screen and (min-width: 768px){
          padding-right: 4px;
          border-top: 0 none;
          float: left;
          width: 50%;
          -webkit-box-sizing: border-box;
        }
        
        h3{
          padding-bottom: 8px;
          font-size: 20px;
          font-weight: 600;
          line-height: 29px;
          letter-spacing: -1px;
          @media screen and (min-width: 768px){
            padding-bottom: 27px;
            font-size: 20px;
          }
        }
        
        ol{
          padding: 2px 9px 0;
          list-style: none;
          @media screen and (min-width: 768px){
            padding: 0;
          }
          
          li{
            position: relative;
            height: 31px;
            margin-top: 10px;
            padding-top: 14px;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            background-color: #e8e8e8;
            letter-spacing: -0.9px;
            &:first-child {
              margin-top: 0;
            }
            @media screen and (min-width: 768px){
              height: 32px;
              margin-top: 8px;
              padding-top: 16px;
            }
            span {
              position: absolute;
              top: 14px;
              left: 10px;
              @media screen and (min-width: 768px){
                top: 16px;
              }
            }
          }
          
        }
        
      }

      .box_paper {
        padding: 18px 0 13px;
        border-top: 0 none;
        @media screen and (min-width: 768px){
          padding-top: 36px;
          padding-left: 24px;
          border-top: 0 none;
          float: left;
          width: 50%;
          -webkit-box-sizing: border-box;
        }
        h3{
          padding-bottom: 8px;
          font-size: 20px;
          font-weight: 600;
          line-height: 29px;
          letter-spacing: -1px;
          @media screen and (min-width: 768px){
            padding-bottom: 27px;
            font-size: 20px;
          }
        }

        li {
          padding-bottom: 26px;
          @media screen and (min-width: 768px){
            padding-bottom: 63px;
          }
          strong {
            display: block;
            padding-top: 4px;
            font-size: 16px;
            font-weight: 600;
            @media screen and (min-width: 768px){
              padding-top: 2px;
            }
          }
          &:last-child{
            padding-bottom: 26px;
          }
        }
        
        p {
          font-size: 14px;
          line-height: 16px;
          letter-spacing: -1px;
        }
        
      }
      
        
    `,
    Form: styled.form`
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      width: 90%;

      @media screen and (min-width: 768px) {
        width: 100%;
        padding: 0 0 12px 0;
        h3 {
          text-align: center;
          padding-bottom: 26px;
          font-size: 14px;
          font-weight: 600;
          line-height: 29px;
          letter-spacing: -1px;
        }
      }
      @media screen and (max-width: 1200px) {
        width: 100%;
        padding: 40px 0 82px 0;
      }

      h3 {
        text-align: center;
        padding-bottom: 26px;
        font-size: 20px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: -1px;
        padding-top: 40px;
        
      }
    `,
    Group: styled.div`
      display: flex;
      flex-direction: row;
    `,
    TextContainer: styled.div`
      overflow: hidden;
      position: relative;
      padding: 12px 16px;
      border: 1px solid ${colors.lineDefault};
      background-color: #f8f9fb;
      border-radius: 4px;

    `,
    Textarea: styled.textarea`
      display: block;
      width: 100%;
      border: 0 none;
      resize: none;
      outline: none;
      background-color: transparent;
      letter-spacing: -1px;
      height: 146px;
      font-size: 16px;
      line-height: 28px;
      border-radius: 4px;
      padding-left: 0px;
      
    `,
    Button: styled.button`
      display: block;
      width: 100%;
      height: 56px;
      font-size: 18px;
      background: #1672F7;
      color: #fff;
      
      @media screen and (max-width: 768px) {
        //position: fixed;
        bottom: 0;
        right: 0;
        margin: 15px auto;
      }
      @media screen and (min-width: 769px) {
        //position: fixed;
        bottom: 0;
        right: 0;
        margin: 20px auto 0 auto;
      }

      &:disabled {
        background-color: ${colors.lineDefault};
        cursor: not-allowed;
      }
    `,
    IntroContainer: styled.div`
      margin: 0 24px;
      border-top: 0 none;
      padding: 35px 0 38px;
      text-align: center;

      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0;
        padding: 58px 0;

      }

      @media screen and (min-width: 768px) {
        width: 608px;
        margin: 0 auto;
        padding: 58px 0;
      }

      h3 {
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: -1px;
      }

      p {
        padding: 6px 0 16px;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: -1px;
        
        .br_m{
          display: block;
        }
        
        @media screen and (min-width: 768px){
          padding: 0 0 40px;
          .br_m {
            display: inline;
          }
        }

        
        
      }

      ul {
        display: block;

        li {
          margin-bottom: 10px;
          list-style: none;
          @media screen and (min-width: 768px) {
            float: left;
            width: 50%;
            margin-bottom: 4px;
          }
          // 아이콘 변경 필요
          svg {
            margin-top: -4px;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
      }

      a {
        display: block;
        height: 46px;
        border: 1px solid #d7dbe2;
        font-size: 15px;
        font-weight: 500;
        color: #333;
        letter-spacing: -1px;
        line-height: 50px;
        @media screen and (min-width: 768px) {
          margin-left: 10px;
        }
      }
    `,
    ContactContainer: styled.div`
      border-top: 0 none;
      margin: 35px 0 38px;
      
      text-align: center;
      
      @media screen and (min-width: 1200px) {
        width: 720px;
        //margin: 0;
        margin: 62px 0 52px;;
      }

      @media screen and (min-width: 768px) {
          width: 608px;
          margin: 62px auto 52px;
          padding: 62px 0 52px;
      }


      h3 {
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: -1px;
      }

      ul {
        list-style: none;

        li {
          margin-top: 5px;

          @media screen and (min-width: 768px) {
            float: left;
            width: 50%;
            margin-top: 0;
            padding: 0;

          }

          img {
            width: 56px;
            vertical-align: middle;
          }

          span {
            display: inline-block;
            margin-top: 2px;
            margin-left: 8px;
            vertical-align: middle;
            font-size: 16px;
            line-height: 23px;
            color: #1672f7;

            em {
              font-weight: 600;
              font-size: 20px;
              vertical-align: top;
            }


          }

        }
      }

    `,
    ShareContainer: styled.div`
      border-top: 0 none;
      text-align: center;
      padding: 38px 0 96px;
      letter-spacing: -0.7px;
      margin: 0 24px;
      display: block;

      @media screen and (min-width: 1200px) {
        width: 720px;
        padding: 64px 0 60px;
        text-align: left;
        display: inline-block;

      }

      @media screen and (min-width: 768px) {
        padding: 64px 0 60px;
        text-align: left;
        width: 608px;
        margin: 0 auto;
        display: block;

      }

      p {
        display: block;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        letter-spacing: -1px;

        @media screen and (min-width: 768px) {
          display: inline-block;
        }

        span {
          display: block;
          @media screen and (min-width: 768px) {
            display: inline;
          }
        }
      }

      ul {
        display: inline-block;
        width: 56px;
        margin-top: 19px;
        @media screen and (min-width: 768px) {
          float: right;
          width: auto;
          margin-top: 0;
          display: inline-block;
        }

        li {
          float: left;
          margin-left: 0px;
          display: list-item;
          
          a {
            display: block;
            width: 56px;

            @media screen and (min-width: 768px) {
              width: auto;
            }

            img {
              display: block;
              width: 100%;
              border: 0 none;
              @media screen and (min-width: 768px) {
                display: inline-block;
                width: 28px;
                margin-right: 12px;
                vertical-align: middle;
              }
            }

            span {
              .gone {
                display: none;
                @media screen and (min-width: 768px) {
                  display: inline-block;
                  vertical-align: middle;
                }
              }
            }

          }
        }
        
        
      }
      
      
    `
}


const Terms = {
    NewLink: styled.div`
      margin-top: 20px;
      display: flex;
      align-items: flex-end;
      
      @media screen and (min-width: 768px){
        margin: 25px 0 38px;
      }

      a {
        display: inline-block;
        color: ${colors.gray33};
        text-decoration: underline;
        margin-left: 5px;
        line-height: 24px;
        margin-bottom: -2px;
      }
    `,
}

const Category = [
    {key: '이사', value: '이사'},
    {key: '청소/인테리어', value: '청소/인테리어'},
]

const Sido = [
    {key: '전국', value: '전국'},
    {key: '서울', value: '서울'},
    {key: '경기', value: '경기'},
    {key: '인천', value: '인천'},
    {key: '부산', value: '부산'},
    {key: '대구', value: '대구'},
    {key: '광주', value: '광주'},
    {key: '대전', value: '대전'},
    {key: '울산', value: '울산'},
    {key: '강원', value: '강원'},
    {key: '경남/경북', value: '경남/경북'},
    {key: '전남/전북', value: '전남/전북'},
    {key: '충남/충북', value: '충남/충북'},
    {key: '제주', value: '제주'},
    {key: '세종', value: '세종'},
    {key: '기타', value: '기타'},
]

const Funnel = [
    {key: '업체(지인)추천', value: '업체(지인)추천'},
    {key: '주위 권유/소개', value: '주위 권유/소개'},
    {key: '온라인-모바일 배너광고', value: '온라인-모바일 배너광고'},
    {key: '검색광고', value: '검색광고'},
    {key: 'TV광고', value: 'TV광고'},
    {key: '뉴스기사', value: '뉴스기사'},
    {key: '우편물', value: '우편물'},
    {key: '기타(직접입력)', value: '기타(직접입력)'}
]




function PartnerRegisterPage() {

    const autoPlayOptions = {
        delay: 4000
    }

    const [visibleCategoryModal, setVisibleCategoryModal] = useHashToggle('#category')
    const [visibleFunnelModal, setVisibleFunnelModal] = useHashToggle('#funnel')
    const [visibleSidoModal, setVisibleSidoModal] = useHashToggle('#sido')
    const [visibleTerms, setVisibleTerms] = useHashToggle('#terms')
    const toggleCategory = () => setVisibleCategoryModal(!visibleCategoryModal)
    const toggleFunnel = () => setVisibleFunnelModal(!visibleFunnelModal)
    const toggleSido = () => setVisibleSidoModal(!visibleSidoModal)

    /***** 나중에 스토어 관련 작업으로 대체 필요 *****/
    const [category, setCategory] = useState('');
    const [funnel, setFunnel] = useState('');
    const [sido, setSido] = useState('');
    const selectCategory = (data: string) => {
        setCategory(data)
    }
    const selectFunnel = (data: string) => {
        setFunnel(data)
    }
    const selectSido = (data: string) => {
        setSido(data)
    }

    return (
        <Layout title='파트너 등록문의' subTitle={<>좋은 서비스를 제공할 수 있는<br/>이사/청소업체 사장님을 모십니다</>}>
            <S.Container>
                <S.Title>
                        <strong>파트너 등록문의</strong>
                        <span>좋은 서비스를 제공할 수 있는 <span className="br_m">이사/청소업체 사장님을 모십니다</span></span>
                </S.Title>
                <S.VideoContainer>
                    <iframe width="100%" height="100%"
                            src="https://www.youtube.com/embed/ZobFP-2xf2U?version=3&amp;enablejsapi=1&amp;rel=0&amp;autoplay=0"
                            frameBorder="0"/>
                </S.VideoContainer>
                <S.ReasonContainer>
                    <h3>왜, 위매치다이사 인가요?</h3>
                    <ul>
                        <li>
                            <p className="display_t">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/network/service/com_service_icon_01.png"
                                    alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,Sales"/>
                                <em>Sales</em>
                            </p>
                            <strong>더욱 커진 영업기회</strong>
                            <p>업계 최고수준의 이용자 수<br/>이사 월 오더 3만건 이상 <span className="br_t">(2018년 5월 기준)</span></p>
                        </li>
                        <li>
                            <p className="display_t">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/network/service/com_service_icon_02.png"
                                    alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,Marketing"/>
                                <em>Marketing</em>
                            </p>
                            <strong>안정적인 고객유치</strong>
                            <p>업계 최고 수준의 이용자 수<br/><span className="br_t">온/오프라인에서 공격적인</span> 고객마케팅 지원</p>
                        </li>
                        <li>
                            <p className="display_t">
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/network/service/com_service_icon_03.png"
                                    alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,Benefit"/>
                                <em>Benefit</em>
                            </p>
                            <strong>신규가입 우대 혜택</strong>
                            <p><span>고객 조회화면</span> 상단 노출<br/>(최소 2개월)</p>
                        </li>
                    </ul>

                </S.ReasonContainer>
                <S.BenefitContainer>
                    <h3>소비자평가등급제 특장점</h3>
                    <ul>
                        <li>
                                <img src="https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/img/img_m_partner01.png"
                                    alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,평가등급제특장점"/>
                                <strong>홍보 없는 영업</strong>
                                <p>좋은 서비스 = 높은 평가등급<br/>별도의 홍보활동이 필요없습니다</p>
                        </li>
                        <li>
                                <img src="https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/img/img_m_partner02.png"
                                    alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,평가등급제특장점"
                                />
                                <strong>제값 받는 환경</strong>
                                <p>높은 평가등급이 곧 보증이 되어<br/>합당한 가격을 제시할 수 있습니다</p>
                        </li>
                        <li>
                                <img src="https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/img/img_m_partner03.png"
                                    alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,평가등급제특장점"/>
                                <strong>높아지는 우리 업체 명성</strong>
                                <p>ㅇㅇ이사(청소), ∆ ∆ 지점이 아닌<br/>우리업체 이름을 알릴 수 있습니다</p>
                        </li>
                    </ul>
                </S.BenefitContainer>

                {/*스와이프*/}
                <CustomSwiper
                    id="dsl_move_banner_1"
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={autoPlayOptions}
                >
                    <SwiperSlide>
                        <Slide image="https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/img/img_slide01_201222.png"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Slide image="https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/img/img_slide02_201222.png"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Slide image="https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/img/img_slide03_201222.png"/>
                    </SwiperSlide>
                </CustomSwiper>


                {/*스와이프*/}

                <S.GuideContainer>
                        <div className="box_process">
                            <h3>등록절차</h3>
                            <ol>
                                <li><span>01</span>등록상담</li>
                                <li><span>02</span>서류제출</li>
                                <li><span>03</span>승인검토</li>
                                <li><span>04</span>정보설정 및 확인안내</li>
                                <li><span>05</span>영업승인</li>
                            </ol>
                        </div>
                        <div className="box_paper">
                            <h3>필요서류</h3>
                            <ul>
                                <li>
                                    <strong>이사업체</strong>
                                    <p>사업자등록증, 견적서 양식, 명함</p>
                                    <a href="pdf/da24_application_form_20190102a.pdf" download=""
                                       className="btn_down display_pc" title="신규등록서">신규업체 등록신청서<span
                                        className="ico_comm ico_down"></span></a>
                                </li>
                                <li>
                                    <strong>청소업체</strong>
                                    <p>사업자등록증, 명함</p>
                                    <a href="pdf/clean_application_form_20190102a.pdf" download=""
                                       className="btn_down display_pc" title="신규등록서">신규업체 등록신청서<span
                                        className="ico_comm ico_down"></span></a>
                                </li>
                            </ul>
                        </div>
                </S.GuideContainer>
                <S.Form>
                    <h3>등록문의</h3>
                    <Input theme="default" border readOnly icon="down"
                           placeholder="공통" rootStyle={{}}
                           style={{fontSize: "18px", color: colors.black}}
                           onClick={toggleCategory}
                           value={category}
                    />
                    <Input theme="default" border placeholder="업체명을 입력해주세요" rootStyle={{}} maxLength={20}
                           style={{fontSize: "18px", color: colors.black}}
                           onBlur={(e) => {
                           }}
                    />
                    <Input theme="default"
                           border readOnly icon="down"
                           placeholder="영업지역 선택" rootStyle={{}}
                           style={{fontSize: "18px", color: colors.black}}
                           onClick={toggleSido}
                           value={sido}
                    />
                    <Input theme="default"
                           border readOnly icon="down"
                           placeholder="위매치다이사를 어떻게 알게 되셨나요?" rootStyle={{}}
                           style={{fontSize: "18px", color: colors.black}}
                           onClick={toggleFunnel}
                           value={funnel}
                    />

                    {/**** 나중에 스토어 작업으로 get해서 직접입력 input보이기 설정 *****/}
                    {/*<Input theme="default" border placeholder="직접 입력해주세요" rootStyle={{}} maxLength={20}*/}
                    {/*       style={{fontSize: "18px", color: colors.black}}*/}
                    {/*       onBlur={(e) => {*/}
                    {/*       }}/>*/}
                    <Input theme="default" type="tel" pattern="[0-9]*" inputMode="numeric"
                           placeholder="휴대전화번호 입력 ('-'없이)" border rootStyle={{}} maxLength={13}
                           style={{fontSize: "18px", color: colors.black}}
                           onBlur={(e) => {
                           }}
                    />

                    <S.TextContainer>
                        <S.Textarea placeholder="문의내용"
                                    style={{fontSize: "18px"}}
                                    onChange={(e) => {
                                    }}/>
                    </S.TextContainer>
                    <Terms.NewLink>
                        <Checkbox label="이용약관 및 개인정보처리방침 동의"/>
                        <a onClick={() => setVisibleTerms(true)}>보기</a>
                    </Terms.NewLink>
                    <S.Button theme={"primary"}>확인</S.Button>
                </S.Form>
                <Select visible={visibleCategoryModal} items={Category} onOverlayClose={toggleCategory}
                        onClose={toggleCategory} onSelect={selectCategory}/>
                <Select visible={visibleSidoModal} items={Sido} onOverlayClose={toggleSido} onClose={toggleSido}
                        onSelect={selectSido}/>
                <Select visible={visibleFunnelModal} items={Funnel} onOverlayClose={toggleFunnel} onClose={toggleFunnel}
                        onSelect={selectFunnel}/>
                <S.IntroContainer>
                    <h3>위매치다이사 소개서</h3>
                    <p>위매치다이사 이사/청소 서비스에 대해 <span className="br_m">더 알고싶다면 소개서를 다운로드하세요!</span></p>
                    <ul>
                        <li>
                            <a href="https://da24.wematch.com/pdf/da24_introduction.pdf" target="_blank"
                               title="위매치다이사 이사 소개서">
                                위매치다이사 이사 소개서<SvgSearch/>
                            </a>
                        </li>
                        <li>
                            <a href="https://da24.wematch.com/pdf/clean_introduction.pdf" target="_blank"
                               title="위매치다이사 청소 소개서">
                                위매치다이사 청소 소개서<SvgSearch/>
                            </a>
                        </li>
                    </ul>
                </S.IntroContainer>
                <S.ContactContainer>
                    <h3>파트너센터 직통번호</h3>
                    <ul>
                        <li>
                            <img
                                src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/service_move.png"
                                alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,이사상담"/>
                            <span>이사업체 상담 <em><a href="tel:1522-1340">1522-1340</a></em></span>
                        </li>
                        <li>
                            <img
                                src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/service_clean.png"
                                alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,청소상담"/>
                            <span>청소업체 상담 <em><a href="tel:1522-1962">1522-1962</a></em></span>
                        </li>
                    </ul>
                </S.ContactContainer>
                <S.ShareContainer>
                    <div>
                        <p>위매치다이사를 <span>다른 사장님들께도 </span>알려주세요!</p>
                        <ul>
                            <li>
                                {/*링크복사 나중에 새로운 주소로 넣어주어야함! => 리액트 방식으로 변경 필요 */}
                                <a href="javascript:void(0);" data-clipboard-text="https://wematch.com/partnernew.asp">

                                    <img
                                        src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/sns_link.png"
                                        alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,링크복사"/><span>링크복사<span className='gone'>하기</span></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </S.ShareContainer>
                <TermsModal visible={visibleTerms} onClose={() => setVisibleTerms(!visibleTerms)}/>
            </S.Container>

        </Layout>

    )

}

export default PartnerRegisterPage