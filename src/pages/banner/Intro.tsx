import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import BannerLayout from 'components/da24/v2/layout/BannerLayout'

import * as colors from 'styles/colors'

const S = {
    Container: styled.div`
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: -0.03em;
      color: ${colors.gray33};
      margin-bottom: 56px;
      
      img {
        width: calc(100% - 48px);
        margin-left: 24px;
        margin-right: 24px;
      }
      
      h2, h3 {
        margin: 0 24px;
      }
      
      h2 {
        font-size: 22px;
        line-height: 33px;
        letter-spacing: -0.03em;
        color: ${colors.gray33};
      }
      
      .bold {
        font-weight: bold;  
      }
      
      .point {
        color: ${colors.pointBlue};
      }
      
      p {
        margin: 0 24px;
      }
    `
}

export default function Intro() {
    const history = useHistory()

    return (
        <BannerLayout title="이사업체 잘 고르는 공식, 위매치" onBack={() => history.goBack()}>
            <S.Container>
                <img src={require('assets/images/banner/intro_01.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" style={{ width: '100%', marginLeft: 0, marginRight: 0, marginBottom: 30 }} />
                <p>
                    부동산이나 커뮤니티에서 추천 받아서, <br />
                    칭찬일색의 블로그 후기보고 <br />
                    이사업체 선택했다가 <br />
                    아끼는 가구가 망가지거나 추가요금에 <br />
                    당황한 기억있으신가요? <br />
                    <br />
                    아무 기준 없이 <br />
                    큰 돈, 소중한 짐을 맡겨야 하는 <br />
                    깜깜이 이사는 이제 <b className="bold">NO!</b> <br />
                    <br />
                    <b className="bold">허위광고, 가짜후기</b>에 속지 않고 <br />
                    진짜 잘하는 이사업체를 <br />
                    단 1분만에 찾는 꿀팁! <br />
                </p>
                <img src={require('assets/images/banner/intro_02.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" style={{ marginTop: 40, marginBottom: 8 }} />
                <p>
                    <em className="point bold">유명 프랜차이즈가 최고?</em> <br />
                    <em className="point bold">업체 이름만 믿었다가는 낭패보기 십상!</em> <br />
                    같은 상호를 사용하는 이사업체라도 지점마다 서비스와 비용 수준이 다르기 때문에 이사업체의 이미지만 보는 게 아니라 내가 직접 이용할 업체를 조사하는 과정은 필수입니다.
                </p>
                <img src={require('assets/images/banner/intro_03.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" style={{ marginTop: 50, marginBottom: 23 }} />
                <p>
                    <em className="point bold">광고 아닌척 하는 가짜후기 말고 진짜 정보를 찾자!</em> <br />
                    어딜봐도 넘쳐나는 광고, 허위후기들이 <br />
                    업체 선택에 가장 큰 걸림돌이셨죠? <br />
                    나쁘면 나쁘다 솔직한 평가를 찾아보세요. <br />
                    진짜 정보라면 아쉬운 점도 당연히 포함되어 있어야 하지 않을까요? <br />
                </p>
                <img src={require('assets/images/banner/intro_04.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" style={{ marginTop: 50, marginBottom: 18 }} />
                <p>
                    <em className="point bold">여러 업체 비교는 필수!</em>
                    바빠서, 혹은 대충 다 비슷할 거란 생각에
                    업체간 비교 없이 선택하면 후회하기 십상입니다.

                    이사 전, 여러 개의 업체의 방문견적을 통해 가격, 서비스, 전문성 등을 비교해야 후회 없는 인생이사를 할 수 있답니다.
                </p>
                <img src={require('assets/images/banner/intro_05.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" style={{ marginTop: 50, marginBottom: 41 }} />
                <h2 className="bold" style={{ marginBottom: 20 }}>잘 찾아오셨어요! 위매치입니다.</h2>
                <h3 className="bold">1. 500만 명이 선택한 이사업체 평가등급 시스템!</h3>
                <p>
                    위매치다이사는 실제 이사한 고객들의 <br />
                    평가를 수집해서 2,000여개 이사업체에게 <br />
                    S부터 D까지 객관적인 등급을 부여합니다. <br />
                    <br />
                    광고나 유명세가 아닌 나에게 꼭 맞는, <br />
                    진짜 이사 잘하는 업체를 알 수 있어요. <br />
                    <br />
                    S등급의 <em className="point">이사 만족도는 약 90%!</em> <br />
                    10번 중 9번은 매우 만족스러운 서비스를 <br />
                    경험할 수 있다는 의미랍니다. <br />
                </p>
                <img src={require('assets/images/banner/intro_06.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" style={{ marginTop: 24, marginBottom: 63 }} />
                <h3 className="bold">2. 여러 업체에 무.료.로 방문견적 신청까지 한 번에!</h3>
                <p>
                    수수료가 있지 않냐고요? NO! <br />
                    위매치다이사의 방문견적 신청은 무료입니다. <br />
                    부담없이 여러 업체를 비교해보실 수 있어요. <br />
                </p>
                <img src={require('assets/images/banner/intro_07.png')} alt="위매치,포장이사,이사짐센터,이삿짐센터,포장이사견적비교,이사견적,포장이사비용,보관이사,원룸이사,사다리차,이삿짐보관,가정이사,포장이사업체,이사견적비교사이트,소형이사,S등급" style={{ width: '100%', marginLeft: 0, marginRight: 0, marginTop: 11, marginBottom: 37 }} />
                <h3 className="bold">3. 단 1분만에 나만의 이삿짐센터 후보 확인!</h3>
                <p style={{ marginBottom: 125 }}>
                    <br />
                    클릭 몇 번으로 내 조건에 맞는 <br />
                    맞춤형 이사업체 실시간 매칭! <br />
                    <br />
                    게다가 실제 이용자들의 솔직하고 가감없는 <br />
                    평가를 꼼꼼히 읽어보고 선택할 수 있으니까! <br />
                    복잡하고 불안한 이사업체 찾기가 <br />
                    정말 쉬워지고 안심할 수 있습니다. <br />
                </p>
            </S.Container>
        </BannerLayout>
    )
}
