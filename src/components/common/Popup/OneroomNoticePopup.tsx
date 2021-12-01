import React from "react";
import Styled from "styled-components";

import PopupTemplate from "./PopupTemplate";
import { Close } from "components/wematch-ui/Icon";

import * as colors from "styles/colors";
import { MAIN_URL } from "constants/env";

interface Props {
  /** 모달 visible */
  visible: boolean;
  /** 닫기 버튼 이벤트 정의 */
  onClose?: () => void;
  /** border 박스 형태 */
  border?: boolean;
  /** 하단 confirm/cancel 버튼 노출 **/
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
            font-size: 24px;
            line-height: 30px;
            color: ${colors.gray33};
            text-align: center;
            margin: 13px 0 31px;
        }
        
        p {
            color: ${colors.gray66};
            text-align: center;
            display: inline-block;
            margin: 13px 0 31px;
            font-size: 24px;
            font-weight: 600;
            line-height: 30px;
            text-align: center;
            letter-spacing: -0.5px;
        }
        img {
            display: block;
            width: 72px;
            margin: 0 auto;   
        }
    `,
  CloseButton: Styled.button``,
  Group: Styled.div``
};

const OneroomNoticePopup: React.FC<Props> = (props) => {
  const { visible, onClose, footerButton, border } = props;

  const onConfirmClick = () => {
    document.location.href = `${MAIN_URL}/원룸이사`;
  };

  const rightCustomButtonStyle = {
    fontSize: "16px",
    fontWeight: 600,
    borderBottomRightRadius: border ? "8px" : "0px",
    backgroundColor: colors.white,
    color: `${colors.gray88}`,
    boxShadow: `inset 1px 1px 0 0 ${colors.lineDefault}`
  };
  return (
    <PopupTemplate visible={visible} border={border} footerButton={footerButton} onCancelButtonText="아니오" onCancelClick={onClose} onConfirmButtonText="네" onConfirmClick={onConfirmClick} rightCustomButtonStyle={rightCustomButtonStyle}>
      <S.Container>
        <S.CloseButton onClick={onClose}>
          <Close size={16} color="#000" />
        </S.CloseButton>
        <img src="https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/icon/emoti_good_72x3.png" alt="좋아하는 이모지" />
        <strong>
          이사 출발지가 <br />
          서울입니까?
        </strong>
      </S.Container>
    </PopupTemplate>
  );
};

export default OneroomNoticePopup;
