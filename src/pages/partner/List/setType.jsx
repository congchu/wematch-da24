import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

const S = {
		TypeSet: Styled.div`
			background:${colors.grayBg};
		`,
		BoxSet: Styled.div`
			padding:19px 24px;
			span{
				font-size:16px;
				letter-spacing:-0.5px;
			}
			@media screen and (min-width: 768px) {
				width:608px;
				margin:0 auto;
			}
		`,
		ReSelect: Styled.a`
			display:inline-block;
			float:right;
			font-size:16px;
			text-decoration:underline;
		`
}

const setType = ({}) => {
	return (
		<S.TypeSet>
			<S.BoxSet>
				<span>이사종류 / </span>
				<span>이사날짜 / </span>
				<span>출발지동주소</span>
				<S.ReSelect>
					재검색
				</S.ReSelect>
			</S.BoxSet>
		</S.TypeSet>
	)
}

export default setType