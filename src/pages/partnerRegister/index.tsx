import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import useHashToggle from 'hooks/useHashToggle'

import Layout from 'components/base/Layout'
import Input from 'components/common/Input'
import Select from 'components/common/Select'

import * as colors from 'styles/colors'
import SvgSearch from "../../components/wematch-ui/Icon/generated/Search";


const S = {
    Container: styled.div`
        display: block;
    `,
    Title: styled.h3`
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      color: ${colors.gray66};
      margin-bottom: 16px;
    `,
    VideoContainer: styled.div`
      display: block;
      width: 100%;
      max-width: 360px;
      height: 180px;
      margin: 26px auto 0;
      background-color: #000;
      @media screen and (min-width: 768px){
        max-width: none;
        height: 375px;
        margin-top: 3px;
      }
      @media screen and (min-width: 1200px){
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

      @media screen and (min-width: 768px) and (max-width: 1119px){
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
      
      ul{
        list-style: none;
        
        @media screen and (min-width: 768px){
          overflow: hidden;
        }
        
        li {
          letter-spacing: -0.75px;
          padding-top: 20px;
          
          @media screen and (min-width: 768px){
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
          
          .display_t{
            display: none !important;
            @media screen and (min-width: 768px){
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
              @media screen and (min-width: 768px){
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
        margin: 0;
        padding: 58px 0;
      }

      @media screen and (min-width: 768px) and (max-width: 1119px){
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

      ul{
        list-style: none;

        @media screen and (min-width: 768px){
          overflow: hidden;
        }

        li {
          letter-spacing: -0.75px;
          padding-top: 20px;

          @media screen and (min-width: 768px){
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

          .display_t{
            display: none !important;
            @media screen and (min-width: 768px){
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
              @media screen and (min-width: 768px){
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

    `,
    Form: styled.form`
      display: flex;
      flex-direction: column;
      padding-bottom: 66px;
      margin: 0 auto;
      width: 100%;
      
      @media screen and (max-width: 768px) {
        width: 90%;
        padding: 0 0 82px 0;
        h3 {
          text-align: center;
          padding-bottom: 26px;
          font-size: 14px;
          font-weight: 600;
          line-height: 29px;
          letter-spacing: -1px;
        }
      }
      @media screen and (max-width: 1200px) and (min-width: 769px) {
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
        border-radius: 4px  ;
      
    `,
    Textarea: styled.textarea`
        display: block;
        width: 100%;
        border: 0 none;
        resize: none;
        outline: none;
        background-color: transparent;
        letter-spacing: -1px;
        height: 110px;
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
        margin: 0 auto 58px auto ;
        width: 90%;
      }
      @media screen and (max-width: 1200px) {
        //position: fixed;
        bottom: 0;
        right: 0
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
      }
      
      ul {
        display: block;
        li {
          margin-bottom: 10px;
          list-style: none;
          @media screen and (min-width: 768px){
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
        @media screen and (min-width: 768px){
          margin-left: 10px;
        }
      }
    `,
    ContactContainer: styled.div`
      border-top: 0 none;
      padding: 35px 0 38px;
      text-align: center;
      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0;
        padding: 58px 0;
      }

      @media screen and (min-width: 768px) {
        .box_g {
          width: 608px;
          margin: 0 auto;
          padding: 58px 0;
        }
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
        li{
          margin-top: 5px;
          
          @media screen and (min-width: 768px){
            float: left;
            width: 50%;
            margin-top: 0;
            padding: 0;
            
          }
          img{
            width: 56px;
            vertical-align: middle;
          }
          span{
            display: inline-block;
            margin-top: 2px;
            margin-left: 8px;
            vertical-align: middle;
            font-size: 16px;
            line-height: 23px;
            color: #1672f7;
            em{
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
   
      @media screen and (min-width: 1200px) {
        width: 720px;
        padding: 64px 0 60px;
        text-align: left;
        
      }

      @media screen and (min-width: 768px) {
        padding: 64px 0 60px;
        text-align: left;
        width: 608px;
        margin: 0 auto;
        display: block;
        
      }
      
      p{
        display: inline-block;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        letter-spacing: -1px;
        
        @media screen and (min-width: 768px){
          display: inline-block;
        }
        span{
          display: block;
          @media screen and (min-width: 768px){
            display: inline;
          }
        }
      }

      ul {
        display: inline-block;
        width: 56px;
        margin-top: 19px;
        overflow: hidden;
        @media screen and (min-width: 768px) {
          float: right;
          width: auto;
          margin-top: 0;
        }
        li{
          float: left;
          margin-left: 20px;
          display: block;
          
          a{
            display: block;
            width: 56px;
            
            @media screen and (min-width: 768px){
              width: auto;
            }
            
            img{
              display: block;
              width: 100%;
              @media screen and (min-width: 768px){
                display: inline-block;
                width: 28px;
                margin-right: 12px;
                vertical-align: middle;
              }
            }
            
            span{
              @media screen and (min-width: 768px){
                display: inline-block;
                vertical-align: middle;
              }
            }
            
          }
        }
      }
      


    
    `
}

const Category = [
    { key: '이사', value: '이사' },
    { key: '청소', value: '청소' },
    { key: '이사+청소', value: '이사+청소' },
]

const Type = [
    { key: '개인적인 궁금한 것', value: '개인적인 궁금한 것' },
    { key: '기타', value: '기타' }
]

function PartnerRegisterPage() {

    const [visibleCategoryModal, setVisibleCategoryModal] = useHashToggle('#category')
    const [visibleTypeModal, setVisibleTypeModal] = useHashToggle('#type')
    const toggleCategory = () => setVisibleCategoryModal(!visibleCategoryModal)
    const toggleType = () => setVisibleTypeModal(!visibleTypeModal)

    /* 나중에 스토어 관련 작업으로 대체 권장 */
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const selectCategory = (data: string) => {
        setCategory(data)
    }
    const selectType = (data: string) => {
        setType(data)
    }


    return(
        <Layout title='파트너 등록문의' subTitle={<>좋은 서비스를 제공할 수 있는<br/>이사/청소업체 사장님을 모십니다</>}>
            <S.Container>
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
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/network/service/com_service_icon_01.png"
                                    alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,Sales"/>
                                    <em>Sales</em>
                            </p>
                            <strong>더욱 커진 영업기회</strong>
                            <p>업계 최고수준의 이용자 수<br/>이사 월 오더 3만건 이상 <span className="br_t">(2018년 5월 기준)</span></p>
                        </li>
                        <li>
                            <p className="display_t">
                                <img
                                    src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/network/service/com_service_icon_02.png"
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
                </S.BenefitContainer>
                <S.Form>
                    <h3>등록문의</h3>
                    <Input theme="default" border placeholder="이름" rootStyle={{}} maxLength={20}
                           style={{fontSize: "18px", color: colors.black}}
                           onBlur={(e) => {
                           }}
                    />
                    <Input theme="default" type="tel" pattern="[0-9]*" inputMode="numeric"
                           placeholder="휴대전화번호 입력 ('-'없이)" border rootStyle={{}} maxLength={13}
                           style={{fontSize: "18px", color: colors.black}}
                           onBlur={(e) => {
                           }}
                    />
                    <Input theme="default" border readOnly icon="down"
                           placeholder="공통" rootStyle={{}}
                           style={{fontSize: "18px", color: colors.black}}
                           onClick={toggleCategory}
                           value={category}
                    />
                    <Input theme="default"
                           border readOnly icon="down"
                           placeholder="문의형태" rootStyle={{}}
                           style={{fontSize: "18px", color: colors.black}}
                           onClick={toggleType}
                           value={type}
                    />
                    <S.TextContainer>
                        <S.Textarea placeholder="문의내용"
                                    style={{fontSize: "18px"}}
                                    onChange={(e) => {
                                    }}/>
                    </S.TextContainer>
                </S.Form>
                <Select visible={visibleCategoryModal} items={Category} onOverlayClose={toggleCategory}
                        onClose={toggleCategory} onSelect={selectCategory}/>
                <Select visible={visibleTypeModal} items={Type} onOverlayClose={toggleType} onClose={toggleType}
                        onSelect={selectType}/>
                <S.Button theme={"primary"}>확인</S.Button>
                <S.IntroContainer>
                    <h3>위매치다이사 소개서</h3>
                    <p>위매치다이사 이사/청소 서비스에 대해<br/>더 알고싶다면 소개서를 다운로드하세요!</p>
                    <ul>
                        <li>
                            <a href="https://da24.wematch.com/pdf/da24_introduction.pdf" target="_blank" title="위매치다이사 이사 소개서">
                                위매치다이사 이사 소개서<SvgSearch/>
                            </a>
                        </li>
                        <li>
                            <a href="https://da24.wematch.com/pdf/clean_introduction.pdf" target="_blank" title="위매치다이사 청소 소개서">
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
                                <a href="javascript:void(0);" data-clipboard-text="https://wematch.com/partnernew.asp" >

                                    <img
                                        src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/sns_link.png"
                                        alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,링크복사"/><span>링크복사<span>하기</span></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </S.ShareContainer>
            </S.Container>

        </Layout>

    )

}

export default PartnerRegisterPage