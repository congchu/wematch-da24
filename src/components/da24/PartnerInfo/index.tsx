import React, {useState} from 'react'
import styled from 'styled-components'
import {useMedia} from 'react-use-media'

import LevelModal from 'components/Modal/LevelModal'

import * as colors from 'styles/colors'
import * as values from 'constants/values'
import { Level } from 'types/partner'
import {commaInNumbers} from 'lib/numberUtil'
import { isEmpty } from 'lodash'
import NewLevelN from "components/Icon/generated/NewLevelN";
import NewLevelS from "components/Icon/generated/NewLevelS";
import NewLevelOther from "components/Icon/generated/NewLevelOther";
import {useRouter} from "hooks/useRouter";
import {lineDeco} from "styles/colors";
import TermsModal from "../../Modal/TermsModal";

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
	CenterContainer: styled.div`
		position:relative;
		margin-top:-16px;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
		background:${colors.white};
		border-bottom:8px solid ${colors.lineDeco};
		@media screen and (min-width:1200px) {
			width:720px;
			margin:-16px auto 0 auto;
			padding-left:0px;
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
		
		div:first-child {
			display: flex;
			align-items: center;
		}
		div:last-child {
			margin-top: 5px;
			font-size: 12px;
			font-weight: normal;
			color: ${colors.gray88};
		}
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
	NewPartnerInfo: styled.div`
		padding: 16px;
		background-color: ${colors.boxBg};
		border-radius: 8px;
		font-size: 14px;
		margin-bottom: 40px;
		
		p {
			color: ${colors.gray66};
			font-weight: bold;
			margin-bottom: 7px;
		}`,
	Box: styled.div`
		background: #F5F7F9;
		border-radius: 8px;
		padding: 16px;
		font-style: normal;
		letter-spacing: -1px;
		margin-bottom: 40px;
		span {
			display: block;
			font-weight: bold;
			font-size: 13px;
			line-height: 19px;
			color: #666666;
			margin-bottom: 7px;
		}
		p {
			font-weight: normal;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -1px;
			color: #333333;
		}
		@media screen and (max-width: 768px) {
			.hide {
				display: none;
			}
		}`
		,
	Card: styled.div`
		float:left;
		width:32%;
		height:100%;
		margin-right:2%;
		border-radius:8px;
  		box-shadow:0 3px 20px 0 rgba(220, 220, 220, 0.7);
 	 	background-color:${colors.white};
		text-align:center;
		div {
			display: flex;
			height: 100%;
			align-items: center;
			justify-content: center;
		}
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
			p{
				display: inline;
				color:${colors.gray66};
				font-weight: 400;
				font-size: 13px;
				line-height: 19px;
			}
		}
		@media screen and (min-width:1200px) {
			width:32.5%;
			margin-right:1%;
		}
	`,
	Blur: styled.div`
      width: 78px;
      height: 25px;
      border-radius: 34px;
      background-color: ${lineDeco};
      margin: 0 2px;
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
			white-space: pre-line;
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


const PartnerInfo = ({ title, level, pick_cnt, experience, description='', keywords, adminname, addition=''}: Props) => {
	const router = useRouter();
	const [visibleLevelModal, setVisibleLevelModal] = useState(false)
	const isMobile = useMedia({
		maxWidth: 767,
	})

	const pathname = router.location.pathname.split('/')[1];

	const toggleVisibleLevel = () => setVisibleLevelModal(!visibleLevelModal);

	return (
		<>
			<S.Wrap>
				<S.PartnerWord>
					{pathname === 'requests'
						? adminname
						: (
							<>
								<div>
									{adminname.charAt(0)}
									<S.Blur />
								</div>
								<div>업체명은 견적 신청한 업체만 공개됩니다.</div>
							</>
						)
					}
				</S.PartnerWord>
				<S.Info>
					<S.Card id="dsl_booking_detail_info">
						<div>
							{level === "NEW" && <NewLevelN />}
							{level === "S" && <NewLevelS/>}
							{(level !== "NEW" && level !== "S") && <NewLevelOther/>}
						</div>
					</S.Card>
					<S.Card>
						<span>고객선택</span>
						<em>{pick_cnt ? commaInNumbers(pick_cnt): 0}<p> 회</p></em>
					</S.Card>
					<S.Card>
						<span>경력년차</span>
						<em>{experience || 1}<p> 년</p></em>
					</S.Card>
				</S.Info>
				{level === "NEW" && (
					<S.Box>
						<span>위매치 신규 파트너</span>
						<p>최근에 파트너가 된 업체로 의욕적인 서비스를 기대할 수 있습니다.<br className='hide' /> 통계적으로 신규 파트너 업체의 이사 만족도 평가는 우수 등급과 같거나 보다 높습니다.</p>
					</S.Box>
				)}
				<S.Description>
					<S.Option>
						<strong>사장님 한마디</strong>
						<p>{description.length !== 0 ? description : values.DEFAULT_TEXT}</p>
					</S.Option>
					{!isEmpty(keywords) &&
						keywords[0].length > 0 && (
						<S.Option>
							<strong>고객이 많이 언급한 키워드</strong>
							<ul>
								{keywords.map((list, index) => (
									<li key={index}>{list}</li>
								))}
							</ul>
						</S.Option>
					)}
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
		</>
	)
}

export default PartnerInfo
