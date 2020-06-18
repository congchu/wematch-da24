import React from 'react'
import Styled from 'styled-components'
import { Previous, Truck } from '../../components/common/Icon'

const S = {
		Container: Styled.div`
			svg{
				position:absolute;
				top:0;
				left:0;
				padding:12px 16px;
				@media screen and (min-width: 768px) {
					top:14px;
					left:8px;
				}
			}
			:after{
				content:'';
				display:block;
				width:100%;
				height:8px;
				background-color:#f7f8fa;
				box-shadow:inset 0 1px 0 #ebeef2;
			}
		`,
		HeadTitle: Styled.strong`
			display:block;
			padding:15px 0;
			font-weight:400;
			font-size:16px;
			line-height:18px;
			letter-spacing:-1px;
			color:#121212;
			text-align:center;
			+ svg {
				top:7px;
				left:auto;
				right:15px;
				@media screen and (min-width: 768px) {
					top:18px;
					right:9px;
				}
			}
			@media screen and (min-width: 768px) {
				padding:30px 0 24px;
				font-size:18px;
			}
		`,
		Count: Styled.span`
			display:inline-block;
			position:absolute;
			top:11px;
			right:23px;
			width:16px;
			height:16px;
			border-radius:8px;
			font-size:11px;
			color:#fff;
			text-align:center;
			line-height:17px;
			background:#1672f7;
			@media screen and (min-width: 768px) {
				top:20px;
				right:16px;
			}
		`
}

const TopGnb = ({}) => {
	return (
		<S.Container>
			<Previous width="11" height="20" color="#333" />
			<S.HeadTitle>업체 직접 선택</S.HeadTitle>
			<Truck width="22" height="15" color="#000"/>
			<S.Count>2</S.Count>
		</S.Container>
	)
}

export default TopGnb