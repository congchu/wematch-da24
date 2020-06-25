import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

const S = {
	Container: Styled.div``,
	Wrap: Styled.div`
		padding:24px;
	`,
	Box: Styled.div`
		padding:14px 16px 10px;
		border-radius: 8px;
		background-color:#f5f7f9;
		p{
			font-size:12px;
			color:${colors.gray66};
			line-height:20px;
			letter-spacing:-0.5px;
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
	`,
	LevelImg: Styled.div`
		float:left;
		width:35%;
		margin-top:5px;
		img{
			display:block;
			margin:0 auto;
			width:72px;
		}
		span{
			display:block;
			margin-top:11px;
			font-size:14px;
			font-weight:700;
			color:${colors.pointBlue};
			text-align:center;
		}
	`,
	SkillGraph: Styled.ul`
		float:left;
		width:60%;
		margin-left:5%;
	`,
	SkillList: Styled.li`
		overflow:hidden;
		margin-bottom:13px;
		strong{
			float:left;
			width:30%;
			font-size:14px;
			font-weight:400;
		}
		em{
			margin-left:6px;
			color:${colors.pointBlue};
		}
		p{
			font-size:12px;
			color:${colors.gray88};
		}
	`,
	Graph: Styled.div`
		overflow:hidden;
		position:relative;
		float:left;
		width:70%;
		height:8px;
		margin-top:4px;
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
			position: absolute;
			top: 0;
			right: 0;
			width: 8px;
			height: 8px;
			border-radius: 8px;
			background-color: #1674f7;
		}
	`,

}

const levelData = () => {
	return (
		<S.Container>
			<S.Wrap>
				<S.Box>
					<p>고객들의 업체 평가는 위매치 약관에 의해 보호 받는 저작물로서, 무단복제 및 배포를 금합니다.</p>
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
							<S.SkillList><p>위매치 빅데이터를 분석한 결과입니다</p></S.SkillList>
						</S.SkillGraph>
					</S.WrapGraph>
				</S.Average>
			</S.Wrap>
		</S.Container>
	)
}

export default levelData
