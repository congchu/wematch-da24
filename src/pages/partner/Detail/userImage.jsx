import React from 'react'
import Styled, { css } from 'styled-components'

import * as colors from '../../../styles/colors'

const S = {
	WrapImg: Styled.div`
		@media screen and (min-width:1200px) {
			position:relative;
			width:720px;
			margin:0 auto;
			padding-left:272px;
		}
	`,
	Title: Styled.div`
		display:none;
    position:absolute;
    z-index:1;
    top:74px;
    left:50%;
    width:240px;
    margin-left:-496px;
		h3{
			font-size:32px;
			font-weight:700;
			letter-spacing:-1px;
			line-height:48px;
		}
		@media screen and (min-width:1200px) {
			display:block;
		}
	`,
	ProfileImg: Styled.div`
		span{
			display:inline-block;
			width:100%;
			height:228px;
			background-image:url('https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/bg/m/bg_happymove.png');
			background-size:100%;
			background-repeat:no-repeat;
			@media screen and (min-width:768px) {
				height:486px;
			}
			@media screen and (min-width:1200px) {
				height:474px;
			}
		}
		@media screen and (min-width:1200px) {
				padding-top:70px;
			}
	`,

}

const UserImage = () => {
	return (
		<S.WrapImg>
			<S.Title>
				<h3>업체<br />직접선택</h3>
			</S.Title>
			<S.ProfileImg>
				<span></span>
			</S.ProfileImg>
		</S.WrapImg>
	)
}

export default UserImage