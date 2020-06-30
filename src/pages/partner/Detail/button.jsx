import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

import { UpArrow, DownArrow } from '../../../components/Icon'

const S = {
	Container: Styled.div`
		position:relative;
		margin-top:10px;
		:before{
			content:'';
			position:absolute;
			top:-10px;
			width:100%;
			height:8px;
			margin-bottom:64px;
			background-color:${colors.lineDeco};
			border:1px solid ${colors.lineDefault};
			box-sizing:border-box;
			@media screen and (min-width:1200px) {
				width:720px;
				border:0;
			}
		}
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-bottom:80px;
			padding-left:272px;
		}
	`,
	MoreList: Styled.button`
		width:100%;
		height:52px;
		margin-bottom:64px;
		font-size:15px;
		font-weight:500;
		background-color:${colors.white};
		color:${colors.gray66};
		cursor:pointer;
		svg{
			margin-left:4px;
			vertical-align:middle;
		}
		@media screen and (min-width:1200px) {
			margin-bottom:0;
		}
	`,
	BtnSelect: Styled.button`
		position:fixed;
		z-index:5;
		left:0;
		right:0;
		bottom:0;
		width:100%;
		height:64px;
		font-size:18px;
		font-weight:700;
		background-color:${colors.pointBlue};
		color:${colors.white};
		cursor:pointer;
		@media screen and (min-width:1200px) {
			position:relative;
		}
	`,
	TopBtn: Styled.span`
		position:fixed;
		right:24px;
		bottom:88px;
		width:40px;
		height:40px;
		border:1px solid ${colors.pointBlue};
		border-radius:22px;
		background-color:${colors.white};
		box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.2);
		cursor:pointer;
		svg{
			position:absolute;
			top:50%;
			left:50%;
			margin-top:-8px;
			margin-left:-8px;
		}
		@media screen and (min-width:768px) {
			bottom:120px;
		}
		@media screen and (min-width:120px) {
			z-index:5;
			right:70px;
			bottom:80px;
		}
	`,
}

const Button = () => {
	return (
		<S.Container>
			<S.MoreList>후기 더보기 <DownArrow width="16" height="16" /></S.MoreList>
			<S.BtnSelect>이 업체 선택하기</S.BtnSelect>
			<S.TopBtn><UpArrow color={colors.pointBlue} width="16" height="16" /></S.TopBtn>
		</S.Container>
	)
}

export default Button