import React, { memo, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCountUp } from 'react-countup'

import styled, { css } from 'styled-components/macro'

import { useRouter } from 'hooks/useRouter'
import { dataLayer } from 'lib/dataLayerUtil'
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
    background-image: url(${require('assets/images/components/MainVisual/' + props.image + '.jpg')});
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
      background-image: url(${require('assets/images/components/MainVisual/' + props.image + '_pc.jpg')});
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
        delay: 4000
    }

    return (
        <CustomSwiper
            id="dsl_move_banner_1"
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(e) => {
                reset()
                if (e.activeIndex === 1 || e.activeIndex === 4) {
                    update(5402531)
                } else if (e.activeIndex === 2) {
                    update(1036351)
                } else if (e.activeIndex === 0 || e.activeIndex === 3) {
                    update(111267)
                }
            }}
            loop={true}
            autoplay={autoPlayOptions}
        >
            <SwiperSlide>
                <Slide image="main_visual_01" onClick={() => {
                    dataLayer({
                        event: 'header_banner',
                        category: '다이사_메인_상단배너_1',
                        action: '잘하는 이사업체 1분만에 찾았다',
                        label: '1'
                    })
                    router.history.push('/banner/intro')
                }}>
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
            {/*<SwiperSlide>*/}
            {/*    <EventSlide image="mattress_event" onClick={() => {*/}
            {/*        dataLayer({*/}
            {/*            event: 'header_banner',*/}
            {/*            category: '다이사_메인_상단배너_1',*/}
            {/*            action: '이사 견적서 올리면, 매트리스 소독권 또는 편의점 상품권!',*/}
            {/*            label: '2'*/}
            {/*        })*/}
            {/*        window.location.href = 'https://da24.wematch.com/notice.asp'*/}
            {/*        // router.push('/notice')*/}
            {/*    }}>*/}
            {/*        <div className="wrapper">*/}
            {/*            <span>놓칠 수 없는 혜택!</span>*/}
            {/*            <p>*/}
            {/*                이사 견적서 올리면, <br /><strong>무료 매트리스 소독권 증정!</strong>*/}
            {/*            </p>*/}
            {/*            <a>자세히</a>*/}
            {/*        </div>*/}
            {/*    </EventSlide>*/}
            {/*</SwiperSlide>*/}
            <SwiperSlide>
                <Slide image="main_visual_02" onClick={() => {
                    dataLayer({
                        event: 'header_banner',
                        category: '다이사_메인_상단배너_1',
                        action: '혹시나 하고 이용했는데 대만족이에요',
                        label: '3'
                    })
                    router.history.push('/banner/customer')
                }}>
                    <div className="wrapper">
                        <span>
                            누적 매칭수&nbsp;
                            <strong>{countUp}</strong>
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: "“혹시나 하고 이용했는데 <br /> <strong>대만족</strong>이에요”" }} />
                        <a>자세히</a>
                    </div>
                </Slide>
            </SwiperSlide>
            <SwiperSlide>
                <Slide image="main_visual_03" onClick={() => {
                    dataLayer({
                        event: 'header_banner',
                        category: '다이사_메인_상단배너_1',
                        action: '허위후기/광고 없이 진짜 데이터로 고르자',
                        label: '4'
                    })
                    router.history.push('/banner/grade')
                }}>
                    <div className="wrapper">
                        <span>
                            누적 평가수&nbsp;
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
