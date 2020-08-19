import React from 'react'
import styled from 'styled-components'
import { ProfileDefault } from 'components/Icon'
import * as colors from "styles/colors"
import { API_URL } from 'constants/env'

interface Props {
    list: IList;
    onSelect: (list:IList, id:number) => void;
    openDetailPopup: () => void;
}

interface IList {
    id: number;
    title: string;
    subTitle: string;
    isChecked?: boolean;
}
interface styleProps {
    checkImage?: string
}
const S = {
    CardContainer: styled.div`
      display: flex;
      align-items: center;
      width: 312px;
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
        width: 528px;
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
    PartnerImg: styled.div`
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
		@media screen and (min-width:1200px) {
          margin-right: 16px;
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
      },
      .partner_about {
        color: ${colors.gray66};
      },
      .partner_keyword {
        color: ${colors.gray66};
        font-size: 12px;
        letter-spacing: -0.86px;
      }
    `,
};

const Card:React.FC<Props> = (props: Props) => {
    const url = API_URL;
    const {list, onSelect, openDetailPopup} = props;
    const { id, title, subTitle, isChecked } = list;
    const titleLength = () => {
        if (subTitle.length >= 12) {
            return subTitle.substring(0, 12) + ' . . .'
        }
        return subTitle
    };
    return (
        <S.CardContainer>
            <S.CheckBtn
                onClick={() => onSelect(list, id)}
                checkImage={require(`assets/images/check_circle_${isChecked ? "on" : "off"}.svg`)}
            />
            <S.PartnerImg>
                <span/>
                <ProfileDefault width={24} height={24} />
            </S.PartnerImg>
            <S.Content onClick={openDetailPopup}>
                <div className="partner_name">{title}</div>
                <div className="partner_about">{titleLength()}</div>
                <div className="partner_keyword">#키워드, #키워드, #키워드</div>
            </S.Content>
        </S.CardContainer>
    )
};

export default Card