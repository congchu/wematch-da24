import React from 'react'
import styled from "styled-components"
import * as colors from 'styles/colors'

import ToastPopup from "components/wematch-ui/ToastPopup"
import NewModal from "components/NewModalTemplate";

interface Props {
  visible: boolean;
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
  const { visible, cancelClick} = props
  return (
    <NewModal visible={visible} title={"방문견적 요청 보내기"} content={"선택하신 3개 업체에 방문견적 요청을 보내 시겠어요?"} cancelClick={cancelClick} cancelText={"취소"} confirmClick={cancelClick} confirmText={"요청 보내기"}/>
  )
};

export default CheckAlertPopup