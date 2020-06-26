import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

import { IconSad, NextArrow } from '../../../components/Icon'

const S = {
	Container: Styled.div`
		padding:0 24px;
	`,
	UserInfo: Styled.div`
		/* overflow:hidden; */
		margin-top:6px;
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
		.levetText{
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
		background:url(http://doorfit.co.kr/doorfit_img/01_img/review/star0.png) no-repeat 0 0;
		.fill{
			display:block;
			width:80%;
			height:16px;
			background:url(http://doorfit.co.kr/doorfit_img/01_img/review/star5.png) no-repeat 0 0;
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
	Review: Styled.div`

	`,
	ReviewText: Styled.p`
		display: -webkit-box;
    overflow: hidden;
    width: 100%;
    margin-top: 10px;
		font-size: 15px;
    font-weight: 500;
    line-height: 24px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
	`,
}

const Review = () => {
	return (
		<S.Container>
			<S.UserInfo>
				<strong>고객번호 23577</strong>
				<span>27일전 이사</span>
			</S.UserInfo>
			<S.Grade>
				<span className="levetText">최고</span>
				<S.StarFill>
					<span className="fill"></span>
				</S.StarFill>
				<S.Emotion>
					<ul>
						<li>
							전문성 <span>뛰어나요</span>
						</li>
						<li>
							친절도 <span>친절해요</span>
						</li>
						<li>
							가격도 <span>돈이 아깝지 않아요</span>
						</li>
					</ul>
					<IconSad width="80" height="64"/>
				</S.Emotion>
			</S.Grade>
			<S.Review>
				<S.ReviewText>이사한 집에 냉장고 위치가 애매해서 문이 덜 열렸는데, 해결해주시려고 많이 고생하시고 가셨어요. 해결해주시려고 많이 고생하시고 가셨어요. 해결해주시려고 많이 고생하시고 가셨어요.</S.ReviewText>
				<button>
					더보기
					<NextArrow color={colors.gray66} width="8" height="14" />
				</button>
			</S.Review>
		</S.Container>
	)
}

export default Review