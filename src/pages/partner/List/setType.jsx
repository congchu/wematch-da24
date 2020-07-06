import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

import { Truck } from '../../../components/Icon'

const S = {
		TypeSet: Styled.div`
			background:${colors.grayBg};
			border-bottom:1px solid ${colors.lineDefault};
		`,
		BoxSet: Styled.div`
			padding:19px 24px;
			.type{
				font-size:16px;
				letter-spacing:-0.5px;
			}
			@media screen and (min-width:768px) {
				width:528px;
				margin:0 auto;
			}
			@media screen and (min-width:1200px) {
				width:992px;
				padding:21px 24px 17px;
			}
		`,
		ReSelect: Styled.a`
			display:inline-block;
			float:right;
			font-size:16px;
			text-decoration:underline;
			@media screen and (min-width:1200px) {
				float:none;
				margin-left:16px;
			}
		`,
		CompareList: Styled.span`
			display:none;
			position:relative;
			float:right;
			cursor:pointer;
			svg{
				margin-left:11px;
			}
			@media screen and (min-width:1200px) {
				display:inline-block;
			}
		`,
		Count: Styled.span`
			display:inline-block;
			position:absolute;
			top:-9px;
			right:-9px;
			width:16px;
			height:16px;
			border-radius:8px;
			font-size:11px;
			color:${colors.white};
			text-align:center;
			line-height:17px;
			background:${colors.pointBlue};
		`
}

const setType = ({count}) => {
	return (
		<S.TypeSet>
			<S.BoxSet>
				<span className="type">이사종류 / </span>
				<span className="type">이사날짜 / </span>
				<span className="type">출발지동주소</span>
				<S.ReSelect>
					재검색
				</S.ReSelect>
				<S.CompareList>선택한 업체비교함
					<Truck width="22" height="15" color={colors.black}/>
					{count > 0 && <S.Count>{count}</S.Count>}
				</S.CompareList>
			</S.BoxSet>
		</S.TypeSet>
	)
}

export default setType