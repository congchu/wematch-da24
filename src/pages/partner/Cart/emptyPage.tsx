import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import * as colors from 'styles/colors'
import {useMedia} from "react-use-media";

const EmptyWrapper = styled.div`
  padding: 24px;
  background: white;
  height: inherit;
  width: 100%;
  box-sizing: border-box;
`;

const EmptyCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  border: 1px dashed ${colors.pointBlue};
  box-shadow: 0px 4px 10px rgba(22, 114, 247, 0.25);
  border-radius: 8px;
  color: ${colors.pointBlue};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  div {
    margin-left: 7px;
  }
  
  @media screen and (min-width: 1200px) {
    width: 720px;
    margin: 0 auto;
  }
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 21px;
  color: ${colors.gray33};
  margin-top: 16px;
  text-align: left;
  
  @media screen and (min-width: 1200px) {
    text-align: center;
    margin-top: 24px;
  }
`;

const GuideWrapper = styled.div`
  position: absolute;
  padding: inherit;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  bottom: 0;
  left: 0;
  
  @media screen and (min-width: 1200px) {
    position: relative;
    box-sizing: initial;
    width: 720px;
    margin: 0 auto;
    margin-top: 320px;
  }
`;
const Guide = styled.div`
  background-color: ${colors.grayBg};
  padding: 15px;
  box-sizing: border-box;
  border-right: 8px;
  text-align: left;
  
  h1 {
    font-size: 12px;
    line-height: 20px;
    color: ${colors.gray66};
    font-weight: 500;
  }
  
  p {
    font-size: 12px;
    color: ${colors.gray66};
    line-height: 20px;
    margin-top: 15px;
  }
`;
const EmptyPage = () => {
    const history = useHistory();
    const isMobile = useMedia({
        maxWidth: 767,
    })
    const guideText = () => {
      if (isMobile) {
          return [
              <p>
                1. 업체 검증은쉽게, 정확하게!<br/>
                위매치의 소비자평가등급을 확인하세요.<br/>
                실제 고객평가 빅데이터로 정확한 만족도를 확인할 수 있습니다.
              </p>,
              <p>
                2. 1개 말고, 여러 업체 비교!<br/>
                가능하다면 다양한 업체를 3개까지 비교하세요.<br/>
                고객들은 3개의 업체를 비교했을 때 만족도가 가장 높았습니다.
              </p>,
              <p>
                3. NEW등급을 주목!<br/>
                좋은 등급 획득 의욕이 가장 높은 NEW등급을 선택하세요.<br/>
                통계적으로 NEW등급 고객만족 확률은 A등급보다<br/>
                높습니다. (S등급 84%,A등급 73%, NEW등급 74%)
              </p>
          ]
      }

      return [
          <p>
            1. 업체 검증은쉽게, 정확하게!<br/>
            위매치의 소비자평가등급을 확인하세요. 실제 고객평가 빅데이터로 정확한 만족도를 확인할 수 있습니다.
          </p>,
          <p>
            2. 1개 말고, 여러 업체 비교!<br/>
            가능하다면 다양한 업체를 3개까지 비교하세요. 고객들은 3개의 업체를 비교했을 때 만족도가 가장 높았습니다.
        </p>, <p>
            3. NEW등급을 주목!<br/>
            좋은 등급 획득 의욕이 가장 높은 NEW등급을 선택하세요.<br/>
            통계적으로 NEW등급 고객만족 확률은 A등급보다 높습니다. (S등급 84%,A등급 73%, NEW등급 74%)
        </p>]
    }
    return (
        <EmptyWrapper>
            <EmptyCard>
                <img src={require("../../../assets/images/plus.svg")} alt='icon'/>
                <div onClick={() => history.goBack()}>업체 추가하기</div>
            </EmptyCard>
            <Text>방문 견적을 요청할 업체를 골라주세요 (최대 3개)</Text>
            <GuideWrapper>
                <Guide>
                    <h1>이사 고수들의 업체 잘 고르는 팁</h1>
                    {guideText().map(list => {
                        return list
                    })}
                </Guide>
            </GuideWrapper>
        </EmptyWrapper>
    )
}

export default EmptyPage
