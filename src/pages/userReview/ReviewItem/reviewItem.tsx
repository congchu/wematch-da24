import React from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

import PrevIcon from 'components/wematch-ui/Icon/generated/Previous'
import Enter from 'components/Icon/generated/Enter'

import {Grade} from 'types/partner'
import * as colors from 'styles/colors'

const S = {
    Container: styled.div`
      padding: 30px 24px;
      border-bottom: 1px solid ${colors.lineDeco};
      

      @media screen and (min-width: 768px){
        width: 608px;
        margin: 0 auto;
        padding: 30px 0;
      }
      
      @media screen and (min-width: 1200px) {
        width: 720px;
        margin: 0 auto;
        padding: 30px 0;
      }
    `,

    PartnerName:styled.div`
      display: block;
      position: relative;
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.8px;
      cursor: pointer;
      @media screen and (min-width: 768px){
        padding-bottom: 18px;
      }

      svg {
        position: absolute;
        transform: rotate(-0.5turn);
        top: 0;
        right: 0;
        width: 12px;
        height: 16px;
        background-position: 0 -379px;
        -webkit-background-size: 22px 570px;
        background-size: 22px 570px;
      }
      
    `,
    Grade: styled.div`
      display: inline-block;
      position: relative;
      margin-top: 8px;
      width: 100%;
      @media screen and (min-width: 768px){
        overflow: hidden;
        position: relative;
        padding: 13px 0 9px;
        margin-right: 10px;
        margin-top: 0px;
      }
    `,
    StarDiv: styled.div`
      display: block;
      margin-top: 8px;
      @media screen and (min-width: 768px){
        display: inline-block;
        margin-top: 0px;
      }
    `,
    Reviewer: styled.div`
        display: inline-block;
        position: absolute;
        top: 2px;
        right: 0;
        font-size: 14px;
        color: ${colors.gray66};
        @media screen and (min-width: 768px){
          top: 14px
        }
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
    StarContainer: styled.div`
        display: inline-block;
        p {
          font-size: inherit;
          display: inline-block;
        }
      @media screen and (max-width: 356px){
        overflow: hidden;
      }
    `,
    StarFill: styled.span<{star: number}>`
        margin: 0 8px 0 6px;
		display: inline-block;
    	position:relative;
    	z-index:5;
		width:80px;
    	height:16px;
		vertical-align:middle;
		background:url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/star.svg) no-repeat 0 0;
		.fill{
			display:block;
			width: ${props => props.star && props.star*20}%;
			height:16px;
			background:url(https://marketdesigners-asset.s3.ap-northeast-2.amazonaws.com/images/icon/starfill.svg) no-repeat 0 0;
		}
        //별사이즈/디자 바뀌면 바꾸기
        @media screen and (max-width: 446px){
          display: block;
          margin: 2px 16px 0 0;
        }
	`,
    Emotion: styled.div`
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
    Review: styled.div`
      padding-top: 11px;
      font-size: 15px;
      font-weight: 400;
      color: ${colors.gray33};
      letter-spacing: -0.8px;
      float: none;
      width: 100%;
      line-height: 20px;
      clear: both;
      pre {
        white-space: pre-wrap;
      }
      
    `,
    Reply: styled.div`
      display: block;
      position: relative;
      padding-top: 10px;
      padding-left: 10px;
      font-size: 14px;
      line-height: 16px;
      strong {
        display: block;
        font-size: 15px;
        line-height: 26px;
        svg {
          margin-left: -4px;
          margin-right: 4px;
          display: inline-block;
          overflow: hidden;
          font-size: 1px;
          line-height: 1px;
          text-indent: -9999px;
          background-repeat: no-repeat;
          vertical-align: top;
          color: transparent;
        }
      }
      pre {
        white-space: pre-wrap;
      }
      
    `
}

interface Props {
    adminid: string; //partner 업체 id
    partnerName: string; //
    userId: number;
    created_at: string;
    star: number; // 종합평
    price: Grade;
    kind: Grade;
    professional: Grade;
    reviewContents: string | React.ReactNode | null;
    reply?: string | React.ReactNode | null;
}



export default function ReviewItem({ adminid,partnerName, userId, created_at, star, professional, kind, price, reviewContents, reply }: Props) {

    const history = useHistory()

    /* 임시 :  API response 에서 star (100점만점) 가져와서 계산 => 추후, 해당 api 맞춰 확인필요 */
    const convertStarToGrade = (star: number) => {
        const starAvg = star / 20 ; //100점만점
        if(starAvg > 4) return "최고"
        else if (starAvg > 3) return "매우좋음"
        else if (starAvg > 2) return "양호"
        else if (starAvg > 1) return  "미흡"
        else return "평판나쁨"
    }

    const getColorForGrade = (star: number) => {
        const starAvg = star / 20 ; //100점만점
        if(starAvg > 4) return "1672f7"
        else if (starAvg > 3) return "00b6ed"
        else if (starAvg > 2) return "ffae2c"
        else if (starAvg > 1) return  "fa6e3c"
        else return "fa3c3c"
    }

    // Grade = 'verygood' | 'good' | 'normal' | 'bad' | 'verybad';
    /* 임시 :  API response 에서 Grade 기준으로 => 추후, 해당 api 맞춰 확인필요 */
    const convertGradeToStar = (grade: Grade) => {
        if( grade === 'verygood') return 5
        else if (grade === 'good') return 4
        else if (grade === 'normal') return 3
        else if (grade === 'bad') return 2
        else if (grade === 'verybad') return 1
        else return 0
    }

    const dateCutter = ( longDate: string) => {
        let onlyDate = longDate.split('T')
        let dateArr = onlyDate[0].split('-')
        let year =  dateArr[0].substring(2,4)
        return year + '.' + dateArr[1] + '.' + dateArr[2]
    }

    return (
        <S.Container>
            <S.PartnerName onClick={() => history.push(`/requests/completed/${adminid}`)}>
                {partnerName}
                <PrevIcon size={16} />
            </S.PartnerName>
            <S.Grade>
                <S.OverallGrade gradeColor={getColorForGrade(star)}>종합평<span>{convertStarToGrade(star)}</span></S.OverallGrade>
                <S.StarDiv>
                    <S.StarContainer>
                        <p>가격도</p>
                        <S.StarFill star={convertGradeToStar(price)}>
                            <span className="fill"></span>
                        </S.StarFill>
                    </S.StarContainer>
                    <S.StarContainer>
                        <p>친절도</p>
                        <S.StarFill star={convertGradeToStar(kind)}>
                            <span className="fill"></span>
                        </S.StarFill>
                    </S.StarContainer>
                    <S.StarContainer>
                        <p>전문성</p>
                        <S.StarFill star={convertGradeToStar(professional)}>
                            <span className="fill"></span>
                        </S.StarFill>
                    </S.StarContainer>
                </S.StarDiv>
                <S.Reviewer><p>{userId}님 | {dateCutter(created_at)}</p></S.Reviewer>
            </S.Grade>
            <S.Review><pre>{reviewContents}</pre></S.Review>
            {reply && (
                <S.Reply>
                    <strong><Enter width={16}/>이사업체 답변</strong>
                    <pre>{reply}</pre>
                </S.Reply>
            )}
        </S.Container>
    )

}