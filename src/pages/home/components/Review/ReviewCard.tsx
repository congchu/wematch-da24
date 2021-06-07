import React from 'react'
import styled from 'styled-components'
import { gray66, lineDeco } from 'styles/colors'

const S = {
    Card: styled.div`
      margin-left: 13px;
      width: 312px;
      height: 234px;
      border: 1px solid ${lineDeco};
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      user-select: none;
      cursor: pointer;
    `,
    Container: styled.div`
      margin: 20px 18px;
      display: block;
    `,
    FirstLine: styled.div`
      display: flex;
      font-size: 15px;
    `,
    PartnerName: styled.div`
      display: flex;
      padding-bottom: 10px;
      font-weight: 700;
      line-height: 22px;
      align-items: center;
    `,
    PartnerArea: styled.div`
      display: inline-block;
      padding-bottom: 10px;
      font-weight: 700;
      line-height: 22px;
      margin-right: 4px;
    `,
    OverallGrade: styled.div<{gradeColor: string}>`
      display: inline-block;
      span{
        margin: -1px 8px 0;
        width: 46px;
        height: 18px;
        display: inline-block;
        color: ${props => props.gradeColor};
        border-radius: 20px;
        border: 1.2px solid ${props => props.gradeColor};
        padding: 1px;
        font-weight: 600;
        font-size: 10px;
        line-height: 20px;
        text-align: center;
      }
    `,
    Blur: styled.div`
      width: 78px;
      height: 16px;
      border-radius: 34px;
      background-color: ${lineDeco};
    `,
    StarDiv: styled.div`
      display: inline-block;
    `,
    StarContainer: styled.div`
        font-size: 13px;
        display: inline-block;
        margin-right: 8px;
        p {
          display: inline-block;
          margin-right: 2px;
        }
        span {
          color: #0070FF;
        }
      @media screen and (max-width: 356px){
        overflow: hidden;
      }
    `,
    StarFill: styled.span<{star: number}>`
		display: block;
		margin-top: 10px;
		margin-bottom: 5px;
    	z-index: 5;
		width: 80px;
    	height: 16px;
		background: url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/star.svg) no-repeat 0 0;
        background-size: 80px;
		.fill{
			display: block;
			width: ${props => props.star && props.star * 20}%;
			height:16px;
			background: url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/starfill.svg) no-repeat 0 0;
            background-size: 80px;
		}
	`,
    Contents: styled.div`
      margin: 15px auto;
      font-size: 15px;
      letter-spacing: -1px;
    `,
    LastLine: styled.div`
      display: inline-block;
      font-size: 14px;
      color: ${gray66};
      span {
        color: #C4C4C4;
        margin: 0 5px;
      }
    `
}

interface Props {
    partnerName: string; //업체명
    userId: number; // 고객번호 (-님)
    created_at: string; // 게시일
    grade: '최고' | '매우 만족' | string; // 종합평
    price: string //가격
    kind: string; //친절
    professional: string; //전문
    reviewContents: string;
    partnerArea: string;
}

const ReviewCard = ({partnerName, userId, created_at, grade, price, kind, professional, reviewContents, partnerArea}: Props) => {

    return(
        <S.Card>
            <S.Container>
                <S.FirstLine>
                    <S.PartnerArea>{partnerArea}</S.PartnerArea>
                    <S.PartnerName>
                        {partnerName.charAt(0)}
                        <S.Blur/>
                        {partnerName.charAt(partnerName.length -1)}
                    </S.PartnerName>
                    {/*<S.OverallGrade gradeColor={gradeBadge(grade)}><span>{grade}</span></S.OverallGrade>*/}
                </S.FirstLine>
                <S.StarFill star={5}>
                    <span className="fill"/>
                </S.StarFill>
                <S.StarDiv>
                    <S.StarContainer>
                        <p>전문성</p>
                        <span>{professional}</span>
                    </S.StarContainer>
                    <S.StarContainer>
                        <p>친절도</p>
                        <span>{kind}</span>
                    </S.StarContainer>
                    <S.StarContainer>
                        <p>가격도</p>
                        <span>{price}</span>
                    </S.StarContainer>
                </S.StarDiv>
                <S.Contents>{reviewContents}</S.Contents>
                <S.LastLine>{userId}님<span>|</span>{created_at}</S.LastLine>
            </S.Container>
        </S.Card>
    )
}

export default ReviewCard
