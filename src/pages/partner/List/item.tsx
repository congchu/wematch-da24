import React from 'react'
import {useSelector} from "react-redux";
import styled, { css } from 'styled-components'
import {some} from "lodash";

import { NextArrow, ProfileDefault } from 'components/Icon'
import {IPartnerList, Level, LevelText} from 'types/partner'

import * as colors from 'styles/colors'
import * as partnerSelector from "store/partner/selectors";
import * as values from "constants/values";
import {Skeleton} from "components/SkeletonEl";

const S = {
	Box: styled.a<{isSelected?: boolean, isFull?:boolean}>`
		display:block;
		overflow:hidden;
		padding:24px;
		border-bottom:1px solid ${colors.lineDefault};
		background-color: ${props => props.isSelected ? colors.grayBg : colors.white};
		
		* {
			color: ${props => props.isFull && colors.gray66};
		}
        
		
		@media screen and (min-width:768px) {
			padding:24px 40px;
		}
		
	`,
	PartnerImg: styled.div<{profile_img?: string}>`
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
	BgClose: styled.div<{is_full: boolean}>`
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
		&:after {
			content: "오늘\\a마감";
			white-space: pre-line;
		}
		@media screen and (max-width: 320px) {
			padding-top:23px;
		}
	`,
	BgSelected: styled.div<{isSelected: boolean}>`
		display:inline-block;
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		padding-top:33px;
		border-radius:44px;
		font-weight:700;
		color:${colors.white};
		${props => props.isSelected && css`
			background-color: rgba(22, 114, 247, 0.6);
		`};
		text-align:center;
		box-sizing:border-box;
		&:after {
			content: "선택";
			white-space: pre-line;
		}
		@media screen and (max-width: 320px) {
			padding-top:23px;
		}
	`,
	CompanyInfo: styled.div`
		float:left;
		width:66%;
		margin-left:16px;
		@media screen and (min-width: 768px) {
			width:80%;
		}
	`,
	LevelTitle: styled.strong`
		display:inline-block;
		margin-top:2px;
		font-size:16px;
		color:${colors.pointBlue};
		letter-spacing:-0.5px;
		em{
			font-weight:bold;
		}
	`,
	PartnerWord: styled.p`
		margin-top:4px;
		font-size:16px;
		color:${colors.black};
		letter-spacing:-0.5px;
		line-height:21px;
		@media screen and (max-width: 320px) {
			font-size:15px;
		}
	`,
	PartnerInfo: styled.div`
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
	CompanyLink: styled.span`
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
	list?: IPartnerList;
	onClick?: () => void;
}

const PartnerItem: React.FC<Props> = ({list={}, onClick}) => {
	const { profile_img, level, title, pick_cnt, feedback_cnt, experience, status, adminid } = list
	const getPartnerPick = useSelector(partnerSelector.getPartnerPick)

	if (Object.keys(list).length === 0) {
		return (
			<S.Box>
				<S.PartnerImg><Skeleton width={'100%'} isRound={true}/></S.PartnerImg>
				<S.CompanyInfo>
					<S.PartnerWord><Skeleton width={"70%"}/></S.PartnerWord>
					<S.PartnerInfo><Skeleton width={"90%"}/></S.PartnerInfo>
					<S.PartnerInfo><Skeleton width={"90%"}/></S.PartnerInfo>
					<S.PartnerInfo><Skeleton width={"30%"}/></S.PartnerInfo>
				</S.CompanyInfo>
			</S.Box>
		)
	}

	const partnerStatus = () => {
		const isSelected = some(getPartnerPick.data, {adminid: adminid});
		if(isSelected) return 'isSelected'
		return status
	};

	return (
		<S.Box onClick={onClick} isSelected={partnerStatus() === 'isSelected'} isFull={partnerStatus() === "unavailable"}>
			{profile_img ? (
				<S.PartnerImg profile_img={profile_img}>
					<span />
					{partnerStatus() === "unavailable" && <S.BgClose is_full={partnerStatus() === "unavailable"}/>}
					{partnerStatus() === "isSelected" && <S.BgSelected isSelected={partnerStatus() === "isSelected"}/>}
				</S.PartnerImg>
			) : (
				<S.PartnerImg>
					<span />
					<ProfileDefault width={36} height={36} color={colors.white} />
					{partnerStatus() === "unavailable" && <S.BgClose is_full={partnerStatus() === "unavailable"}/>}
					{partnerStatus() === "isSelected" && <S.BgSelected isSelected={partnerStatus() === "isSelected"}/>}
				</S.PartnerImg>
			)}
			<S.CompanyInfo>
				{/*<S.LevelTitle><em>{level}등급</em> {levelDescription}</S.LevelTitle>*/}
				{/*<S.LevelTitle><em>{`${level}등급 (${LevelText[level]})`}</em></S.LevelTitle>*/}
				<S.PartnerWord>{title}</S.PartnerWord>
				<S.PartnerInfo>
					{level === 'NEW' ?
						<>
							<span>평가수집중</span>
							<span>경력 {experience || 1}년</span>
						</>
						:
						<>
							<span>고객선택 {pick_cnt}</span>
							<span>평가 {feedback_cnt}</span>
							<span>경력 {experience || 1}년</span>
						</>
					}
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