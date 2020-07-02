import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../styles/colors'

import { Previous, Truck } from '../Icon'

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
			padding:12px 16px;
			@media screen and (min-width: 768px) {
				top:14px;
				left:8px;
			}
		`,
		HeadTitle: Styled.strong`
			display:block;
			padding:15px 0;
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
			right:15px;
			padding:12px 16px;
			@media screen and (min-width: 768px) {
				top:18px;
				right:9px;
			}
		`,
		Count: Styled.span`
			display:inline-block;
			position:absolute;
			top:3px;
			right:7px;
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

const TopGnb = ({title,count,onPrevious}) => {
	return (
		<S.Container>
			<S.BtnPrevious onPrevious={onPrevious}>
				<Previous width="11" height="20" color={colors.gray33} />
			</S.BtnPrevious>
			<S.HeadTitle>{title}</S.HeadTitle>
			<S.BtnList>
				<Truck width="22" height="15" color={colors.black}/>
				{count > 0 && <S.Count>{count}</S.Count>}
			</S.BtnList>
		</S.Container>
	)
}

export default TopGnb