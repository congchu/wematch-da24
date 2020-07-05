import React, { useState } from 'react'
import Styled, { css } from 'styled-components'
import { useMedia } from "react-use-media";

import { IconSad, DownArrow, UpArrow } from '../../../components/Icon'

import { getCreatedAt } from '../../../lib/time'
import * as colors from '../../../styles/colors'

const S = {
	Container: Styled.div`
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-left:272px;
		}
	`,
	Wrap: Styled.div`
		margin:0 24px 24px;
		border-top:1px solid #d7dbe2;
		@media screen and (min-width: 768px) {
			width:608px;
			margin:0 auto 24px;
		}
		@media screen and (min-width:1200px) {
			width:656px;
		}
	`,
	UserInfo: Styled.div`
		padding-top:27px;
		strong{
			font-size:14px;
			font-weight:600;
			letter-spacing:-0.5px;
		}
		span{
			float:right;
			font-size:14px;
			color:${colors.gray66};
		}
	`,
	Grade: Styled.div`
		margin-top:18px;
		.levelText{
			display:block;
			margin-bottom:5px;
			font-size:14px;
			font-weight:600;
			color:${colors.pointBlue};
		}
	`,
	StarFill: Styled.span`
		display:block;
    	position:relative;
    	z-index:5;
		width:80px;
    	height:16px;
		vertical-align:middle;
		background:url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/star.svg) no-repeat 0 0;
		.fill{
			display:block;
			width:50%;
			height:16px;
			background:url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/starfill.svg) no-repeat 0 0;
		}
	`,
	Emotion: Styled.div`
		overflow:hidden;
		margin-top:26px;
		ul{
			float:left;
		}
		li{
			margin-bottom:7px;
			color:${colors.gray66};
			span{
				margin-left:2px;
				color:${colors.pointBlue};
			}
		}
		svg{
			float:right;
		}
	`,
	PartnerValue: Styled.ul`
		margin-top:24px;
		li{
			display:inline-block;
			padding:6px 7px 5px;
			margin-right:10px;
			border:1px solid ${colors.pointBlue};
			border-radius:3px;
			box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
			background-color:${colors.white};
			color:${colors.pointBlue};
		}
		.S{
			border:1px solid ${colors.pointBlue};
			color:${colors.pointBlue};
		}
		.A{
			border:1px solid ${colors.levelA};
			color:${colors.levelA}
		}
		.B{
			border:1px solid ${colors.levelB};
			color:${colors.levelB}
		}
		.C{
			border:1px solid ${colors.levelC};
			color:${colors.levelC}
		}
		.D{
			border:1px solid ${colors.levelD};
			color:${colors.levelD}
		}
	`,
	Review: Styled.div``,
	ReviewText: Styled.p`
		display:-webkit-box;
    overflow:hidden;
    width:100%;
    margin-top:12px;
		font-size:15px;
    font-weight:500;
    line-height:24px;
    //text-overflow:ellipsis;
    //-webkit-line-clamp:2;
    //-webkit-box-orient:vertical;
    word-wrap:break-word;
	`,
	MoreReview: Styled.button`
		margin-top:7px;
		cursor:pointer;
		svg{
			margin-left:4px;
			vertical-align:top;
		}
		@media screen and (min-width:768px) {
			margin-top:32px;
		}
		@media screen and (min-width:1200px) {
			display: none;
			margin-top:10px;
		}
	`,
	Answer: Styled.div`
		margin-top:16px;
		padding:16px 16px 14px;
		border-radius:4px;
		background-color:${colors.boxBg};
		strong{
			font-size:15px;
			font-weight:500;
		}
		p{
			margin-top:6px;
			font-size:15px;
			font-weight:500;
			color:${colors.gray66};
			line-height:22px;
		}
	`,
}

const Review = ({id, created_at, memo, reply, professional, kind, price}) => {
	const isDesktop = useMedia({
		minWidth: 1200,
	})
	const isTablet = useMedia({
		minWidth: 768,
	})
	const isMobile = useMedia({
		minWith: 356,
	})

	const [more, setMore] = useState(false)

	const handleLevelText = (level) => {
		if (level === 'verygood') {
			return 'S'
		} else if (level === 'good') {
			return 'A'
		} else if (level === 'normal') {
			return 'B'
		} else if (level === 'bad') {
			return 'C'
		} else if (level === 'verybad') {
			return 'D'
		}
	}

	const memoText = (memo) => {
			if (isDesktop) {
				return memo
			}
			if (!more && isTablet && memo.length >= 90) {
				return memo.substring(0, 90) + '...'
			}

			if (!more && memo.length >= 45)
				return memo.substring(0, 45) + '...'
			else
				return memo
	}

	const handleMore = () => {
		setMore(!more)
	}

	return (
		<S.Container>
			<S.Wrap>
				<S.UserInfo>
					<strong>고객번호 {id}</strong>
					<span>{getCreatedAt(created_at)} 이사</span>
				</S.UserInfo>
				{/* <S.Grade>
					<span className="levetText">최고</span>
					<S.StarFill>
						/* .fill class에  width 20% -> 40% -> ... -> 100% 별 채워짐 - 주석처리
						<span className="fill"></span>
					</S.StarFill>
					<S.Emotion>
						<ul>
							<li>
								전문성 <span>{professional}</span>
							</li>
							<li>
								친절도 <span>{kind}</span>
							</li>
							<li>
								가격도 <span>{price}</span>
							</li>
						</ul>
						<IconSad width="80" height="64"/>
					</S.Emotion>
				</S.Grade> */}
				<S.PartnerValue>
					<li className={handleLevelText(professional)}>전문성 {handleLevelText(professional)}</li>
					<li className={handleLevelText(kind)}>친절도 {handleLevelText(kind)}</li>
					<li className={handleLevelText(price)}>가성비 {handleLevelText(price)}</li>
				</S.PartnerValue>
				<S.Review>
						<S.ReviewText>{memoText(memo)}</S.ReviewText>
						{(memo.length >= 45 || isMobile) && (
							<>
								{more ? (
									<S.MoreReview onClick={handleMore}>
										접기
										<UpArrow width="16" height="16" />
									</S.MoreReview>
								) : (
									<S.MoreReview onClick={handleMore}>
										더보기
										<DownArrow width="16" height="16" />
									</S.MoreReview>
								)}
							</>
						)}
				</S.Review>
				{reply !== null ? (
					<S.Answer>
						<strong>이사업체 답변</strong>
						<p>{reply}</p>
					</S.Answer>
				) : (
					''
				)}
			</S.Wrap>
		</S.Container>
	)
}

export default Review
