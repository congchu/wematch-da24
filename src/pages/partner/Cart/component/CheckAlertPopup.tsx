import React from 'react'
import NewModal from "components/NewModalTemplate";

interface Props {
  visible: boolean;
  cancelClick: () => void;
}

const CheckAlertPopup:React.FC<Props> = (props) => {
  const { visible, cancelClick} = props
  return (
    <NewModal visible={visible} title={"방문견적 요청 보내기"} content={"선택하신 3개 업체에 방문견적 요청을 보내 시겠어요?"} cancelClick={cancelClick} cancelText={"취소"} confirmClick={cancelClick} confirmText={"요청 보내기"}/>
  )
};

export default CheckAlertPopup