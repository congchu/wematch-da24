import React, {useState} from 'react'
import styled from 'styled-components'

import * as colors from 'styles/colors'
import * as values from 'constants/values'

import { Question } from 'components/Icon'
import LevelModal from 'components/Modal/LevelModal'
import LevelIcon from 'components/LevelIcon'
import NewPartner from 'components/common/NewPartner'
import { Level } from 'types/partner'
import {useMedia} from "react-use-media";
import { isEmpty } from 'lodash'
import {LevelGradeText} from "../../../lib/levelUtil";

const S = {
	Container: styled.div`
		position:relative;
		margin-top:-16px;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
		background:${colors.white};
		border-bottom:8px solid ${colors.lineDeco};
		@media screen and (min-width:1200px) {
			width:720px;
			margin:0 auto;
			padding-left:272px;
			border-bottom:0;
		}
	`,
	Wrap: styled.div`
		padding:25px 24px;
		letter-spacing:-0.5px;
		@media screen and (min-width:768px) {
			width:608px;
			margin:0 auto;
			padding:41px 0 24px;
		}
		@media screen and (min-width:1200px) {
			width:656px;
			padding-top:38px;
		}
	`,
	LevelDescription: styled.span`
		display:block;
		font-size:14px;
		font-weight:500;
	`,
	Level: styled.strong`
		display:block;
		margin-top:5px;
		font-size:20px;
		font-weight:700;
		color:${colors.pointBlue}
	`,
	PartnerWord: styled.p`
    display:-webkit-box;
    overflow:hidden;
    width:100%;
    margin-top:10px;
		font-size:24px;
    font-weight:700;
    line-height:30px;
    text-overflow:ellipsis;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    word-wrap:break-word;
	`,
	Info: styled.div`
		overflow:visible;
		height:112px;
		margin:35px 0 45px;
		div:first-child{
			cursor:pointer;
		}
		div:last-child{
			margin-right:0;
		}
		@media screen and (min-width:768px) {
			margin:35px 0 48px;
		}
	`,
	Card: styled.div`
		float:left;
		width:32%;
		height:100%;
		margin-right:2%;
		border-radius:8px;
  	box-shadow:0 3px 20px 0 rgba(220, 220, 220, 0.7);
 	 	background-color:${colors.white};
		text-align:center;
		span{
			display:block;
			padding-top:17px;
			color:${colors.gray66};
			font-size:13px;
			svg{
				margin-left:4px;
				vertical-align:top;
			}
		}
		img{
			width:56px;
			padding-top:7px;
		}
		em{
			display:inline-block;
			padding-top:20px;
			color:${colors.black};
			font-size:24px;
			font-weight:700;
		}
		@media screen and (min-width:1200px) {
			width:32.5%;
			margin-right:1%;
		}
	`,
	Description: styled.div`
		div:last-child{
			margin-bottom:-4px;
		}
	`,
	Option: styled.div`
		margin-bottom:44px;
		strong{
			display:block;
			margin-bottom:12px;
			font-size:16px;
			font-weight:700;
		}
		p{
			font-size:16px;
			color:${colors.gray33};
			line-height:24px;
		}
		ul{
			overflow:hidden;
		}
		li{
			float:left;
			margin-right:2%;
			margin-bottom:6px;
			padding:10px 14px 8px;
			border:1px solid ${colors.lineDefault};
			border-radius:20px;
			font-size:16px;
			color:${colors.gray33};
		}
		@media screen and (min-width:768px) {
			margin-bottom:41px;
		}
	`,
	Border: styled.span`
		display:none;
		width:720px;
		border-bottom:8px solid ${colors.lineDeco};
		@media screen and (min-width:1200px) {
			display:block;
		}
	`,
}

interface Props {
	title: string;
	level: Level
	pick_cnt: number;
	experience: number;
	description: string;
	keywords: string[];
	adminname: string;
	addition?: string;
}

const PartnerInfo = ({ title, level, pick_cnt, experience, description='', keywords, adminname, addition='' }: Props) => {
	const [visibleLevelModal, setVisibleLevelModal] = useState(false)
	const isMobile = useMedia({
		maxWidth: 767,
	})

	const toggleVisibleLevel = () => setVisibleLevelModal(!visibleLevelModal)


	return (
		<S.Container>
			<S.Wrap>
				<S.LevelDescription>{LevelGradeText(level)}</S.LevelDescription>
				<S.Level>{level === 'NEW' ? '등급산정중' : `고객평가 ${level}등급`}</S.Level>
				<S.PartnerWord>{title}</S.PartnerWord>
				{level === 'NEW'
					? <NewPartner showQuestionIcon={true}/>
					: <S.Info>
						<S.Card onClick={toggleVisibleLevel} id="dsl_booking_detail_info">
						<span>평가등급
							<Question width={16} height={16} />
						</span>
							<LevelIcon level={level}/>
						</S.Card>
						<S.Card>
							<span>고객선택</span>
							<em>{pick_cnt | 0} 회</em>
						</S.Card>
						<S.Card>
							<span>경력년차</span>
							<em>{experience | 1} 년</em>
						</S.Card>
					</S.Info>
				}
				<S.Description>
					<S.Option>
						<strong>사장님 한마디({adminname})</strong>
						<p>{description.length !== 0 ? description : values.DEFAULT_TEXT}</p>
					</S.Option>
					<S.Option>
						<strong>고객이 많이 언급한 키워드</strong>
							{!isEmpty(keywords) &&
								(
									<ul>
										{keywords.map((list, index) => (
											<li key={index}>{list}</li>
										))}
									</ul>
								)
							}
					</S.Option>
					{addition.length > 0 && (
						<S.Option>
							<strong>추가 가능 옵션</strong>
							<p>{addition}</p>
						</S.Option>
					)}
				</S.Description>
			</S.Wrap>
			<S.Border />
			<LevelModal visible={visibleLevelModal} onClose={toggleVisibleLevel} />
		</S.Container>
	)
}

export default PartnerInfo
