import React, { } from 'react'
import styled from 'styled-components'
import {gray33, gray66, lineDeco, lineDefault} from "styles/colors";

const S = {
    Card: styled.div`
      width: 312px;
      height: 210px;
      border: 1px solid ${lineDeco};
      box-sizing: border-box;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    `,
    Container: styled.div`
      margin: 20px;
      display: block;
    `,
    FirstLine: styled.div`
      display: inline-block;
      font-size: 15px;
      //margin-bottom: 16px;
    `,
    PartnerName:styled.div`
      display: inline-block;
      padding-bottom: 10px;
      font-weight: 700;
      line-height: 22px;
      //letter-spacing: -0.03em;
    `,
    OverallGrade: styled.div<{gradeColor: string}>`
      display: inline-block;
      span{
        margin: -1px 8px 0;
        width: 46px;
        height: 18px;
        display: inline-block;
        color: #${props => props.gradeColor};
        //float: left;
        border-radius: 20px;
        border: 1.2px solid #${props => props.gradeColor};
        padding: 1px;
        font-weight: 600;
        font-size: 10px;
        line-height: 20px;
        text-align: center;
      }
    `,
    StarDiv: styled.div`
      display: inline-block;
      font-size: 12px;
    `,
    StarContainer: styled.div`
        display: inline-block;
        p {
          //font-size: inherit;
          display: inline-block;
        }
      @media screen and (max-width: 356px){
        overflow: hidden;
      }
    `,
    StarFill: styled.span<{star: number}>`
        margin: 0 6px 0 4px;
		display: inline-block;
    	z-index:5;
		width:58px;
    	height:10px;
		background:url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/star.svg) no-repeat 0 0;
        background-size: 58px;
		.fill{
			display:block;
			width: ${props => props.star && props.star*15}%;
			height:10px;
			background:url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/starfill.svg) no-repeat 0 0;
            background-size: 58px;
		}
        
	`,
    Contents: styled.div`
      margin: 20px auto ;
      font-size: 15px;
    `,
    LastLine: styled.div`
      display: inline-block;
      font-size: 14px;
      color: ${gray66};
    `



}
interface Props {
    partnerName: string; //업체명
    userId: number; // 고객번호 (-님)
    created_at: string; // 게시일
    grade: '최고' | '매우 만족' | string; // 종합평
    price: number //가격
    kind: number; //친절
    professional: number; //전문
    reviewContents: string;
}
//업체명	등급	가격	친절	전문	내용	고객번호 (-님)	게시일
const ReviewCard = ({partnerName, userId, created_at, grade, price, kind, professional, reviewContents}: Props) => {
    const gradeBadge = (grade: string) => {
        if(grade === '최고' ) return "1672f7"
        else if (grade === '매우 만족') return "00b6ed"
        // else if (starAvg > 2) return "ffae2c"
        // else if (starAvg > 1) return  "fa6e3c"
        else return "fa3c3c"
    }
    return(
        <S.Card>
            <S.Container>
                <S.FirstLine>
                    <S.PartnerName>{partnerName}</S.PartnerName>
                    <S.OverallGrade gradeColor={gradeBadge(grade)}><span>{grade}</span></S.OverallGrade>
                </S.FirstLine>
                <S.StarDiv>
                    <S.StarContainer>
                        <p>가격</p>
                        <S.StarFill star={price}>
                            <span className="fill"></span>
                        </S.StarFill>
                    </S.StarContainer>
                    <S.StarContainer>
                        <p>친절</p>
                        <S.StarFill star={kind}>
                            <span className="fill"></span>
                        </S.StarFill>
                    </S.StarContainer>
                    <S.StarContainer>
                        <p>전문</p>
                        <S.StarFill star={professional}>
                            <span className="fill"></span>
                        </S.StarFill>
                    </S.StarContainer>
                </S.StarDiv>
                <S.Contents>{reviewContents}</S.Contents>
                <S.LastLine>{userId}님  | {created_at} </S.LastLine>
            </S.Container>
        </S.Card>
    )
}

export default ReviewCard