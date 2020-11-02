import React, {useState} from 'react'
import styled from 'styled-components'
import { ProfileDefault } from 'components/Icon'
import * as colors from "styles/colors"
import { API_URL } from 'constants/env'
import DetailPopup from "./DetailPopup";
import {useMedia} from "react-use-media";
import { isEmpty } from 'lodash'

interface Props {
    list: IList;
    onSelect: (list:IList, id:string) => void;
}

interface IList {
    id: number;
    title: string;
    description: string;
    isChecked?: boolean;
    adminid: string;
    adminname: string;
    keywords?: string[];
    profile_img: string;
}
interface styleProps {
    checkImage?: string
}
const S = {
    CardContainer: styled.div`
      display: flex;
      align-items: center;
      width: 100%;
      height: 104px;
      background-color: #FFF;
      padding: 24px;
      margin-bottom: 8px;
      box-sizing: border-box;
      border-radius: 8px;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.07);
      border: solid 1px #d7dbe2;
      
      &:last-child {
        margin: 0;
      }
      @media screen and (min-width:768px) {
        height: 112px;
        margin-bottom: 12px;
      };
      @media screen and (min-width:1200px) {
        width: 720px;
      };
    `,
    CheckBtn: styled.div<styleProps>`
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 8px;
      background-image: url(${props => props.checkImage});
      background-size: cover;
    `,
    PartnerImg: styled.div<{profile_img?: string | undefined}>`
		position:relative;
		float:left;
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
			background-image:url(${(props:any) => props.profile_img});
			background-size:cover;
			background-repeat:no-repeat;
		}
		@media screen and (max-width: 359px) {
        width: 44px;
        height: 44px;
	  span {
	    width: 44px;
	    height: 44px;
	  }
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
		@media screen and (min-width:1200px) {
      width:64px;
		  height:64px;
    };
	`,
    Content: styled.div`
      display: block;
      text-align: left;
      .partner_name, .partner_about {
        color: #000;
        font-size: 14px;
        line-height: 1.43;
        letter-spacing: -1px;
        @media screen and (max-width: 359px) {
          font-size: 13px;
        }
      },
      .partner_about {
        color: ${colors.gray66};
      },
      .partner_keyword {
        @media screen and (max-width: 359px) {
          font-size: 11px;
        }
        color: ${colors.gray66};
        font-size: 12px;
        letter-spacing: -0.86px;
        margin-right: 2px;
      }
    `,
    KeywordWrapper: styled.div`
      display: flex;
`,
};

const Card:React.FC<Props> = (props: Props) => {
    const [partnerDetailVisible, setPartnerDetailVisible] = useState(false)
    const {list, onSelect} = props;
    const { id, adminname, title, keywords=[], description= '', isChecked, adminid, profile_img } = list;
    const isMobile = useMedia({
        maxWidth: 767,
    })
    const titleLength = () => {
        if (description.length >= 12) {
            return description.substring(0, 12) + ' . . .'
        }

        if (description.length === 0) {
            return '사장님이 소개글을 작성중이에요'.substring(0, 12) + ' . . .'
        }
        return description
    };

    const keywordLength = () => {
        return !isEmpty(keywords) && keywords.map((keyword, index) => {
            if (isMobile) {
                if (index < 3) {
                    return <div className="partner_keyword" key={index}>{keyword.length > 0 && `#${keyword}`}</div>
                }
            } else {
                return <div className="partner_keyword" key={index}>{keyword.length > 0 && `#${keyword}`}</div>
            }
        })
    }
    return (
        <>
            <S.CardContainer>
                <S.CheckBtn
                    onClick={() => onSelect(list, adminid)}
                    checkImage={require(`assets/images/check_circle_${isChecked ? "on" : "off"}.svg`)}
                />
                {profile_img
                  ? <S.PartnerImg profile_img={profile_img}>
                      <span />
                      </S.PartnerImg>
                  : <S.PartnerImg>
                        <span />
                        <ProfileDefault width={24} height={24} />
                    </S.PartnerImg>
                }
                <S.Content onClick={() => setPartnerDetailVisible(!partnerDetailVisible)}>
                    <div className="partner_name">{adminname}</div>
                    <div className="partner_about">{titleLength()}</div>
                    <S.KeywordWrapper>
                        {keywordLength()}
                    </S.KeywordWrapper>
                </S.Content>
            </S.CardContainer>
            <DetailPopup visible={partnerDetailVisible} onClose={() => setPartnerDetailVisible(!partnerDetailVisible)} partnerData={list}/>
        </>
    )
};

export default Card