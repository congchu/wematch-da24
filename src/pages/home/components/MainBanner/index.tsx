import React, { memo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCountUp } from "react-countup";

import styled, { css } from "styled-components/macro";

import { useRouter } from "hooks/useRouter";
import { dataLayer } from "lib/dataLayerUtil";
import { pointBlue, gray33, gray66 } from "styles/colors";

const CustomSwiper = styled(Swiper)`
  .swiper-pagination-bullets {
    bottom: 95px;
  }

  .swiper-pagination-bullet {
    color: #c4c9d1;
  }

  .swiper-pagination-bullet-active {
    width: 14px;
    border-radius: 40px;
    background: ${pointBlue};
  }
`;

const Slide = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 400px;
  ${(props) =>
    props.image &&
    css`
      background-image: url(${require("assets/images/components/MainVisual/" + props.image + ".jpg")});
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
    .title {
      font-size: 18px;
      line-height: 26px;
    }
    .content {
      font-weight: bold;
      font-size: 24px;
      line-height: 35px;
      color: #333333;
    }
    .button {
      background: #154975;
      color: #ffffff;
      border-radius: 12px;
      font-weight: bold;
      font-size: 11px;
      padding: 5px 10px;
    }
    .button-light {
      background: #ffffff;
      color: #045853;
      border-radius: 12px;
      font-weight: bold;
      font-size: 11px;
      padding: 5px 10px;
    }
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
    ${(props) =>
      props.image &&
      css`
        background-image: url(${require("assets/images/components/MainVisual/" + props.image + "_pc.jpg")});
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

    .wrapper {
      .title,
      .content {
        font-size: 36px;
        line-height: 52px;
      }

      .button {
        font-size: 15px;
        line-height: 22px;
      }
    }
  }
`;

function MainVisual() {
  const router = useRouter();

  const numberWithComma = useCallback((value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const { countUp, reset, update } = useCountUp({
    start: 0,
    end: 5402531,
    duration: 0.7,
    formattingFn: (value: number) => numberWithComma(value)
  });

  const autoPlayOptions = {
    delay: 4000
  };

  return (
    <CustomSwiper
      id="dsl_move_banner_1"
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideChange={(e) => {
        reset();
        if (e.activeIndex === 1 || e.activeIndex === 4) {
          update(5402531);
        } else if (e.activeIndex === 2) {
          update(1036351);
        } else if (e.activeIndex === 0 || e.activeIndex === 3) {
          update(111267);
        }
      }}
      loop={true}
      autoplay={autoPlayOptions}>
      <SwiperSlide>
        <Slide
          image="main_visual_04"
          onClick={() => {
            dataLayer({
              event: "header_banner",
              category: "?????????_??????_????????????_1",
              action: "???????????? ??????????????? ??????, 6??? ?????? ????????? ????????? ??????!",
              label: "1"
            });
            window.location.replace("https://bit.ly/3AhvaIj");
          }}>
          <div className="wrapper" style={{ marginTop: "-50px", color: "white" }}>
            <span className="title">???????????? ??????????????? ??????,</span>
            <p className="content" style={{ marginBottom: "20px", color: "white" }}>
              6??? ?????? ????????? <br />
              ????????? ??????!
            </p>
            <a className="button-light">????????? ?????????</a>
          </div>
        </Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          image="main_visual_01"
          onClick={() => {
            dataLayer({
              event: "header_banner",
              category: "?????????_??????_????????????_1",
              action: "????????? ???????????? ????????? ??????, ?????? ????????? ?????? 46??????!",
              label: "2"
            });
            window.location.href = "http://landing-da24.wematch.com/event_list/";
          }}>
          <div className="wrapper" style={{ marginTop: "-50px" }}>
            <span className="title">????????? ???????????? ????????? ??????,</span>
            <p className="content" style={{ marginBottom: "20px" }}>
              ?????? ????????? ?????? 46??????!
            </p>
            <a className="button">????????? ?????????</a>
          </div>
        </Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          image="main_visual_02"
          onClick={() => {
            dataLayer({
              event: "header_banner",
              category: "?????????_??????_????????????_1",
              action: "????????? ???????????? 1????????? ?????????",
              label: "3"
            });
            router.history.push("/banner/intro");
          }}>
          <div className="wrapper">
            <span>
              ?????? ?????????&nbsp;
              <strong>{countUp}</strong>
            </span>
            <p dangerouslySetInnerHTML={{ __html: "????????? ???????????? <br /> <strong>1????????? ?????????</strong>" }} />
            <a>?????????</a>
          </div>
        </Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          image="main_visual_03"
          onClick={() => {
            dataLayer({
              event: "header_banner",
              category: "?????????_??????_????????????_1",
              action: "????????? ?????? ??????????????? ??????????????????",
              label: "4"
            });
            router.history.push("/banner/customer");
          }}>
          <div className="wrapper">
            <span>
              ?????? ?????????&nbsp;
              <strong>{countUp}</strong>
            </span>
            <p dangerouslySetInnerHTML={{ __html: "???????????? ?????? ??????????????? <br /> <strong>?????????</strong>????????????" }} />
            <a>?????????</a>
          </div>
        </Slide>
      </SwiperSlide>
    </CustomSwiper>
  );
}

export default memo(MainVisual);
