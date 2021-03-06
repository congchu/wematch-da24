import React from "react";
import Styled from "styled-components";

import * as colors from "../../styles/colors";

import { Previous, Truck } from "../Icon";
import { useRouter } from "../../hooks/useRouter";

const S = {
  Container: Styled.div`
		position: fixed;
		left: 0;
      	top: 0;
      	width: 100%;
      	z-index: 100;
      	background-color: #FFF
		`,
  BtnPrevious: Styled.a`
			position:absolute;
			top:0;
			left:0;
			padding:14px 16px 10px;
			@media screen and (min-width: 768px) {
				top:14px;
				left:8px;
			}
		`,
  HeadTitle: Styled.strong`
			display:block;
			padding:17px 0 13px;
			font-weight:400;
			font-size:16px;
			line-height:18px;
			letter-spacing:-1px;
			color:${colors.black};
			text-align:center;
			@media screen and (min-width: 768px) {
				padding:30px 0 24px;
				font-size:18px;
			}
		`,
  BtnList: Styled.a`
			position:absolute;
			top:7px;
			left:auto;
			right:8px;
			padding:12px 16px;
			@media screen and (min-width: 768px) {
				top:18px;
				right:9px;
			}
		`,
  Count: Styled.span`
			display:inline-block;
			position:absolute;
			top:2px;
			right:8px;
			width:16px;
			height:16px;
			border-radius:8px;
			font-size:11px;
			color:${colors.white};
			text-align:center;
			line-height:17px;
			background:${colors.pointBlue};
			@media screen and (min-width: 768px) {
				top:3px;
				right:7px;
			}
		`
};

interface Props {
  title: string;
  count: number;
  onPrevious: () => void;
  showTruck: boolean;
}

const TopGnb = ({ title, count, onPrevious, showTruck }: Props) => {
  const router = useRouter();
  return (
    <S.Container>
      <S.BtnPrevious onClick={onPrevious} id={"dsl_booking_back"}>
        <Previous width={11} height={20} color={colors.gray33} />
      </S.BtnPrevious>
      <S.HeadTitle>{title}</S.HeadTitle>
      {showTruck && (
        <S.BtnList onClick={() => router.push(`/partner/cart`)} id={`dsl_booking_truck`}>
          <Truck width={22} height={15} color={colors.black} />
          {count > 0 && <S.Count>{count}</S.Count>}
        </S.BtnList>
      )}
    </S.Container>
  );
};

export default TopGnb;
