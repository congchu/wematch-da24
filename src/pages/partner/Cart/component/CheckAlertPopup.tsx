import React from 'react'
import styled from "styled-components"
import * as colors from 'styles/colors'

import ToastPopup from "components/wematch-ui/ToastPopup"

interface Props {
  visible: boolean;
  showHeaderCancelButton: boolean;
  cancelClick: () => void;
}

const SubText = styled.div`
  font-size: 15px;
  color: ${colors.gray33};
  white-space: pre-wrap;
  font-weight: normal;
  line-height: 24px;
  margin-top: 7px;
`;

const Notice = styled.span`
  font-size: 12px;
  font-weight: normal;
  line-height: 18px;
  color: ${colors.gray33};
  margin-top: 24px;
`;
const CheckAlertPopup:React.FC<Props> = (props) => {
  const { visible, showHeaderCancelButton, cancelClick} = props
  return (
    <ToastPopup visible={visible} showHeaderCancelButton={showHeaderCancelButton} cancelClick={cancelClick}>
      <h1>{`업체는 3개까지 선택할 수 있어요!`}</h1>
      <SubText>{"3개 이상의 이사업체 비교를 원하시면 \n고객센터(1522-2483)에 문의해주세요."}</SubText>
      <Notice>* 고객들은 업체 3개  비교시, 만족도가 가장 높았습니다.</Notice>
    </ToastPopup>
  )
};

export default CheckAlertPopup