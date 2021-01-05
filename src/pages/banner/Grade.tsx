import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMedia } from 'react-use-media'
import styled from 'styled-components/macro'

import BannerLayout from './layout/BannerLayout'

import * as colors from 'styles/colors'
import { dataLayer } from 'lib/dataLayerUtil'

const S = {
  Container: styled.div`
      font-style: normal;
      font-weight: normal;
      margin: 86px 0 0;
      padding-bottom: 60px;
      word-break: keep-all;
      
      section {
        margin: 0 24px;
        color: ${colors.gray33};
        
        h2 {
          font-weight: 500;
          font-size: 22px;
          letter-spacing: -1px;
          margin-bottom: 10px;
          
          strong {
            font-weight: bold;
          }
        }
        
        p {
          font-size: 15px;
          margin-bottom: 30px;
        }
      }
      
      .line {
        height: 8px;
        box-shadow: 0px -1px 0px ${colors.lineDeco};
        background: linear-gradient(0deg, rgba(235, 238, 242, 0.4), rgba(235, 238, 242, 0.4)), ${colors.white};
        margin: 50px 0;
      }
      
      img {
        width: 100%
      }
      
      @media screen and (min-width: 768px) {
         width: 720px;
         margin: 152px auto 0;
         padding-bottom: 60px;
         
         .mobile-enter {
            display: none;
         }
         
         .line {
            display: none; 
         }
         
         section {
            h2 {
              font-size: 28px;
              line-height: 41px;
              letter-spacing: -0.03em;
              border-bottom: 30px;
            }
         }
      }
    `,
  GraphBox: styled.div`
      margin-top: 30px;
      strong {
        display: block;
        font-size: 18px;
        margin-bottom: 10px;
      } 
      
      p {
        font-size: 15px;
        color: ${colors.gray66};
      }
      
      @media screen and (min-width: 768px) {
        .bottom {
          margin-bottom: 10px;
        }
      }
    `,
  CircleBox: styled.div`
      color: ${colors.gray33};
      letter-spacing: -1px;
      
      h3 {
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 10px;
      }
      p {
        font-size: 15px;
        line-height: 22px;
        margin-bottom: 30px;
      }
      @media screen and (min-width: 768px) {
        h3 {
          font-size: 20px;
          line-height: 30px;
        }
        p {
          font-size: 16px;
          line-height: 22px;
        }
      }
    `,
  Rating: styled.div`
      margin: 50px 0;
      letter-spacing: -1px;

      h3 {
        font-size: 18px;
        margin-bottom: 10px;
      }
      p {
        font-size: 15px;
        color: ${colors.gray33};
        margin-bottom: 14px;
      }
      .lists {
        .list {
          font-size: 14px;
          line-height: 19px;
          color: ${colors.gray88};
          position: relative;
          padding-left: 8px;
          &:before {
            content: '-';
            position: absolute;
            top: 0;
            left: 0;
         }
        }
      }
      @media screen and (min-width: 768px) {
        margin: 60px 0;
        @media screen and (min-width: 768px) {
          h3 {
            font-size: 20px;
            line-height: 30px;
          }
          p {
            font-size: 16px;
            line-height: 22px;
          }
        }
      }
    `,
  Utility: styled.div`
      letter-spacing: -1px;
      color: ${colors.gray33};

      h2 {
        font-size: 18px;
        margin-bottom: 20px;
      }
      ul {
        font-size: 16px;
      }
      li {
        font-size: 15px;
        p {
          margin-top: 14px;
          margin-bottom: 29px;
        }
      }
      em {
        color: ${colors.pointBlue};
      }
   `,
}

const Group = styled.div`
  @media screen and (min-width:768px) {
    display: flex;
    justify-content: center;
    height: 416px;
    
    ${S.GraphBox} {
      width: 50%;

      &:first-of-type {
        margin-right: 30px;
      }
    }
  }
`

const LevelCard = styled.li` 
  float: left;
  width: calc(50% - 4px);
  box-sizing: border-box;
  
  @media screen and (min-width: 768px) {
    flex-basis: calc(33.3% - 12px);
    display: flex;
    flex-direction: column;
    
    .box {
      flex: auto;   
    }
  }

  .box {
    height: 184px;
    border: 1px solid ${colors.lineDeco};
    letter-spacing: -1px;
    padding: 16px 16px 0;
    margin-top: 8px;
    
    font-size: 14px;
    line-height: 19px;
    color: ${colors.gray66};
    
    img {
      width: 56px;
      height: 56px;
    }
  
    strong {
      display: block;
      font-size: 14px;
      line-height: 22px;
      margin-top: 16px;
      margin-bottom: 8px;
      color: ${colors.gray33}
    }
  }
`;

const LevelCards = styled.ul`
  overflow: hidden;
  text-align: center;
  margin-top: 25px;
  
  ${LevelCard} {
    &:nth-child(odd) {
      margin-right: 4px;
    }
    &:nth-child(even) {
      margin-left: 4px;
    }
  }
  
  @media screen and (min-width:768px) {
    display: flex;
    flex-wrap: wrap;
    
    ${LevelCard} {
      &:nth-child(odd) {
        margin-right: auto;
      }
      &:nth-child(even) {
        margin-left: auto;
      }
      margin: 0 6px;
    }
  }
`;

export default function Grade() {
  const history = useHistory()
  const isTablet = useMedia({
    minWidth: 768,
  })

  const levels = [
    { id: 1, level: 'S', title: 'S등급 (최고)', text: '감동적인 서비스를\n 기대할 수 있음' },
    { id: 2, level: 'A', title: 'A등급 (매우좋음)', text: '기분 좋은 서비스를\n 기대할 수 있음' },
    { id: 3, level: 'B', title: 'B등급 (양호)', text: '감동적인 서비\n스를 기대할 수 있음' },
    { id: 4, level: 'C', title: 'C등급 (미흡)', text: '부정평가 일부 있으며\n 좋은 서비스 기대하기\n 어려움' },
    { id: 5, level: 'D', title: 'D등급 (평판나쁨)', text: '부정평가 다수이며\n 이용시 불만족이 우려\n 됨' },
    { id: 6, level: 'NEW', title: 'N등급 (등급산정중)', text: '좋은 등급을 획득하기\n 위한 의욕적인 서비스\n를 기대할 수 있음' },
  ]

  return (
    <BannerLayout title="소비자평가등급이란" onBack={() => history.goBack()} tags={{
      back: 'dsl_movesub_grade_back_1',
      home: 'dsl_movesub_grade_home_1'
    }}>
      <S.Container>
        <section>
          <h2><strong>평가 등급</strong>과 <strong>만족도</strong></h2>
          <p>빅데이터로 분석한 이사업체 평가등급과 소비자 선택간 연관관계를 알려드립니다.</p>
          <Group>
            <S.GraphBox>
              <strong>등급이 높은 업체일수록 만족 확률이 높아요</strong>
              <p>NEW등급도 의욕적인 서비스를 하고 있어 만족도가 높아요.</p>
              <img src={require('assets/images/banner/graph_01.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" />
            </S.GraphBox>
            <S.GraphBox>
              <strong>등급이 높을수록, 소비자의 선택률이 높아요</strong>
              <p className="bottom">많은 소비자가 실제 이용자평가 기반인 등급을 신뢰하고, 업체 선택의 기준으로 삼고 있기 때문이에요.</p>
              <img src={require('assets/images/banner/graph_02.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" />
            </S.GraphBox>
          </Group>
        </section>
        <div className="line" />
        <section>
          <h2>
            소비자의 기준으로 만든 <br className="mobile-enter" />
            <strong>잘하는 업체 찾기 공식</strong>
          </h2>

          <S.CircleBox>
            <h3>소비자 평가 기준</h3>
            <p>
              수십만 위매치다이사 이용자들의 목소리에서 찾은 잘하는 업체의기준을 정리했습니다. <br />
                            이 기준에 대한 솔직한평가 데이터를 1:1로 직접 수집합니다.
                        </p>
            {isTablet ? (
              <div style={{ textAlign: "center" }}>
                <img src={require('assets/images/banner/circle_pc.png')}
                  style={{ width: '85%' }}
                  alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" />
              </div>
            ) : (
                <img src={require('assets/images/banner/circle.png')}
                  alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" />
              )}
          </S.CircleBox>
          <S.Rating>
            <h3>소비자평가등급제</h3>
            <p>빅 데이터로 산출된 소비자평가등급은 고객이 이사/청소업체를 잘 고르는 공식입니다.</p>
            <ul className="lists">
              <li className="list">업체별 최근 12개월간의 이용자 평가로 등급 산출</li>
              <li className="list">매월 1일 갱신</li>
            </ul>
            <LevelCards>
              {levels.map((level) => (
                <LevelCard key={level.id}>
                  <div className="box">
                    <img src={require(`assets/images/level_${level.level}.svg`)} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" />
                    <strong>{level.title}</strong>
                    {level.text.split('\n').map((line, i) => (
                      <span key={i}>{line} <br /></span>
                    ))}
                  </div>
                </LevelCard>
              ))}
            </LevelCards>
          </S.Rating>
          <S.Utility>
            <h2>소비자평가등급 200% 활용하기</h2>
            <ul>
              <li>
                <strong><em>01</em> 신경 안 쓰고 편한 게 최고라면?</strong>
                <p>전문성이 높을수록 짐을 더욱 안전하게 옮기고 편하게 이사할 수 있습니다. 신속하고 깔끔한 일 처리가 무엇보다 중요하다면 전문성 등급을 체크하세요.</p>
              </li>
              <li>
                <strong><em>02</em> 내 집에 낯선 사람, 왠지 부담스럽다면?</strong>
                <p>
                  포장이사가 처음이거나 낯선 사람들이 오는 것이 부담스러우세요? 조금 더 편안한 분위기에서 이사하고 싶다면 친절도 등급을 체크하세요.
                              </p>
              </li>
              <li>
                <strong><em>03</em> 무엇보다 가성비가 최우선이라면?</strong>
                <p>가성비를 따지시나요? 무조건 싸기만 한 업체보다, 한정된 예산 안에서 최선의 서비스를 받고 싶다면 가격만족도 등급을 체크하세요.</p>
              </li>
            </ul>
          </S.Utility>
        </section>
      </S.Container>
    </BannerLayout>
  )
}
