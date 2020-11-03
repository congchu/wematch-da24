 import React, { memo, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCountUp } from 'react-countup'

import styled, { css } from 'styled-components/macro'

import { useRouter } from 'hooks/useRouter'
import { pointBlue, gray33, gray66 } from 'styles/colors'

const CustomSwiper = styled(Swiper)`  
  .swiper-pagination-bullets {
    bottom: 95px;
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

const Slide = styled.div<{image: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  height: 400px;
  ${props => props.image && css`
    background-image: url(${require('assets/images/components/MainVisual/' + props.image + '.png')});
  `};
  background-size: cover;
  background-position: center center;

  font-style: normal;
  font-weight: normal;
  color: ${gray33};

  padding: 20px;
  
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
    ${props => props.image && css`
      background-image: url(${require('assets/images/components/MainVisual/' + props.image + '_pc.png')});
    `};
  }
  
  @media screen and (min-width: 1200px) {
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

function MainVisual() {
    const router = useRouter()

    const numberWithComma = useCallback((value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }, [])

    const { countUp, reset, update } = useCountUp({
        start: 0,
        end: 5402531,
        duration: 0.7,
        formattingFn: (value: number) => numberWithComma(value)
    })

    const autoPlayOptions = {
        delay: 3000
    }

    return (
        <CustomSwiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(e) => {
                reset()
                if (e.activeIndex === 1 || e.activeIndex === 4) {
                    update(5402531)
                } else if (e.activeIndex === 2) {
                    update(1036351)
                } else if (e.activeIndex === 3) {
                    update(111267)
                }
            }}
            loop={true}
            autoplay={autoPlayOptions}
        >
            <SwiperSlide>
                <Slide image="main_visual_01" onClick={() => router.history.push('/banner/intro')}>
                    <div className="wrapper">
                        <span>
                            누적 고객수&nbsp;
                            <strong>{countUp}</strong>
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: "잘하는 이사업체 <br /> <strong>1분만에 찾았다</strong>" }} />
                        <a>자세히</a>
                    </div>
                </Slide>
            </SwiperSlide>
            <SwiperSlide>
                <Slide image="main_visual_02" onClick={() => router.history.push('/banner/customer')}>
                    <div className="wrapper">
                        <span>
                            누적 고객수&nbsp;
                            <strong>{countUp}</strong>
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: "“혹시나 하고 이용했는데 <br /> <strong>대만족</strong>이에요”" }} />
                        <a>자세히</a>
                    </div>
                </Slide>
            </SwiperSlide>
            <SwiperSlide>
                <Slide image="main_visual_03" onClick={() => router.history.push('/banner/grade')}>
                    <div className="wrapper">
                        <span>
                            누적 고객수&nbsp;
                            <strong>{countUp}</strong>
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: "<strong>허위후기/광고 없이</strong><br />진짜 데이터로 고르자" }} />
                        <a>자세히</a>
                    </div>
                </Slide>
            </SwiperSlide>
        </CustomSwiper>
    )
}

export default memo(MainVisual)