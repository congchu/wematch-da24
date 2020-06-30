import React from 'react'
import Styled, { css } from 'styled-components'

import * as colors from '../../../styles/colors'

import { NextArrow, ProfileDefault } from '../../../components/Icon'

const S = {
	Box: Styled.a`
		display:block;
		overflow:hidden;
		padding:24px;
		border-bottom:1px solid ${colors.lineDefault};
		background:${colors.white};
		${props => props.active && css`
			background: ${colors.hoverBg};
		`}
		@media screen and (min-width:768px) {
			padding:24px 40px;
		}
	`,
	PartnerImg: Styled.div`
		position:relative;
		float:left;
		width:88px;
		height:88px;
		border-radius:44px;
		background:${colors.lineDefault};
		svg {
			position:absolute;
			top:50%;
			left:50%;
			margin-top:-18px;
			margin-left:-18px;
		}
		span{
			display:inline-block;
			width:88px;
			height:88px;
			background-image:url(${props => props.profileImg});
			background-size:100%;
			background-repeat:no-repeat;
			@media screen and (max-width: 320px) {
				width:76px;
				height:76px;
			}
		}
		@media screen and (max-width: 320px) {
			width:76px;
			height:76px;
		}
	`,
	BgClose: Styled.div`
		display:inline-block;
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		padding-top:27px;
		border-radius:44px;
		font-weight:700;
		color:${colors.white};
		${props => props.disabled && css`
			background-color: rgba(0,0,0,0.4);
		`}
		text-align:center;
		box-sizing:border-box;
	`,
	CompanyInfo: Styled.div`
		float:left;
		width:66%;
		margin-left:16px;
		@media screen and (min-width: 768px) {
			width:80%;
		}
	`,
	LevelTitle: Styled.strong`
		display:inline-block;
		margin-top:2px;
		font-size:16px;
		color:${colors.pointBlue};
		letter-spacing:-0.5px;
		em{
			font-weight:bold;
		}
	`,
	PartnerWord: Styled.p`
		margin-top:4px;
		font-size:16px;
		color:${colors.black};
		letter-spacing:-0.5px;
		line-height:21px;
		@media screen and (max-width: 320px) {
			font-size:15px;
		}
	`,
	PartnerInfo: Styled.div`
		margin-top:14px;
		font-size:14px;
		color:${colors.gray66};
		span{
			margin-right:16px;
			@media screen and (max-width: 320px) {
				margin-right:10px;
			}
		}
		span:last-child{
			margin-right:0;
		}
	`,
	CompanyLink: Styled.span`
		display:inline-block;
		margin-top:27px;
		font-size:14px;
		color:${colors.gray66};
		letter-spacing:-1px;
		svg {
			margin-left:10px;
			vertical-align:top;
		}
	`
}

const PartnerItem = ({active, disabled, profileImg, level, levelDescription, title, pick_count, review_count, experience}) => {

	return (
		<S.Box active={active}>
			{profileImg ? (
				<S.PartnerImg profileImg={profileImg}>
					<span></span>
					{disabled && <S.BgClose disabled>오늘<br/>마감</S.BgClose>}
				</S.PartnerImg>
			) : (
				<S.PartnerImg>
					<ProfileDefault width="36" height="36" color={colors.white}/>
					{disabled && <S.BgClose disabled>오늘<br/>마감</S.BgClose>}
				</S.PartnerImg>
			)}

			<S.CompanyInfo>
				<S.LevelTitle><em>{level}등급</em> ({levelDescription})</S.LevelTitle>
				<S.PartnerWord>{title}</S.PartnerWord>
				<S.PartnerInfo>
					<span>고객선택 {pick_count}</span>
					<span>평가 {review_count}</span>
					<span>경력 {experience}년</span>
				</S.PartnerInfo>
				<S.CompanyLink>
					자세히 보기
					<NextArrow color={colors.gray66} width="8" height="14"/>
				</S.CompanyLink>
			</S.CompanyInfo>
		</S.Box>
	)
}


PartnerItem.defaultProps = {
	title: '의욕이 가득한 이사업체입니다.'
}


export default PartnerItem