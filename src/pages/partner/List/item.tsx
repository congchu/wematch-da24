import React from 'react'
import Styled, { css } from 'styled-components'

import { NextArrow, ProfileDefault } from 'components/Icon'
import { Level } from 'types/partner'

import * as colors from 'styles/colors'
import { API_URL } from 'constants/env'

const S = {
	Box: Styled.a<{active: boolean}>`
		display:block;
		overflow:hidden;
		padding:24px;
		border-bottom:1px solid ${colors.lineDefault};
		background:${colors.white};
		${props => props.active && css`
			background: ${colors.hoverBg};
		`};
		@media screen and (min-width:768px) {
			padding:24px 40px;
		}
	`,
	PartnerImg: Styled.div<{profile_img?: string}>`
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
			border-radius:44px;
			background-image:url(${props => props.profile_img});
			background-size:cover;
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
	BgClose: Styled.div<{is_full: boolean}>`
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
		${props => props.is_full && css`
			background-color: rgba(0,0,0,0.4);
		`};
		text-align:center;
		box-sizing:border-box;
		@media screen and (max-width: 320px) {
			padding-top:23px;
		}
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
			margin:1px 0 0 10px;
			vertical-align:top;
		}
	`
}

interface Props {
	active: boolean;
	profile_img: string;
	level: Level;
	title: string;
	pick_count: number;
	review_count: number;
	experience: number;
	onClick: () => void;
	is_full: boolean;
}

const PartnerItem = ({ active, profile_img, level, title, pick_count, review_count, experience, onClick, is_full }: Props) => {
	const THUMBNAIL_URL = API_URL + '/unsafe/88x88/'
	return (
		<S.Box active={active} onClick={onClick}>
			{profile_img ? (
				<S.PartnerImg profile_img={THUMBNAIL_URL + profile_img}>
					<span />
					{is_full && <S.BgClose is_full={is_full}>오늘<br/>마감</S.BgClose>}
				</S.PartnerImg>
			) : (
				<S.PartnerImg>
					<span />
					<ProfileDefault width={36} height={36} color={colors.white} />
					{is_full && <S.BgClose is_full={is_full}>오늘<br/>마감</S.BgClose>}
				</S.PartnerImg>
			)}
			<S.CompanyInfo>
				{/*<S.LevelTitle><em>{level}등급</em> {levelDescription}</S.LevelTitle>*/}
				<S.LevelTitle><em>{level}등급</em></S.LevelTitle>
				<S.PartnerWord>{title}</S.PartnerWord>
				<S.PartnerInfo>
					<span>고객선택 {pick_count}</span>
					<span>평가 {review_count}</span>
					<span>경력 {experience}년</span>
				</S.PartnerInfo>
				<S.CompanyLink>
					자세히 보기
					<NextArrow color={colors.gray66} width={8} height={14} />
				</S.CompanyLink>
			</S.CompanyInfo>
		</S.Box>
	)
}



export default PartnerItem