import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../styles/colors'

import { Previous, Truck } from '../Icon'
import {useRouter} from "../../hooks/useRouter";
import {useSelector} from "react-redux";
import * as commonSelector from "../../store/common/selectors";

const S = {
		Container: Styled.div`
			:after{
				content:'';
				display:block;
				width:100%;
				height:8px;
				background-color:${colors.grayBg};
				box-shadow:inset 0 1px 0 ${colors.lineDeco};
			}
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
}

interface Props {
	title: string;
	count: number;
	onPrevious: () => void;
}

const TopGnb = ({ title, count, onPrevious }: Props) => {
	const router = useRouter()
	const getMoveIdxData = useSelector(commonSelector.getMoveIdxData)
	return (
		<S.Container>
			<S.BtnPrevious onClick={onPrevious}>
				<Previous width={11} height={20} color={colors.gray33} />
			</S.BtnPrevious>
			<S.HeadTitle>{title}</S.HeadTitle>
			<S.BtnList onClick={() => router.push(`/partner/cart?idx=${getMoveIdxData.idx}`)}>
				<Truck width={22} height={15} color={colors.black}/>
				{count > 0 && <S.Count>{count}</S.Count>}
			</S.BtnList>
		</S.Container>
	)
}

export default TopGnb