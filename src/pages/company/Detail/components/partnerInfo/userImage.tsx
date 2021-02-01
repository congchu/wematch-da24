import React from 'react'
import Styled from 'styled-components'

import { ProfileDefault } from 'components/Icon'
import * as colors from 'styles/colors'

const S = {
	WrapImg: Styled.div`
		@media screen and (min-width:1200px) {
			position:relative;
			width:720px;
			margin:0 auto;
			padding-left:0px;
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
	ProfileImg: Styled.div<{profile_img: string}>`
		span{
			display:inline-block;
			width:100%;
			height:284px;
			background-image:url(${props => props.profile_img});
			background-size:cover;
			background-position:50% 50%;
			background-repeat:no-repeat;
			@media screen and (min-width:768px) {
				height:558px;
			}
			@media screen and (min-width:1200px) {
				height:474px;
			}
		}
		@media screen and (min-width:1200px) {
			margin-top:40px;
		}
	`,
	DefaultProfileImg: Styled.div`
		position:relative;
	  	background-color:${colors.lineDefault};
	  	width:100%;
	  	height:284px;
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;

	  	span{
	  		position:absolute;
	  		left:50%;
	  		top:50%;
	  		transform:translate(-50%, -50%);
	  		font-size: 18px;
			font-weight: bold;
			font-stretch: normal;
			font-style: normal;
			line-height: 0.89;
			letter-spacing: -1.29px;
			color: ${colors.white};
	  	}
	  	
		@media screen and (min-width:768px) {
			height:558px;
		}
		@media screen and (min-width:1200px) {
			height:474px;
		}
		@media screen and (min-width:1200px) {
			margin-top:40px;
		}
	`,
	Opacity: Styled.div`
		position: absolute;
		left:0;
		top:0;
		width: 100%;
		height: 228px;
		background-color: rgba(0,0,0,0.4);
		
		@media screen and (min-width:768px) {
			height:486px;
		}
		@media screen and (min-width:1200px) {
			height:474px;
		}
	`
}

interface Props {
	profile_img: string;
}

const UserImage = ({ profile_img}: Props) => {
	return (
		<S.WrapImg>
			{profile_img ? (
				<>
				<S.ProfileImg profile_img={profile_img}>
					<span />
				</S.ProfileImg>
				</>
			) : (
				<S.DefaultProfileImg>
					<ProfileDefault width={60} height={60} color={colors.white} />
				</S.DefaultProfileImg>
			)}
		</S.WrapImg>
	)
}

export default UserImage