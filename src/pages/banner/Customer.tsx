import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import BannerLayout from './layout/BannerLayout'

import * as colors from 'styles/colors'
import { dataLayer } from 'lib/dataLayerUtil'

const S = {
  Container: styled.div`
      font-style: normal;
      font-weight: normal;
      margin: 86px 24px 0;
      padding-bottom: 60px;  
                          
      .title {
        font-size: 22px;
        line-height: 33px;
        letter-spacing: -0.03em;
        color: ${colors.gray33};
        
        strong {
          font-weight: bold;
        }
      }
      
      .bold {
        font-weight: bold;
        font-size: 15px;
      }
      
      .box {
        img {
          width: 56px;
          height: 56px;
          margin-top: 50px;
          margin-bottom: 10px;
          
          &:first-of-type {
            margin-top: 32px;
          }
        }
        h2 {
          font-size: 18px;
          font-weight: bold;
          color: ${colors.pointBlue};  
          margin-bottom: 20px;
        }
        h3 {
          font-weight: bold;
          font-size: 15px;
          letter-spacing: -0.03em;
          color: ${colors.gray33};
          margin-bottom: 10px;
        }
        p {
          font-size: 15px;
          letter-spacing: -0.03em;
          color: ${colors.gray66};
          margin-top: 10px;
          margin-bottom: 30px;
          word-break: keep-all;
          
          strong {
            font-weight: bold;
          }
        }
        
        .last {
          padding-bottom: 125px;
        }
      }
      
      .mobile-enter {
        display: block;
      }
      
      @media screen and (min-width: 768px) {
         width: 720px;
         margin: 100px auto 0;
         
         .mobile-enter {
           display: none;
         }
      }
    `
}

export default function Customer() {
  const history = useHistory()

  const reviews = [
    {
      id: 1,
      title: '업체의 정확한 평가정보를 볼 수 있었대요!',
      data: [
        { title: '경기도 김포시 (2020.5.27 이사)', review: '커뮤니티를 통해 우연히 추천 받아서 긴가민가 이용해봤는데, 불필요한 연락같은 것도 오지 않아서 좋았구요. 비교업체를 고를 때도 이용자의 후기를 꼼꼼히 볼 수 있어서 도움이 됐습니다. 견적 받은 업체도 다 너무 좋아서 고민될 정도였어요.' },
        { title: '인천광역시 남동구 (2020.8.14 이사)', review: '이사업체 홍보글을 보고 고르는 것보다 내 상황에 맞는 곳으로 리뷰확인하며 가려낼수 있다.' },
        { title: '서울특별시 강서구 (2020.8.21 이사)', review: '이사업체 및 청소를 알아보고 있었는데, 처음 이사라 인터넷은 광고도 많고 맘카페는 지인들 추천해줘서 믿을 수가 없었는데, 여기는 직접 예약한 사람의 후기를 생생하게 들을수 있어서 선택하는데 진짜 많은 도움이 됐습니다.' },
        { title: '부산광역시 해운대구 (2020.7.17 이사)', review: '이삿짐은 인근 부동산에 물어보는 경우가 많은데 대부분 한 군데이고 피드백을 알 수 없다. 하지만 여긴 우수업체 위주로 3군데를 추천을 해주고 견적확인과 피드백까지 가능하니 좋다.' },
      ]
    },
    {
      id: 2,
      title: '알아서 찾아줘서 너무 편했대요!',
      data: [
        { title: '부산광역시 부산진구 (2020.4.20 이사)', review: '이것저것 알아보면 어디에 전화를 한지 헷갈릴 수있는데 그런게 없었다는 점, 3개 업체를 비교해줘서, 그 중 한 곳을 쉽게 머리 안아프게 그냥 바로 계약했다는 점이 좋았음.' },
        { title: '전주시 완산구 (2020.8.5 이사)', review: '조건에 맞는 업체 매칭해 주는데, 어디가서 일일이 알아보는 것보다 한눈에 보기쉬웠어요. 이사준비로 정신없는데 위매치다이사에서 많은 도움을 받았습니다.' },
        { title: '서울특별시 동작구 (2020.5.11 이사)', review: '일일이 업체를 찾지 않아도 간단한 입력만으로 매칭된 업체들이 알아서 연락와서 견적도 여러곳에서 받을수 있어 편하고 상당히 만족스런 업체를 공정한 가격에 만날수 있었다.' },
      ]
    },
    {
      id: 3,
      title: '이사업체 서비스가 만족스러웠대요!',
      data: [
        { title: '수원시 영통구 (2020.5.3 이사)', review: '요즘 대기업이사들은 비싸기만하고 만족하기 힘든데 위매치에서 추천해주신 업체는 중소기업에 서비스정신까지 투철하신 분들로 언제나 만족하고있습니다!' },
        { title: '경기도 남양주시 (2020.9.15 이사)', review: '동네에 평 좋은 곳을 알아서 매칭시켜주니 정말 편하고 업체도 경쟁으로 더 열심히 잘해주시는거 같아 완전 추천이요!!' },
        { title: '서울특별시 강서구 (2020.8.21 이사)', review: '평가 댓글을 보면 실제 이용자가 쓴 것 같아 신뢰가 가고, 그런 평가를 의식하여 열심히 하는 업체가 있어서 저도 이번에 선택하는데 도움이 되었습니다. 추천을 안할 이유가 없습니다. <strong>전 2번째 이사인데 모두 이 어플로 했어요.</strong>' },
      ]
    },
    {
      id: 4,
      title: '이사청소까지 한번에 해결해서 좋았대요!',
      data: [
        { title: '광주광역시 광산구 (2020.7.4 이사)', review: '한 곳에서 이사견적을 여려 군데 받을수 있으며 이사청소랑 에어컨 등 이사 시 필요한 여러가지것을 한곳에서 해결할수 있고 믿을 수 있어서 매우 만족합니다.' },
        { title: '고양시 덕양구 (2020.3.23 이사)', review: '간편하게 찾아보고 리뷰 볼 수 있는 부분이 편리합니다. 관련 카테고리(이사~청소)들이 모여있어 자연스러운 맥락으로 찾게 되고요' },
      ]
    }
  ]


  return (
    <BannerLayout title="위매치 고객의 소리" onBack={() => history.goBack()} tags={{
      back: 'dsl_movesub_customer_back_1',
      home: 'dsl_movesub_customer_home_1'
    }}>
      <S.Container>
        <p className="title">
          <strong>'긴가민가 위매치'</strong>가 <br className="mobile-enter" />
          <strong>'두번한다 위매치'</strong>로
                </p>
        <p style={{ marginTop: 20, marginBottom: 32 }}>
          왜 대한민국 10명 중 1명은 <br className="mobile-enter" />
                    이사할 때 위매치를 찾아주셨을까요? <br />
        </p>
        {reviews.map((review) => (
          <div className="box" key={review.id}>
            <img src={require('assets/images/banner/smile.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" />
            <h2 className="point bold">{review.title}</h2>
            {review.data.map((d, i) => (
              <div key={i}>
                <h3 className="bold" key={i}>{d.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: d.review }} />
              </div>
            ))}
          </div>
        ))}

      </S.Container>
    </BannerLayout>
  )
}
