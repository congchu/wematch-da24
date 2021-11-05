import React from 'react'
import styled from 'styled-components'

import PopupTemplate from "components/wematch-ui/PopupTemplate";
import NewPartner from "components/common/NewPartner";

import {ProfileDefault} from "components/Icon";

import * as colors from "styles/colors";
import { isEmpty } from 'lodash';

const DetailPopupWrapper = styled.div`
  height: auto;
  background-color: white;
  padding: 40px;
`;

const PartnerImg = styled.div<{profile_img?: string}>`
	position:relative;
	width:56px;
	height:56px;
	border-radius:44px;
	background:${colors.lineDefault};
	margin-right: 8px;
	svg {
		position:absolute;
		top:50%;
		left:50%;
		margin-top: -12px;
		margin-left: -12px;
	}
	span{
		display:inline-block;
		width:56px;
		height:56px;
		border-radius:44px;
		background-image:url(${(props: any) => props.profile_img});
		background-size:cover;
		background-repeat:no-repeat;
	}
	
	@media screen and (min-width:1200px) {
      margin-right: 16px;
      width:64px;
	    height:64px;
	    
	    span {
	      width:64px;
	      height:64px;
      };
}
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: -1px;
  margin-top: 24px;
  text-align: left;
  margin-bottom: 30px;
`;

const KeywordTitle = styled.p`
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: -1px;
  margin-bottom: 10px;
`;
const KeywordWrapper = styled.div`
  text-align: left;
  display: inline;
  
  div {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Keyword = styled.div`
  width: fit-content;
  background-color: white;
  border: 1px solid ${colors.lineDefault};
  border-radius: 20px;
  padding: 5px 14px;
  box-sizing: border-box;
  margin-right: 8px;
  margin-bottom: 10px;
`;

const PartnerInfo = styled.div`
  display: flex;
  padding: 15px 0;
  justify-content: space-between;
  text-align: left;
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

const AdditionalOption = styled.div`
  text-align: left;
  p {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.gray33};
    letter-spacing: -1px;
  }
`;

interface Props {
    visible: boolean;
    onClose: () => void;
    partnerData?: any
}

const DetailPopup:React.FC<Props> = (props) => {
    const { visible, onClose, partnerData } = props
    const { keywords, level, pick_cnt, feedback_cnt, experience, addition = '', profile_img, title=''} = partnerData
    const titleLength = () => {
        if (title.length >= 30) {
            return title.substring(0,30) + ' . . .'
        }

        if (title.length === 0) {
            return '사장님이 소개글을 작성중이에요'
        }
        return title
    };
    return (
        <PopupTemplate visible={visible} onClose={onClose}>
            <DetailPopupWrapper>
                {profile_img
                  ? <PartnerImg profile_img={profile_img}>
                      <span/>
                    </PartnerImg>
                  : <PartnerImg>
                      <span/>
                      <ProfileDefault width={24} height={24} />
                    </PartnerImg>
                }
                <Title>{titleLength()}</Title>
                {level === 'NEW' && (<NewPartner showQuestionIcon={false}/>)}
                {!isEmpty(keywords) && (
                    <>
                    <KeywordTitle>고객이 많이 언급한 키워드</KeywordTitle>
                    <KeywordWrapper>
                        <div>
                            {keywords.map((keyword:string, index:number) => (
                                <Keyword key={index}>{keyword}</Keyword>
                            ))}
                        </div>
                    </KeywordWrapper>
                    </>
                )}
                {level !== 'NEW' &&
                    <PartnerInfo>
                        <div className="info">
                            <div>고객선택</div>
                            <span>{pick_cnt || 0} 회</span>
                        </div>
                        <div className="info">
                            <div>평가</div>
                            <span>{feedback_cnt|| 0}회</span>
                        </div>
                        <div className="info">
                            <div>이사경력</div>
                            <span>{experience || 1} 년</span>
                        </div>
                    </PartnerInfo>
                }
                {addition.length > 0  && (
                    <AdditionalOption>
                        <p>추가 기능옵션</p>
                        <span>{addition}</span>
                    </AdditionalOption>
                )}
            </DetailPopupWrapper>
        </PopupTemplate>
    )
}

export default DetailPopup