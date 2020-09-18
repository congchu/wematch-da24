import React, {useEffect} from "react"
import styled from 'styled-components'
import * as colors from "../../../../styles/colors";

interface Props extends React.HTMLAttributes<HTMLElement> {
    /** 모달 visible */
    visible: boolean;
    /** 타이틀 */
    onClose?: () => void;
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(18, 18, 18, 0.6);  
`;

const Panel = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${colors.white};
  padding: 32px 24px;
  box-sizing: border-box;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.gray33};
  letter-spacing: -1.11px;
`;

const PartnerInfo = styled.div`
  display: flex;
  padding: 15px 0;
  justify-content: space-between;
  .info {
    flex-grow: 1;
    font-size: 14px;
    letter-spacing: -0.88px;
    color: ${colors.gray33};
    
      div {
        display: inline-block;
        font-weight: 700;
        margin-right: 3px;
      }
  }
`;

const HorizontalLine = styled.div`
  width: auto;
  height: 1px;
  background-color: ${colors.lineDefault};
  margin-bottom: 12px;
`;

const Content = styled.div`
  font-size: 14px;
  color: ${colors.gray33};
  margin-bottom: 20px;
  h1 {
    font-weight: 700;
    margin-bottom: 7px;
  }
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 54px;
  border: solid 1px #d6dbe3;
  color: ${colors.gray66};
  font-size: 18px;
  font-weight: 700;
`;
const PartnerDetailPopup = (props: Props) => {
    const { visible, onClose } = props;

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        }

        return () => document.body.removeAttribute('style')
    })

    if (!visible) return null

    return (
        <Wrapper>
            <Panel>
                <Name>업체 이름이랍니다.</Name>
                <PartnerInfo>
                    <div className="info">
                        <div>고객선택</div>
                        <span>0,000회</span>
                    </div>
                    <div className="info">
                        <div>평가</div>
                        <span>0,000회</span>
                    </div>
                    <div className="info">
                        <div>이사경력</div>
                        <span>0,000회</span>
                    </div>
                </PartnerInfo>
                <HorizontalLine/>
                <Content>
                    <h1>고객이 많이 언급한 키워드</h1>
                    <p>합리적인, 정성스러운, 가격</p>
                </Content>
                <Content>
                    <h1>추가 기능 옵션</h1>
                    <p>설문조사에 수집된 내용 대로 모두 노출</p>
                </Content>
                <CloseBtn onClick={onClose}>닫기</CloseBtn>
            </Panel>
        </Wrapper>
    )
};

export default PartnerDetailPopup