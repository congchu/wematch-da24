import React from 'react'
import styled from 'styled-components'
import ToastPopup from "components/wematch-ui/ToastPopup";

import * as colors from 'styles/colors'

const GradeToastPopupTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  line-height: 36px;
  letter-spacing: -0.03em;
  color: ${colors.gray33};
  text-align: left;
`;

const GradeToastPopupSubTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  word-break: keep-all;
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: normal;
  text-align: left;
  span {
    font-weight: bold;
    color: ${colors.pointVividBlue};
  }
`;

const GradeToastPopupTable = styled.table`
  width: 100%;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -1px;
  margin-top: 30px;
  th {
    font-weight: bold;
    padding: 11px;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.gray33};
    text-align: center;
    width: 50%;
  }
  td {
    font-weight: normal;
    padding: 11px;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid ${colors.lineDefault};
  }
`;

interface Props {
    visible: boolean;
    onClose: () => void;
}
const GradeToastPopup:React.FC<Props> = (props) => {
    const { visible, onClose } = props;
    return (
        <ToastPopup visible={visible} showHeaderCancelButton={true} closeClick={() => onClose()}>
            <GradeToastPopupTitle>소비자평가등급이란?</GradeToastPopupTitle>
            <GradeToastPopupSubTitle>
                <span>최근 1년간 해당 업체를 이용한 고객의 평가(전문성,친절도,가성비)</span>를 빅데이터로 분석해 산출하는 서비스 등급입니다.
            </GradeToastPopupSubTitle>
            <GradeToastPopupTable>
                <thead>
                <tr>
                    <th>등급</th>
                    <th>만족 확률</th>
                </tr>
                </thead>
                <tbody>
                 <tr>
                     <td>S</td>
                     <td>84%</td>
                 </tr>
                 <tr>
                     <td>A</td>
                     <td>73%</td>
                 </tr>
                 <tr>
                     <td>B</td>
                     <td>65%</td>
                 </tr>
                 <tr>
                     <td>C</td>
                     <td>51%</td>
                 </tr>
                 <tr>
                     <td>등급산정중</td>
                     <td>74%</td>
                 </tr>
                </tbody>
            </GradeToastPopupTable>
        </ToastPopup>
    )
};

export default GradeToastPopup
