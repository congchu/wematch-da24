import React, {useState} from 'react';
import styled from 'styled-components'
import * as colors from "../../../styles/colors";
import {Question} from "../../Icon";
import LevelIcon from "../../LevelIcon";
import {useMedia} from "react-use-media";
import GradeToastPopup from "../GradePopup";

const NewPartnerWrapper =  styled.div`
  display: flex;
  padding: 24px;
  background-color: ${colors.boxBg};
  border-radius: 8px;
  margin: 35px 0 45px;
`;
const GradeInfo = styled.div`
  min-width: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
  	display: flex;
  	color: ${colors.gray66};
  	font-size: 13px;
  }
  
  svg {
  	margin-left: 3px;
  }
  img {
  	width: 44px;
  	padding-top: 7px;
  }
`;
const NewPartnerDescription =  styled.div`
  margin-left: 25px;
  text-align: left;
  p {
  	font-size: 13px;
  	font-weight: bold;
  	color: ${colors.gray66};
  	margin-bottom: 9px;
  }
  div {
  	font-size: 14px;
  	color: ${colors.gray33};
  	line-height: 1.5;
  }
  @media screen and (min-width: 768px) {
  	margin-left: 55px;
  }
`;

interface Props {
    showQuestionIcon?: boolean
}
const NewPartner:React.FC<Props> = (props) => {
    const [visible, setVisible] = useState(false)
    const { showQuestionIcon } = props
    const isMobile = useMedia({
        maxWidth: 767,
    })
    return (
        <>
        <NewPartnerWrapper>
            <GradeInfo onClick={() => setVisible(!visible)}>
						<span>평가등급
                            {showQuestionIcon && (
                                <Question width={16} height={16} />
                            )}
						</span>
                <LevelIcon level={'NEW'}/>
            </GradeInfo>
            <NewPartnerDescription>
                <p>위매치 신규 파트너</p>
                <div>통계적으로 NEW등급의 고객만족 확률은 A등급보다 높습니다.</div>
                {!isMobile && <div>(S등급 84%, A등급 73%, New등급 74%)</div>}
            </NewPartnerDescription>
        </NewPartnerWrapper>
        <GradeToastPopup visible={visible} onClose={() => setVisible(!visible)}/>
        </>
    )
};

export default NewPartner
