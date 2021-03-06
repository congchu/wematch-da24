import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useMedia } from "react-use-media";

import { DownArrow, UpArrow } from "components/Icon";

import { getCreatedAt } from "lib/time";
import * as colors from "styles/colors";
import { Grade, Level } from "types/partner";
import SLevelLabel from "../../Icon/generated/SLevelLabel";
import PrevIcon from "../../wematch-ui/Icon/generated/Previous";
import { useHistory } from "react-router-dom";

const S = {
  Container: styled.div`
    &:nth-child(1) {
      * {
        border: none;
      }
    }
    @media screen and (min-width: 1200px) {
      width: 720px;
      margin: 0 auto;
      padding-left: 272px;
    }
  `,
  CenterContainer: styled.div`
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
  `,
  Wrap: styled.div`
    margin: 0 24px 24px;
    border-top: 1px solid #d7dbe2;
    padding-top: 27px;
    @media screen and (min-width: 768px) {
      width: 608px;
      margin: 0 auto 24px;
    }
    @media screen and (min-width: 1200px) {
      width: 656px;
    }
  `,
  InfoWrap: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  UserInfo: styled.div`
    display: flex;
    font-size: 14px;
    color: ${colors.gray66};
    p {
      width: 1px;
      margin: 0 7px;
    }
  `,
  Grade: styled.div`
    margin-top: 18px;
    .levelText {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 600;
      color: ${colors.pointBlue};
    }
  `,
  StarFill: styled.span<{ star: number }>`
    display: block;
    position: relative;
    z-index: 5;
    width: 80px;
    height: 16px;
    vertical-align: middle;
    background: url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/star.svg) no-repeat 0 0;
    .fill {
      display: block;
      width: ${(props) => props.star && props.star}%;
      height: 16px;
      background: url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/starfill.svg) no-repeat 0 0;
    }
  `,
  Emotion: styled.div`
    overflow: hidden;
    margin-top: 26px;
    ul {
      float: left;
    }
    li {
      margin-bottom: 7px;
      color: ${colors.gray66};
      span {
        margin-left: 2px;
        color: ${colors.pointBlue};
      }
    }
    svg {
      float: right;
    }
  `,
  PartnerValue: styled.ul`
    margin-top: 24px;
    li {
      display: inline-block;
      padding: 6px 7px 5px;
      margin-right: 10px;
      border: 1px solid ${colors.pointBlue};
      border-radius: 3px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
      background-color: ${colors.white};
      color: ${colors.pointBlue};
    }
    .S {
      border: 1px solid ${colors.pointBlue};
      color: ${colors.pointBlue};
    }
    .A {
      border: 1px solid ${colors.levelA};
      color: ${colors.levelA};
    }
    .B {
      border: 1px solid ${colors.levelB};
      color: ${colors.levelB};
    }
    .C {
      border: 1px solid ${colors.levelC};
      color: ${colors.levelC};
    }
    .D {
      border: 1px solid ${colors.levelD};
      color: ${colors.levelD};
    }
  `,
  Review: styled.div``,
  ReviewText: styled.p`
    display: -webkit-box;
    overflow: hidden;
    width: 100%;
    margin-top: 12px;
    font-size: 15px;
    font-weight: 400;
    line-height: 24px;
    //text-overflow:ellipsis;
    //-webkit-line-clamp:2;
    //-webkit-box-orient:vertical;
    word-wrap: break-word;
  `,
  MoreReview: styled.button`
    display: flex;
    align-items: center;
    margin-top: 7px;
    cursor: pointer;
    svg {
      margin-left: 4px;
      vertical-align: top;
    }
    @media screen and (min-width: 768px) {
      ???margin-top: 32px;
    }
    @media screen and (min-width: 1200px) {
      display: none;
      margin-top: 10px;
    }
  `,
  Answer: styled.div`
    margin-top: 16px;
    padding: 16px 16px 14px;
    border-radius: 4px;
    background-color: ${colors.boxBg};
    strong {
      font-size: 15px;
      font-weight: 500;
    }
    p {
      margin-top: 6px;
      font-size: 15px;
      font-weight: 500;
      color: ${colors.gray66};
      line-height: 22px;
    }
  `,
  PartnerName: styled.div`
    display: block;
    position: relative;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.8px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
      padding-bottom: 18px;
    }

    svg {
      position: absolute;
      transform: rotate(-0.5turn);
      top: 0;
      right: 0;
      width: 12px;
      height: 16px;
      background-position: 0 -379px;
      -webkit-background-size: 22px 570px;
      background-size: 22px 570px;
    }
  `
};

interface Props {
  id: number;
  created_at: string;
  memo: string;
  reply: string | null;
  professional: Grade;
  kind: Grade;
  price: Grade;
  star: number;
  partnerName?: string;
  level?: Level;
  partner?: string;
  serviceType?: "clean" | "move";
}

const Review = ({ id, created_at, memo, reply, professional, kind, price, star, partnerName, level, partner, serviceType = "move" }: Props) => {
  const history = useHistory();
  const isDesktop = useMedia({
    minWidth: 1200
  });
  const isTablet = useMedia({
    minWidth: 768
  });
  const isMobile = useMedia({
    minWith: 356
  });

  const [more, setMore] = useState(false);

  const handleLevelText = (level: Grade) => {
    if (level === "verygood") {
      return "????????????";
    } else if (level === "good") {
      return "?????????";
    } else if (level === "normal") {
      return "???????????????";
    } else if (level === "bad") {
      return "????????????";
    } else if (level === "verybad") {
      return "???????????? ";
    }
  };

  const memoText = (memo: string) => {
    if (isDesktop) {
      return memo;
    }
    if (!more && isTablet && memo.length >= 90) {
      return memo.substring(0, 90) + "...";
    }

    if (!more && memo.length >= 45) return memo.substring(0, 45) + "...";
    else return memo;
  };

  const handleMore = () => {
    setMore(!more);
  };

  return (
    <S.Wrap>
      {level === "S" && <SLevelLabel />}
      {partnerName && (
        <S.PartnerName
          onClick={() => {
            partner && history.push(`/comment/${partner}`);
          }}>
          {partnerName}
          <PrevIcon size={16} />
        </S.PartnerName>
      )}
      <S.InfoWrap>
        <S.StarFill star={star}>
          <span className="fill"></span>
        </S.StarFill>
        <S.UserInfo>
          <strong>???????????? {id}</strong>
          <p> | </p>
          <span>{`${getCreatedAt(created_at)}??? ??? ${serviceType === "move" ? "??????" : "??????"}`}</span>
        </S.UserInfo>
      </S.InfoWrap>
      <S.Grade>
        <S.Emotion>
          <ul>
            <li>
              ????????? <span>{handleLevelText(professional)}</span>
            </li>
            <li>
              ????????? <span>{handleLevelText(kind)}</span>
            </li>
            <li>
              ????????? <span>{handleLevelText(price)}</span>
            </li>
          </ul>
        </S.Emotion>
      </S.Grade>
      <S.Review>
        <S.ReviewText>{memoText(memo)}</S.ReviewText>
        {(memo.length >= 45 || isMobile) && (
          <>
            {more ? (
              <S.MoreReview onClick={handleMore}>
                ??????
                <UpArrow width={16} height={16} />
              </S.MoreReview>
            ) : (
              <S.MoreReview onClick={handleMore}>
                ?????????
                <DownArrow width={16} height={16} />
              </S.MoreReview>
            )}
          </>
        )}
      </S.Review>
      {reply && (
        <S.Answer>
          <strong>{serviceType === "move" ? "???????????? ??????" : "???????????? ??????"}</strong>
          <p>{reply}</p>
        </S.Answer>
      )}
    </S.Wrap>
  );
};

export default Review;
