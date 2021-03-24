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
    const { visible, showHeaderCancelButton, orderCount, confirmClick, cancelClick} = props
    return (
        <NewModal visible={visible} title={"업체 선"} content={"업체는 최대 3개까지 선택하실 수 있으며 그 이상의 이사업체 비교를 원하시면 고객센터(1522-2483)로 문의해주세요."} confirmClick={cancelClick} confirmText={"확인"}/>
        /*<ToastPopup visible={visible} showHeaderCancelButton={showHeaderCancelButton} confirmText={'네, 보내주세요'} confirmClick={confirmClick} closeClick={cancelClick}>
            <h1>{`선택하신 ${orderCount}개 업체에 방문견적 요청을 보내시겠습니까?`}</h1>
        </ToastPopup>*/
    )
};

export default ConfirmPopup
