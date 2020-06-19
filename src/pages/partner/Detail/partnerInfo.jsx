import React from 'react'
import Styled from 'styled-components'

import * as colors from '../../../styles/colors'

const S = {
	Container: Styled.div`
		position:absolute;
		top:272px;
		border-top-left-radius:10px;
		border-top-right-radius:10px;
		background:${colors.white};
	`,
	Wrap: Styled.div`
		padding:25px 24px;
		letter-spacing:-0.5px;
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
    display: -webkit-box;
    overflow: hidden;
    width: 312px;
    margin-top: 10px;
		font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
	`,
	Info: Styled.div`
		margin-top:26px;
		font-size:16px;
		color:${colors.pointBlue};
		span{
			margin-right:18px;
		}
		span:last-child{
			margin-right:0;
		}
	`,
	Description: Styled.div`
	
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
					<span>고객선택 </span>
					<span>평가 </span>
					<span>경력 년</span>
				</S.Info>
				<S.Description>
					<p>사장님 한마디(업체명)</p>
					<p>설문조사에 수집된 내용 그대로 모두 노출 제한글자 없음 모두 노출 제한글자 없음모두 노출 제한글자 없음모두 노출 제한글자 없음</p>
				</S.Description>
			</S.Wrap>
		</S.Container>
	)
}

export default PartnerInfo