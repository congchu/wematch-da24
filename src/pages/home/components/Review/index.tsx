import React, { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components/macro'

import ReviewCard from './ReviewCard'

import { gray33, gray66, pointBlue } from 'styles/colors'
import { useRouter } from 'hooks/useRouter'

const S = {
  Container: styled.section`
    font-style: normal;
    font-weight: normal;
    letter-spacing: -0.03em;
  `,
  Group: styled.div`
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  `,
  Title: styled.h3`
    font-weight: bold;
    font-size: 22px;
    line-height: 32px; 
    color: ${gray33};
    margin-bottom: 8px;
    padding: 0 24px;
  `,
  Text: styled.p`
    font-size: 16px;
    line-height: 23px;
    color: ${gray66};
  `,
  More: styled.a`
    font-size: 16px;
    line-height: 23px;
    color: ${gray66};
  `,
}

const CustomSwiper = styled(Swiper)`
  .swiper-wrapper{
    padding-bottom: 20px;
  }

  .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom: 0px !important;
  }
  
  .swiper-pagination-bullet {
    color: #C4C9D1;
  }
  
  .swiper-pagination-bullet-active {
    width: 14px;
    border-radius: 40px;
    background: ${pointBlue};
  }
`

function Review() {
    const router = useRouter()
    const reviews = [
        {
            partnerName: '한신익스프레스', grade: '최고', price: '최고에요', kind: '최고에요', professional: '최고에요',
            content: '골목이라는 열악한 조건의 이사였음에도 불구하고 끝까지 처리해 주셨어요~ 2년뒤에 또 이사 예정에 있는데 또 와달라고 할 정도 였습니다!!',
            customer: 591423, created_at: '1달 내 이사', partnerArea:'서울시 강서구 A등급 업체'
        },
        {
            partnerName: '아프리카익스프레스', grade: '최고', price: '최고에요', kind: '좋아요', professional: '최고에요',
            content: '이분들께는 안되는건 없으신거같아요!!\n' + '정말 최고의 이사였습니다. 무조건 이 업체 추천입니다믿고 진행하셔도 됩니다!!!',
            customer: 591332, created_at: '2달 내 이사', partnerArea:'인천시 남동구 S등급 업체'
        },
        {
            partnerName: '가자익스프레스', grade: '최고', price: '최고에요', kind: '최고에요', professional: '좋아요',
            content: '전반적으로 만족스러웠습니다. 버릴 물건이 많았는데 잘 보내 주셨어요! 다 열심히 해 주셨고 특히 부엌 담당해 주신 분 감사합니다.',
            customer: 591206, created_at: '1달 내 이사', partnerArea:'수원시 영통구 S등급 업체'
        },
        {
            partnerName: '달님이사', grade: '최고', price: '최고에요', kind: '최고에요', professional: '좋아요',
            content: '엄청 꼼꼼하고 친절하게 잘 해주셨습니다. 저는 보관이사라서 11월에 한번 더 이용예정인데 믿고 이용할수 있을것 같습니다 ^^',
            customer: 590849, created_at: '3달 내 이사', partnerArea: '성남시 A등급 업체'
        },
        {
            partnerName: '해피익스프레스', grade: '매우 만족', price: '좋아요', kind: '좋아요', professional: '최고에요',
            content: '짐이 예상보다 오버하여 용달을 불렀는데, 계약대로 추가 비용없이 되는거라고 먼저 설명해주시고, 새집에 고장난것도 손바주셨어요!',
            customer: 590625, created_at: '1달 내 이사', partnerArea:'서울시 성동구 S등급 업체'
        },

    ]

    const autoPlayOptions = {
      // delay: 4000
        delay: 400000000
    }

    return (
        <S.Container id="dsl_move_review_more_1">
          <S.Title>이사업체 고객 평가</S.Title>
          <S.Group>
            <S.Text>이사 후 고객이 평가한 업체별 만족도</S.Text>
            <S.More onClick={()=> router.push('/comment')}>더보기</S.More>
          </S.Group>
          <CustomSwiper
            centeredSlides={true}
            centeredSlidesBounds={true}
            pagination={{ clickable: true }}
            width={330}
            loop={true}
            autoplay={autoPlayOptions}
            loopAdditionalSlides={1}
            breakpoints={{ 768: { slidesPerView: 3, centeredSlides: false, centeredSlidesBounds: false, width: 990 }}}
          >
              {reviews.map((review, i) => (
                  <SwiperSlide key={i}>
                      <ReviewCard partnerName={review.partnerName} userId={review.customer} created_at={review.created_at} grade={review.grade} price={review.price} kind={review.kind} professional={review.professional} reviewContents={review.content} partnerArea={review.partnerArea}/>
                  </SwiperSlide>
              ))}
              <div className="swiper-wrapper" />
              <div className="swiper-pagination" />
          </CustomSwiper>
        </S.Container>
    )
}

export default memo(Review)
