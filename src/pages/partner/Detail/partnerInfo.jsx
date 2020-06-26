import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

const S = {
	Container: Styled.div`
		position:relative;
		margin-top:-16px;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
		background:${colors.white};
	`,
	Wrap: Styled.div`
		padding:25px 24px;
		letter-spacing:-0.5px;
		border-bottom:8px solid ${colors.lineDeco};
	`,
	LevelDescription: Styled.span`
		display:block;
		font-size:14px;
	`,
	Level: Styled.strong`
		display:block;
		margin-top:5px;
		font-size:20px;
		color:${colors.pointBlue}
	`,
	PartnerWord: Styled.p`
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
	Info: Styled.div`
		overflow:hidden;
		margin-top:26px;
		font-size:16px;
		color:${colors.pointBlue};
		div:last-child{
			margin-right:0;
		}
	`,
	Card: Styled.div`
		float:left;
		width:32.5%;
		margin-right:1%;
		margin-bottom:40px;
		text-align:center;
		span{
			display:block;
		}
		img{
			width:56px;
		}
	`,
	Description: Styled.div`

	`,
	Option: Styled.div`
		margin-bottom:30px;
		strong{
			display:block;
			margin-bottom:8px;
			font-size:16px;
			font-weight:700;
		}
		p{
			font-size:16px;
			color:${colors.gray88};
		}
		ul{
			overflow:hidden;
		}
		li{
			float:left;
			margin-right:2%;
			padding:10px;
			border:1px solid ${colors.gray88};
			border-radius:20px;
			font-size:16px;
			color:${colors.gray88};
		}
	`,
}

const PartnerInfo = () => {
	return (
		<S.Container>
			<S.Wrap>
				<S.LevelDescription>상위 10% 업체</S.LevelDescription>
				<S.Level>고객평가 S등급</S.Level>
				<S.PartnerWord>내가족 이사처럼 꼼꼼하고 기분좋게~^^ 내가족 이사처럼 꼼꼼하고 기분좋게</S.PartnerWord>
				<S.Info>
					<S.Card>
						<span>평가등급</span>
						<img src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/level_txt_s.png"/>
					</S.Card>
					<S.Card>
						<span>고객선택</span>
						<em>8,991</em>
					</S.Card>
					<S.Card>
						<span>경력년차</span>
						<em>17</em>
					</S.Card>
				</S.Info>
				<S.Description>
					<S.Option>
						<strong>사장님 한마디(업체명)</strong>
						<p>설문조사에 수집된 내용 그대로 모두 노출 제한글자 없음 모두 노출 제한글자 없음모두 노출 제한글자 없음모두 노출 제한글자 없음</p>
					</S.Option>
					<S.Option>
						<strong>고객이 많이 언급한 키워드</strong>
						<ul>
							<li>정성스러운</li>
							<li>합리적인</li>
						</ul>
					</S.Option>
					<S.Option>
						<strong>추가 가능 옵션</strong>
						<p>설문조사에 수집된 내용대로 모두 노출</p>
					</S.Option>
				</S.Description>
			</S.Wrap>
		</S.Container>
	)
}

export default PartnerInfo