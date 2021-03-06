import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use-media";

import { DownArrow, ProfileDefault, UpArrow } from "components/Icon";
import Loading from "components/Loading";
import MainHeaderForDetail from "components/common/MainHeaderForDetail";
import NavHeader from "components/common/NavHeader";
import TermsModal from "components/Modal/TermsModal";
import PartnerInfo from "components/da24/PartnerInfo";
import Review from "components/da24/Review";

import * as partnerActions from "store/partner/actions";
import * as partnerSelector from "store/partner/selectors";

import * as colors from "styles/colors";
import * as values from "constants/values";

const S = {
  Container: styled.div``,
  PartnerInfoContainer: styled.div`
    position: relative;
    margin-top: -16px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: ${colors.white};
    border-bottom: 8px solid ${colors.lineDeco};
    @media screen and (min-width: 1200px) {
      width: 720px;
      margin: -16px auto 0 auto;
      padding-left: 0px;
      border-bottom: 0;
    }
  `,
  BottomContainer: styled.div`
    position: relative;
    margin-top: 10px;
    :before {
      content: "";
      position: absolute;
      top: -10px;
      width: 100%;
      height: 8px;
      margin-bottom: 0px;
      background-color: ${colors.lineDeco};
      border: 1px solid ${colors.lineDefault};
      box-sizing: border-box;
      @media screen and (min-width: 1200px) {
        width: 720px;
        border: 0;
      }
    }
    @media screen and (min-width: 1200px) {
      width: 720px;
      margin: 0 auto;
      padding-bottom: 0px;
      padding-left: 0px;
    }
  `,
  MoreList: styled.button`
    width: 100%;
    height: 52px;
    margin-bottom: 0px;
    font-size: 15px;
    font-weight: 500;
    background-color: ${colors.white};
    color: ${colors.gray66};
    cursor: pointer;
    svg {
      margin-left: 4px;
      vertical-align: middle;
    }
    @media screen and (min-width: 1200px) {
      margin-bottom: 0;
    }
  `,
  TopBtn: styled.span`
    position: fixed;
    right: 24px;
    bottom: 88px;
    width: 40px;
    height: 40px;
    border: 1px solid ${colors.pointBlue};
    border-radius: 22px;
    background-color: ${colors.white};
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -8px;
      margin-left: -8px;
    }
    @media screen and (min-width: 768px) {
      bottom: 120px;
    }
    @media screen and (min-width: 1200px) {
      z-index: 5;
      right: 130px;
      bottom: 80px;
    }
  `,
  ReviewMoreLoading: styled.div`
    display: block;
    text-align: center;
    color: ${colors.pointBlue};
    padding: 25px;
  `,
  ScrollView: styled.div``,
  ReviewPreview: styled.div`
    @media screen and (min-width: 768px) {
      width: 608px;
      margin: 0 auto;
    }

    @media screen and (min-width: 1200px) {
      width: 656px;
      margin: 0 auto;
      padding-left: 0px;
    }
    img {
      width: inherit;
      display: block;
      margin: 0 auto;
    }
  `,
  CenterTitleContainer: styled.div`
    @media screen and (min-width: 1200px) {
      width: 720px;
      margin: 0 auto;
      padding-left: 0px;
    }
  `,
  Wrap: styled.div`
    padding: 24px;
    @media screen and (min-width: 768px) {
      width: 608px;
      margin: 0 auto;
      padding: 24px 0;
    }
    @media screen and (min-width: 1200px) {
      width: 656px;
    }
  `,
  Box: styled.div`
    padding: 14px 16px 10px;
    border-radius: 8px;
    background-color: ${colors.boxBg};
    p {
      font-size: 12px;
      color: ${colors.gray66};
      line-height: 20px;
      letter-spacing: -0.5px;
    }
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  `,
  Average: styled.div`
    margin-top: 45px;
    strong {
      font-size: 16px;
      font-weight: 700;
    }
  `,
  CenterReviewContainer: styled.div`
    &:nth-child(1) {
      * {
        border: none;
      }
    }
    @media screen and (min-width: 1200px) {
      width: 720px;
      margin: 0 auto;
      padding-left: 0px;
    }
  `
};

const PartnerImg = {
  WrapImg: styled.div`
    margin-top: 56px;
    @media screen and (min-width: 1200px) {
      position: relative;
      width: 720px;
      margin: 0 auto;
      padding-left: 0px;
    }
  `,
  Title: styled.div`
    display: none;
    position: absolute;
    z-index: 1;
    top: 74px;
    left: 50%;
    width: 240px;
    margin-left: -496px;
    h3 {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -1px;
      line-height: 48px;
    }
    @media screen and (min-width: 1200px) {
      display: block;
    }
  `,
  ProfileImg: styled.div<{ profile_img: string }>`
    span {
      display: inline-block;
      width: 100%;
      height: 284px;
      background-image: url(${(props) => props.profile_img});
      background-size: cover;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      @media screen and (min-width: 768px) {
        height: 558px;
      }
      @media screen and (min-width: 1200px) {
        height: 474px;
      }
    }
    @media screen and (min-width: 1200px) {
      margin-top: 40px;
    }
  `,
  DefaultProfileImg: styled.div`
    position: relative;
    background-color: ${colors.lineDefault};
    width: 100%;
    height: 284px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.89;
      letter-spacing: -1.29px;
      color: ${colors.white};
    }

    @media screen and (min-width: 768px) {
      height: 558px;
    }
    @media screen and (min-width: 1200px) {
      height: 474px;
    }
    @media screen and (min-width: 1200px) {
      margin-top: 40px;
    }
  `,
  Opacity: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 228px;
    background-color: rgba(0, 0, 0, 0.4);

    @media screen and (min-width: 768px) {
      height: 486px;
    }
    @media screen and (min-width: 1200px) {
      height: 474px;
    }
  `
};

const PartnerDetailForCompleted = () => {
  const nextPage = useRef(1);
  const [showScrollView, setShowScrollView] = useState(true);
  const [visibleTermsModal, setVisibleTermsModal] = useState(false);

  const isDesktop = useMedia({
    minWidth: 1200
  });
  const isMobile = useMedia({
    maxWidth: 767
  });

  const params = useParams<{ adminId: string }>();
  const dispatch = useDispatch();

  const getPartnerDetailCompleted = useSelector(partnerSelector.getPartnerDetailCompleted);
  const getReviewCompList = useSelector(partnerSelector.getReviewList);
  const getReviewList = useSelector(partnerSelector.getReviewList);

  const checkScrollTop = () => {
    if (!showScrollView && window.pageYOffset > 300) {
      setShowScrollView(true);
    } else if (showScrollView && window.pageYOffset <= 300) {
      setShowScrollView(false);
    } else if (window.pageYOffset === 0) {
      setShowScrollView(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(
      partnerActions.fetchPartnerDetailCompAsync.request({
        adminId: params.adminId
      })
    );
    dispatch(
      partnerActions.fetchReviewListAsync.request({
        adminId: params.adminId,
        page: 1,
        size: values.DEFAULT_REVIEW_LIST_SIZE
      })
    );
  }, [dispatch, params.adminId]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [checkScrollTop]);

  if (getPartnerDetailCompleted.loading) {
    return <Loading />;
  }

  const handleMoreReview = () => {
    nextPage.current += 1;
    dispatch(
      partnerActions.fetchReviewMoreListAsync.request({
        adminId: params.adminId,
        page: nextPage.current,
        size: values.DEFAULT_REVIEW_LIST_SIZE
      })
    );
  };

  const toggleVisibleTerms = () => setVisibleTermsModal(!visibleTermsModal);

  /* Partner Info  - UserImage */
  const partnerImage = () => {
    return (
      <PartnerImg.WrapImg>
        {getPartnerDetailCompleted.data?.profile_img ? (
          <>
            <PartnerImg.ProfileImg profile_img={getPartnerDetailCompleted.data?.profile_img}>
              <span />
            </PartnerImg.ProfileImg>
          </>
        ) : (
          <PartnerImg.DefaultProfileImg>
            <ProfileDefault width={60} height={60} color={colors.white} />
          </PartnerImg.DefaultProfileImg>
        )}
      </PartnerImg.WrapImg>
    );
  };

  /* Review */
  const review = () => {
    if (getReviewList.data.length < 1) {
      return (
        <S.ReviewPreview>
          <img src={require(`assets/images/review_${isMobile ? "m" : "pc"}.svg`)} alt="review_img" />
        </S.ReviewPreview>
      );
    }

    return (
      <div>
        {getReviewList.data.map((review, index) => {
          return <Review key={index} id={review.id} created_at={review.created_at} professional={review.professional} kind={review.kind} price={review.price} memo={review.memo} reply={review.reply} star={review.star} serviceType={getPartnerDetailCompleted?.data?.service_type} />;
        })}
      </div>
    );
  };

  return (
    <S.Container>
      {getPartnerDetailCompleted.data && (
        <>
          {isDesktop ? <MainHeaderForDetail /> : <NavHeader title={getPartnerDetailCompleted?.data?.service_type === "move" ? "???????????? ?????? ??????" : "???????????? ?????? ??????"} />}
          {partnerImage()}
          <S.PartnerInfoContainer>
            <PartnerInfo
              title={getPartnerDetailCompleted.data.title ? getPartnerDetailCompleted.data.title : values.DEFAULT_TEXT}
              level={getPartnerDetailCompleted.data.level}
              pick_cnt={getPartnerDetailCompleted.data.pick_cnt}
              experience={getPartnerDetailCompleted.data.experience}
              description={getPartnerDetailCompleted.data.description}
              keywords={getPartnerDetailCompleted.data.keywords}
              adminname={getPartnerDetailCompleted.data.adminname}
              addition={getPartnerDetailCompleted.data.addition}
            />
          </S.PartnerInfoContainer>
          <S.CenterTitleContainer>
            <S.Wrap>
              <S.Box>
                <p>
                  ???????????? ?????? ????????? ????????? ????????? ?????? ?????? ?????? ???????????????, ???????????? ??? ????????? ????????????. <span onClick={toggleVisibleTerms}>?????????</span>
                </p>
              </S.Box>
              <S.Average>
                <strong>????????????</strong>
              </S.Average>
            </S.Wrap>
            <TermsModal visible={visibleTermsModal} onClose={toggleVisibleTerms} />
          </S.CenterTitleContainer>
          <S.CenterReviewContainer>{review()}</S.CenterReviewContainer>
          <S.BottomContainer>
            {getReviewCompList.moreLoading && <S.ReviewMoreLoading>?????????..</S.ReviewMoreLoading>}
            {getReviewCompList.hasMore && (
              <S.MoreList onClick={handleMoreReview}>
                ?????? ????????? <DownArrow width={16} height={16} />
              </S.MoreList>
            )}
            {showScrollView && (
              <S.ScrollView>
                <S.TopBtn onClick={handleScrollTop}>
                  <UpArrow color={colors.pointBlue} width={16} height={16} />
                </S.TopBtn>
              </S.ScrollView>
            )}
          </S.BottomContainer>
        </>
      )}
    </S.Container>
  );
};

export default PartnerDetailForCompleted;
