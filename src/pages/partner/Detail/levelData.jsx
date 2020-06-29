import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

import { Question } from '../../../components/Icon'

const S = {
	Container: Styled.div`
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-left:272px;
		}
	`,
	Wrap: Styled.div`
		padding:24px;
		@media screen and (min-width:768px) {
			width:608px;
			margin:0 auto;
			padding:24px 0;
		}
		@media screen and (min-width:1200px) {
			width:656px;
		}
	`,
	Box: Styled.div`
		padding:14px 16px 10px;
		border-radius:8px;
		background-color:${colors.boxBg};
		p{
			font-size:12px;
			color:${colors.gray66};
			line-height:20px;
			letter-spacing:-0.5px;
		}
		span{
			text-decoration:underline;
			cursor:pointer;
		}
	`,
	Average: Styled.div`
		margin-top:45px;
		strong{
			font-size:16px;
			font-weight:700;
		}
	`,
	WrapGraph: Styled.div`
		overflow:hidden;
		margin-top:28px;
		@media screen and (min-width:768px) {
			margin-top:19px;
		}
	`,
	LevelImg: Styled.div`
		float:left;
		width:35%;
		margin-top:5px;
		img{
			display:block;
			margin:0 auto;
			width:72px;
			@media screen and (min-width:768px) {
				width:140px;
				margin:0 0 0 auto;
			}
		}
		span{
			display:block;
			margin-top:11px;
			font-size:14px;
			font-weight:700;
			color:${colors.pointBlue};
			text-align:center;
			@media screen and (min-width:768px) {
				margin:15px 0 0 63px;
    		font-size:18px;
			}
		}
		@media screen and (min-width:768px) {
			width:33%;
		}
		@media screen and (min-width:1200px) {
			width:34%;
		}
	`,
	SkillGraph: Styled.ul`
		float:left;
		width:60%;
		margin-left:5%;
		li:last-child{
			display:inline-block;
			float:right;
			cursor:pointer;
			svg{
				margin-left:6px;
				vertical-align:top;
				@media screen and (min-width:768px) {
					margin:0 7px 0 3px;
				}
			}
			@media screen and (min-width:768px) {
				margin-top:12px;
			}
		}
		@media screen and (min-width:768px) {
			width:50%;
			margin:22px 0 0 50px;
		}
	`,
	SkillList: Styled.li`
		overflow:hidden;
		margin-bottom:13px;
		@media screen and (min-width:768px) {
			margin-bottom:21px;
		}
		strong{
			float:left;
			width:30%;
			font-size:14px;
			font-weight:400;
			@media screen and (min-width:768px) {
				width:27%;
				font-size:18px;
			}
			@media screen and (min-width:1200px) {
				width:24%;
			}
		}
		em{
			margin-left:6px;
			color:${colors.pointBlue};
		}
		p{
			display:inline-block;
			font-size:12px;
			color:${colors.gray88};
			@media screen and (min-width:768px) {
				letter-spacing:-0.5px;
			}
		}
	`,
	Graph: Styled.div`
		overflow:hidden;
		position:relative;
		float:left;
		width:70%;
		height:8px;
		margin-top:6px;
		border-radius:8px;
		background-color:${colors.lineDeco};
		span{
			display:block;
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:8px;
			border-radius:8px;
			background: linear-gradient(to right, #1674f7 0%, #2ea6fc 100%);
		}
		em{
			position:absolute;
			top:0;
			right:0;
			width:8px;
			height:8px;
			border-radius:8px;
			background-color:#1674f7;
		}
		@media screen and (min-width:768px) {
			width:67%;
			margin-top:4px;
		}
	`,

}

const levelData = () => {
	return (
		<S.Container>
			<S.Wrap>
				<S.Box>
					<p>고객들의 업체 평가는 위매치 약관에 의해 보호 받는 저작물로서, 무단복제 및 배포를 금합니다. <span>자세히</span></p>
				</S.Box>
				<S.Average>
					<strong>고객평가 9,999건</strong>
					<S.WrapGraph>
						<S.LevelImg>
							<img src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/level_txt_s.png" alt="levelImage"/>
							<span>최고</span>
						</S.LevelImg>
						<S.SkillGraph>
							<S.SkillList>
								<strong>전문성 <em>S</em></strong>
								<S.Graph>
									<span><em></em></span>
								</S.Graph>
							</S.SkillList>
							<S.SkillList>
								<strong>친절도 <em>S</em></strong>
								<S.Graph>
									<span><em></em></span>
								</S.Graph>
							</S.SkillList>
							<S.SkillList>
								<strong>가격도 <em>S</em></strong>
								<S.Graph>
									<span><em></em></span>
								</S.Graph>
							</S.SkillList>
							<S.SkillList>
								<p>위매치 빅데이터를 분석한 결과입니다</p>
								<Question width="16" height="16" />
							</S.SkillList>
						</S.SkillGraph>
					</S.WrapGraph>
				</S.Average>
			</S.Wrap>
		</S.Container>
	)
}

export default levelData
