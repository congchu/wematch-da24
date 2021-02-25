import React from 'react'
import styled from 'styled-components'

import Layout from 'components/base/Layout'
import ReviewItem from './ReviewItem/reviewItem'

const S = {
    Container: styled.div`
        margin-top: 0px;
        @media screen and (min-width: 1200px){
          margin-top: -30px;
        }
    `,
    Title: styled.div`
      display: block;
      padding: 40px 24px 9px;
      font-size: 22px;
      font-weight: 400;
      color: #333;
      line-height: 1.36;
      letter-spacing: -1px;
      em{
        font-weight: 600;
      }
      @media screen and (min-width: 768px){
        padding-left: 0;
      }
      @media screen and (min-width: 1200px){
        display: none;
        margin-left: -496px;
        font-weight: bold;
        font-size: 24px;
        line-height: 36px;
      }
    `,
}

/*
* FEB 2020
* api 생성이후 다음내용 적용필요
*   1. infinite scroll 적용
*   2. props 확인/수정 및 ReviewItem 반영
* */

export default function UserReviewPage() {

    return (
        <Layout title='이용자 평가 현황' subTitle={<>실제 이용한 고객의<br/>업체평가입니다</>}>
            <S.Container>
                <S.Title><em>실제 이용한 고객</em>의<br/>업체평가입니다</S.Title>
                <ReviewItem adminid={'a4014'}
                            partnerName={"서울특별시강남구 S등급 업체"}
                            userId={"123456"}
                            created_at={"21.01.01"}
                            star={95}
                            price={"good"}
                            kind={"bad"}
                            professional={"good"}
                            reviewContents={"다른곳보다 견적이 20-25 정도 높아 꼼꼼할 줄 알고 진행했는데.. 캣타워 다리 부러지고, 티비장 문 부쉬고 커튼은 반대로 설치해주시고.. 가구 파손된건 고지도 안해줘서 가고나서 혼자 정리하다 알았네요;\n" +
                            "\n" +
                            "그냥 빠르지만 대충하는 느낌입니다."}
                            reply={"안녕하세요 무빙익스프레스 담당자 이상철 입니다 고객님의 평가에 감사 드립니다\n" +
                            "\n" +
                            "부족한 부분이 있으셨나보네요 앞으로 더 좋은 평가를 받을수 있도록 더 노력하겠습니다\n" +
                            "\n" +
                            "즐거운 명절 보내시고 항상 건강 주의하시구요\n" +
                            "\n" +
                            "고객님께 좋은일들과 행복 가득한 일들만 넘쳐나시길 기원합니다\n" +
                            "\n" +
                            "무빙익스프레스 담당자"}/>
                <ReviewItem adminid={'a4014'}
                            partnerName={"서울특별시강남구 A등급 업체"}
                            userId={"123456"}
                            created_at={"21.01.01"}
                            star={65}
                            price={"verygood"}
                            kind={"bad"}
                            professional={"verybad"}
                            reviewContents={"다른곳보다 견적이 20-25 정도 높아 꼼꼼할 줄 알고 진행했는데.. 캣타워 다리 부러지고, 티비장 문 부쉬고 커튼은 반대로 설치해주시고.. 가구 파손된건 고지도 안해줘서 가고나서 혼자 정리하다 알았네요;\n" +
                            "\n" +
                            "그냥 빠르지만 대충하는 느낌입니다."}
                            reply={"안녕하세요 무빙익스프레스 담당자 이상철 입니다 고객님의 평가에 감사 드립니다\n" +
                            "\n" +
                            "부족한 부분이 있으셨나보네요 앞으로 더 좋은 평가를 받을수 있도록 더 노력하겠습니다\n" +
                            "\n" +
                            "즐거운 명절 보내시고 항상 건강 주의하시구요\n" +
                            "\n" +
                            "고객님께 좋은일들과 행복 가득한 일들만 넘쳐나시길 기원합니다\n" +
                            "\n" +
                            "무빙익스프레스 담당자"}/>
                <ReviewItem adminid={'a4014'}
                            partnerName={"서울특별시강남구 B등급 업체"}
                            userId={"123456"}
                            created_at={"21.01.01"}
                            star={45}
                            price={"verygood"}
                            kind={"bad"}
                            professional={"verybad"}
                            reviewContents={"다른곳보다 견적이 20-25 정도 높아 꼼꼼할 줄 알고 진행했는데.. 캣타워 다리 부러지고, 티비장 문 부쉬고 커튼은 반대로 설치해주시고.. 가구 파손된건 고지도 안해줘서 가고나서 혼자 정리하다 알았네요;\n" +
                            "\n" +
                            "그냥 빠르지만 대충하는 느낌입니다."}
                            reply={"안녕하세요 무빙익스프레스 담당자 이상철 입니다 고객님의 평가에 감사 드립니다\n" +
                            "\n" +
                            "부족한 부분이 있으셨나보네요 앞으로 더 좋은 평가를 받을수 있도록 더 노력하겠습니다\n" +
                            "\n" +
                            "즐거운 명절 보내시고 항상 건강 주의하시구요\n" +
                            "\n" +
                            "고객님께 좋은일들과 행복 가득한 일들만 넘쳐나시길 기원합니다\n" +
                            "\n" +
                            "무빙익스프레스 담당자"}/>
                <ReviewItem adminid={'a4014'}
                            partnerName={"서울특별시강남구 C등급 업체"}
                            userId={"123456"}
                            created_at={"21.01.01"}
                            star={25}
                            price={"verygood"}
                            kind={"bad"}
                            professional={"verybad"}
                            reviewContents={"다른곳보다 견적이 20-25 정도 높아 꼼꼼할 줄 알고 진행했는데.. 캣타워 다리 부러지고, 티비장 문 부쉬고 커튼은 반대로 설치해주시고.. 가구 파손된건 고지도 안해줘서 가고나서 혼자 정리하다 알았네요;\n" +
                            "\n" +
                            "그냥 빠르지만 대충하는 느낌입니다."}
                            reply={"안녕하세요 무빙익스프레스 담당자 이상철 입니다 고객님의 평가에 감사 드립니다\n" +
                            "\n" +
                            "부족한 부분이 있으셨나보네요 앞으로 더 좋은 평가를 받을수 있도록 더 노력하겠습니다\n" +
                            "\n" +
                            "즐거운 명절 보내시고 항상 건강 주의하시구요\n" +
                            "\n" +
                            "고객님께 좋은일들과 행복 가득한 일들만 넘쳐나시길 기원합니다\n" +
                            "\n" +
                            "무빙익스프레스 담당자"}/>
                <ReviewItem adminid={'a4014'}
                            partnerName={"서울특별시강남구 D등급 업체"}
                            userId={"123456"}
                            created_at={"21.01.01"}
                            star={15}
                            price={"verygood"}
                            kind={"bad"}
                            professional={"verybad"}
                            reviewContents={"가격, 친절, 서비스 모두 만족했어요~\r\n\r\n사장님이 좀 어려 보이는 분이셔서반신반의 했었는데,\r\n전문성 있게 잘 해주셨고 무엇보다 인상 한번 쓰지 않고 마무리 작업까지 끝까지 해주셨어요~\r\n적극추천해요!"}
                            reply={"안녕하세요 무빙익스프레스 담당자 이상철 입니다 고객님의 평가에 감사 드립니다\n" +
                            "\n" +
                            "부족한 부분이 있으셨나보네요 앞으로 더 좋은 평가를 받을수 있도록 더 노력하겠습니다\n" +
                            "\n" +
                            "즐거운 명절 보내시고 항상 건강 주의하시구요\n" +
                            "\n" +
                            "고객님께 좋은일들과 행복 가득한 일들만 넘쳐나시길 기원합니다\n" +
                            "\n" +
                            "무빙익스프레스 담당자"}/>

            </S.Container>
        </Layout>
    )

}