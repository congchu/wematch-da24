import React, { useState } from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

import { Question } from '../../../components/Icon'
import TermsModal from '../../../components/Modal/TermsModal'

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
				margin:15px 0 0 58px;
    		font-size:18px;
			}
			@media screen and (min-width:1200px) {
				margin:15px 0 0 80px;
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
		}
		em{
			position:absolute;
			top:0;
			right:0;
			width:8px;
			height:8px;
			border-radius:8px;
			background-color:${colors.lineDeco};
		}
		.graph_s{
			background:linear-gradient(to right, #1674f7 0%, #2ea6fc 100%);
			em{
				background-color:#1674f7;
			}
		}
		.graph_a{
			background:linear-gradient(to right, #00b6ed 0%, #00dcf7 100%);
			em{
				background-color:#00b6ed;
			}
		}
		.graph_b{
			background:linear-gradient(to right, #ffae2c 0%, #ffd34e 100%);
			em{
				background-color:#ffae2c;
			}
		}
		.graph_c{
			background:linear-gradient(to right, #fa703e 0%, #fda46c 100%);
			em{
				background-color:#fa703e;
			}
		}
		.graph_d{
			background:linear-gradient(to right, #fa3c3c 0%, #fd6f6f 100%);
			em{
				background-color:#fa3c3c;
			}
		}
		.graph_n{
			background:linear-gradient(to right, #6532d2 0%, #9d61eb 100%);
			em{
				background-color:#6532d2;
			}
		}
		@media screen and (min-width:768px) {
			width:67%;
			margin-top:4px;
		}
	`,
	DataText: Styled.p`
		float:right;
		font-size:12px;
		color:${colors.gray88};
		line-height:18px;
		cursor:pointer;
		svg{
			margin-left:6px;
			vertical-align:top;
			@media screen and (min-width:768px) {
				margin:0 7px 0 3px;
			}
		}
		@media screen and (min-width:768px) {
			float: left;
			width: 294px;
			margin-top: 12px;
			margin-left: 50px;
			text-align: right;
		}
		@media screen and (min-width:1200px) {
			margin-left:62px;
		}
	`,

}

const LevelData = ({review_count}) => {
	const [visibleTermsModal, setVisibleTermsModal] = useState(false)

	const toggleVisibleTerms = () => setVisibleTermsModal(!visibleTermsModal)

	return (
		<S.Container>
			<S.Wrap>
				<S.Box>
					<p>고객들의 업체 평가는 위매치 약관에 의해 보호 받는 저작물로서, 무단복제 및 배포를 금합니다. <span onClick={toggleVisibleTerms}>자세히</span></p>
				</S.Box>
				<S.Average>
					<strong>고객평가 {review_count}건</strong>
					<S.WrapGraph>
						<S.LevelImg>
							<img src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/level_txt_s.png" alt="levelImage"/>
							<span>최고</span>
						</S.LevelImg>
						<S.SkillGraph>
							<S.SkillList>
								<strong>전문성 <em>S</em></strong>
								<S.Graph>
									<span className="graph_s"><em></em></span>
								</S.Graph>
							</S.SkillList>
							<S.SkillList>
								<strong>친절도 <em>S</em></strong>
								<S.Graph>
									<span className="graph_b"><em></em></span>
								</S.Graph>
							</S.SkillList>
							<S.SkillList>
								<strong>가격도 <em>S</em></strong>
								<S.Graph>
									<span className="graph_c"><em></em></span>
								</S.Graph>
							</S.SkillList>
						</S.SkillGraph>
						<S.DataText>위매치 빅데이터를 분석한 결과입니다<Question width="16" height="16" /></S.DataText>
					</S.WrapGraph>
				</S.Average>
			</S.Wrap>
			<TermsModal visible={visibleTermsModal} onClose={toggleVisibleTerms} />
		</S.Container>
	)
}

export default LevelData
