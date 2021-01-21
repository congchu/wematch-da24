import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as colors from 'styles/colors';

interface IFindCardProps {
    title: string
    link: string
}

const FindCard: React.FC<IFindCardProps> = ({
    title,
    link
}) => (
    <FindCardContainer href={link}>
        <IconWrapper>
            <img src={require('assets/images/plus.svg')} alt="icon" />
        </IconWrapper>
        <TextWrapper>
            <p><span>{title}</span> 업체 찾기</p>
            무료 견적 알아보기
        </TextWrapper>
    </FindCardContainer>
)

interface IConsultCard {
    categoryTitle: string;
    dateOfReceipt: string;
    dateOfService: string;
    link: string;
}

const ConsultCard: React.FC<IConsultCard> = ({
    categoryTitle,
    dateOfReceipt,
    dateOfService,
    link
}) => {
    return <ConsultCardContainer to={link}>hihi</ConsultCardContainer>
}

export { FindCard, ConsultCard}

const FindCardContainer = styled.a`
    display: flex;
    align-items: center;
    width: 100%;
    height: 104px;
    background-color: ${colors.grayBg};
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
    border: 0.5px solid #D7DBE2;
    padding-left: 25px;
`

const ConsultCardContainer = styled(Link)``;

const IconWrapper = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${colors.pointBlue};

    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 20px;
        width: 20px;
    }
`

const TextWrapper = styled.div`
    margin-left: 25px;
    font-size: 14px;
    color: ${colors.gray66};
    p {
        font-size: 16px;
        font-weight: 400;
        padding-bottom: 8px;
        span {
            font-weight: 700;
        }
    }
`