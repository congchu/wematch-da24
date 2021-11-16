import React from 'react'

import NewModal from "components/NewModalTemplate";

interface Props {
    visible: boolean;
    showHeaderCancelButton: boolean;
    orderCount: number;
    confirmClick: () => void;
    cancelClick: () => void;
}
const ConfirmPopup:React.FC<Props> = (props) => {
    const { visible, confirmClick, } = props
    return (
        <NewModal visible={visible} title={"업체 선택"} content={"선택하신 3개 업체에 방문견적 요청을 보내겠습니다."} confirmClick={confirmClick} confirmText={"네 보내주세요."}/>
        /*<ToastPopup visible={visible} showHeaderCancelButton={showHeaderCancelButton} confirmText={'네, 보내주세요'} confirmClick={confirmClick} closeClick={cancelClick}>
            <h1>{`선택하신 ${orderCount}개 업체에 방문견적 요청을 보내시겠습니까?`}</h1>
        </ToastPopup>*/
    )
};

export default ConfirmPopup
