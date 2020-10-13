import React from 'react'

import ToastPopup from "components/wematch-ui/ToastPopup"

interface Props {
    visible: boolean;
    showHeaderCancelButton: boolean;
    orderCount: number;
    confirmClick: () => void;
}
const ConfirmPopup:React.FC<Props> = (props) => {
    const { visible, showHeaderCancelButton, orderCount, confirmClick} = props
    return (
        <ToastPopup visible={visible} showHeaderCancelButton={showHeaderCancelButton} confirmText={'네, 보내주세요'} confirmClick={confirmClick}>
            <h1>{`선택하신 ${orderCount}개 업체에 방문견적 요청을 보내시겠습니까?`}</h1>
        </ToastPopup>
    )
};

export default ConfirmPopup