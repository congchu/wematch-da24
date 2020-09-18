import React from 'react'
import styled from 'styled-components'

import * as colors from 'styles/colors'
import PopupTemplate from "components/wematch-ui/PopupTemplate"

const GuidePopupWrapper = styled.div`
  height: auto;
  background-color: white;
  padding: 40px;
  
  span {
    display: block;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: -1px;
    text-align: right;
    margin-top: 8px;
    color: ${colors.gray66};
  }
`;
const Title = styled.div`
  color: ${colors.gray33};
  font-size: 24px;
  font-weight: bold;
  line-height: 36px;
  margin-bottom: 12px;
`;
const ContentBox = styled.div`
  margin-top: 24px;
  border-bottom: 1px solid ${colors.lineEnd};
  
  h1 {
    font-size: 18px;
    font-weight: bold;
    line-height: 34px;
    letter-spacing: -1px;
    color: ${colors.gray33};
  }
  
  p {
    font-size: 16px;
    line-height: 26px;
    letter-spacing: -1px;
        word-break: keep-all;
  }
  
  img {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
  }
`;
const Tip = styled.div`
  color: ${colors.pointVividBlue};
  font-size: 14px;
  font-weight: bold;
  line-height: 21px;
  letter-spacing: -0.5px;
  margin-bottom: 10px;
`;
const Table = styled.table`
  width: 100%;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -1px;
  border-top: 2px solid #333;
  border-bottom: 1px solid #333;
  margin-top: 30px;
  th {
    font-weight: bold;
    padding: 11px;
    box-sizing: border-box;
    border-bottom: 1px solid #c4c9d1;
    text-align: left;
    &:nth-child(1) {
      text-align: center;
    }
  }
  td {
    padding: 11px;
    box-sizing: border-box;
    text-align: left;
    &:nth-child(1) {
      text-align: center;
    }
  }
  tr {
    &:nth-last-child(1) {
      font-weight: bold;
      text-align: left;
    }
  }
`;
const GuideBox = styled.div`
  margin-top: 30px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px 16px 16px 21px;
  background-color: ${colors.grayBg};
  p {
    position: relative;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -1px;
    color: ${colors.gray66};
    word-break: keep-all;
    :before {
      position: absolute;
      content: "-";
      display: inline;
      width: 100%;
      margin-right: 3px;
      right: 5px;
    }
    &:nth-child(1) {
      margin-bottom: 4px;
    }
  }
`;

interface Props {
    visible: boolean;
    onClose: () => void;
}

const GuidePopup:React.FC<Props> = (props) => {
    const { visible, onClose} = props
    return (
        <PopupTemplate visible={visible} onClose={onClose}>
            <GuidePopupWrapper>
                <Title>
                    방문없이 <br/>가격만 알 순 없나요?
                </Title>
                <ContentBox>
                    <Tip>Tip 01</Tip>
                    <h1>방문견적 대신 전화 견적은 안되나요?</h1>
                    <p>전화/온라인으로는 정확한 짐량 파악이 어려워 부정확한 견적이 산출되므로, 이사당일 추가비용 요구 등 분쟁이 발생할 수 있습니다.</p>
                    <img src={require('assets/images/guide_1.png')} alt={'guide'} />
                </ContentBox>
                <ContentBox>
                    <Tip>Tip 02</Tip>
                    <h1>이사업체에서 방문견적을 받으면 <br/>꼭 계약해야 하나요?</h1>
                    <p>방문견적은 마음에 드는 이사업체를 선택하는 과정일 뿐입니다. 방문견적 받아보시고, 계약여부를 결정하시면 됩니다.</p>
                    <img src={require('assets/images/guide_2.png')} alt={'guide'} />
                </ContentBox>
                <ContentBox>
                    <Tip>Tip 03</Tip>
                    <h1>비교건적은 몇 개가 적당한가요?</h1>
                    <p>같은 조건에도 업체마다 서비스와 이사비용이 크게 다르기 때문에, 가능하다면 3개 업체 비교를 권장 드립니다.</p>
                    <p style={{marginTop: '20px'}}>실제 위매치에서 이용자 만족도를 분석한 결과, 3개 업체 비교 시 만족도가 가장 높았습니다.</p>
                    <img src={require('assets/images/guide_3.png')} alt={'guide'} />
                </ContentBox>
                <ContentBox>
                    <Tip>Tip 04</Tip>
                    <h1>참고해보세요! 포장이사 평균 비용</h1>
                    <p>(5톤 짐량 기준)</p>
                    <p>아래 비용은 평균금액이므로, 정확한 견적은 이사업체 방문견적을 통해 받아보셔야 합니다.</p>
                    <Table>
                        <thead>
                            <tr>
                                <th>구분</th>
                                <th>상세설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>짐량</td>
                                <td>5톤 트럭 1대 분량</td>
                            </tr>
                            <tr>
                                <td>인원</td>
                                <td>짐 정리/운반 2명, 부엌 정리 1명</td>
                            </tr>
                            <tr>
                                <td>거리</td>
                                <td>동일 도시</td>
                            </tr>
                            <tr>
                                <td>평균 비용</td>
                                <td>900,000원</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentBox>
                <span>* 사다리차/보관이사 창고 비용 별도</span>
                <GuideBox>
                    <p>이사 비용은 이동거리, 투입인원 및 작업환경(엘리베이터 등)에 따라 달라질 수 있습니다.</p>
                    <p>이사일을 성수기(1,2,7,8월), 손없는날, 주말을 피하시면 이사 비용을 줄일 수 있습니다.</p>
                </GuideBox>
            </GuidePopupWrapper>
        </PopupTemplate>
    )
};

export default  GuidePopup

