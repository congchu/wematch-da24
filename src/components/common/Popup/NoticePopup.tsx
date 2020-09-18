import React from 'react'
import Styled from 'styled-components'

import PopupTemplate from './PopupTemplate'
import { Close } from 'components/wematch-ui/Icon'

import * as colors from 'styles/colors'
import { MOVE_URL } from 'constants/env'
import { useSelector } from 'react-redux'
import * as commonSelector from 'store/common/selectors'
interface Props {
    visible: boolean,
    /** 닫기 버튼 이벤트 정의 */
    onClose?: () => void;
    /** border 박스 형태 */
    border?: boolean;
    /** 오버레이 클릭 버튼 이벤트 정의 */
    onOverlayClose?: () => void;
    /* 하단 confirm/cancel 버튼 노출 */
    footerButton?: boolean;
}

const S = {
    Container: Styled.div`
        svg {
            display: block;
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
        }
        strong {
            display: block;
            font-weight: 600;
            font-size: 22px;
            line-height: 30px;
            color: ${colors.gray33};
            text-align: center;
            margin-top: 30px;
        }
        
        p {
            margin-top: 20px;
            font-size: 15px;
            line-height: 22px;
            color: ${colors.gray66};
            text-align: center;
        }  
    `,
    CloseButton: Styled.button``,
    Group: Styled.div``
}

const NoticePopup:React.FC<Props> = (props) => {
    const {
        visible,
        onClose,
        onOverlayClose,
        footerButton,
        border
    } = props

    const getMoveIdxData = useSelector(commonSelector.getMoveIdxData)


    const onConfirmClick = () => {
        if(getMoveIdxData.idx) {
            document.location.href = `${MOVE_URL}/default_legacy.asp?move_idx=${getMoveIdxData.idx}`
        }
    }

    const onCancelClick = () => {
        window.open('https://api.happytalk.io/api/kakao/chat_open?yid=%40%EC%9C%84%EB%A7%A4%EC%B9%98&site_id=4000001315&category_id=111561&division_id=111564', '_blank')
    }

    return (
        <PopupTemplate visible={visible} onOverlayClose={onOverlayClose} border={border} footerButton={footerButton} onCancelButtonText="상담 먼저하기" onCancelClick={onCancelClick} onConfirmButtonText="무료방문견적신청" onConfirmClick={onConfirmClick}>
            <S.Container>
                <S.CloseButton onClick={onClose}>
                    <Close size={16} color="#000" />
                </S.CloseButton>
                <strong>
                    입력하신 조건에 맞는 <br />
                    최적의 업체들을 찾았습니다!
                </strong>
                <p>
                    &lt;무료방문견적신청&gt;를 눌러 견적을 신청하세요 <br/>
                    (업체에서 연락드리면 꼭 받아주세요!)<br />
                    <br />
                    ※ 방문견적없이 금액 협의시<br />
                    이사 당일 분쟁소지가 있어요!<br />
                    <br />
                    이사날짜 미정 혹은 방문견적이 어렵다면, <br/>
                    위매치다이사의 친절상담을 받아보세요
                </p>
            </S.Container>
        </PopupTemplate>
    )
}

export default NoticePopup