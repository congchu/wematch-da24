import React, { memo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import styled from 'styled-components/macro'

import { gray33, gray66 } from 'styles/colors'

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
    font-size: 18px;
    line-height: 26px; 
    color: ${gray33};
    margin-bottom: 8px;
    padding: 0 24px;
  `,
  Text: styled.p`
    font-size: 14px;
    line-height: 20px;
    color: ${gray66};
  `,
  More: styled.a`
    font-size: 14px;
    line-height: 20px;
    color: ${gray66};
  `
}

const Dots = styled.ul`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const Dot = styled.li<{ active: boolean }>`
  width: ${props => props.active ? '14px' : '8px'};
  height: 8px;
  background-color: ${props => props.active ? '#1672F7' : '#C4C9D1'};
  border-radius: ${props => props.active ? '40px' : '50%'};
  transition: background-color 0.3s ease-in-out;
  margin-right: 4px;  
`

const Image = styled.img`
  width: 312px;
  height: 210px;
`

function Review() {
    const reviews = [
      require('assets/images/components/Review/review_01.png'),
      require('assets/images/components/Review/review_02.png'),
      require('assets/images/components/Review/review_03.png'),
      require('assets/images/components/Review/review_04.png'),
      require('assets/images/components/Review/review_05.png'),
    ]

    const autoPlayOptions = {
      delay: 3000
    }

    const [curIndex, setCurIndex] = useState(0)
    return (
        <S.Container>
          <S.Title>이사업체 고객 평가</S.Title>
          <S.Group>
            <S.Text>이사 후 고객이 평가한 업체멸 만족도</S.Text>
            <S.More href="https://da24.wematch.com/comment2.asp">더보기</S.More>
          </S.Group>
          <Swiper
            centeredSlides={true}
            centeredSlidesBounds={true}
            onSlideChange={(swiper) => (
              swiper.activeIndex === reviews.length + 1 ? setCurIndex(1) : swiper.activeIndex === 0 ? setCurIndex(5) : setCurIndex(swiper.activeIndex)
            )}
            width={312}
            loop={true}
            autoplay={autoPlayOptions}
            breakpoints={{ 768: { slidesPerView: 3, centeredSlides: false, centeredSlidesBounds: false, width: 910 }}}
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <Image src={review} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" />
              </SwiperSlide>
              ))}
              <span slot="container-end">
                <Dots>
                  {reviews.map((item, i) => (
                    <Dot key={i} active={curIndex === i + 1} />
                  ))}
                </Dots>
              </span>
            </Swiper>
        </S.Container>
    )
}

export default memo(Review)
