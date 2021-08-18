import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as colors from 'styles/colors'

interface IFindCardProps {
  title: string
  link?: string
}

const FindCard: React.FC<IFindCardProps> = ({ title, link = '/' }) => (
  <FindCardContainer href={link}>
    <PlusIconWrapper>
      <img src={require('assets/images/plus.svg')} alt="icon" />
    </PlusIconWrapper>
    <TextWrapper>
      <p>
        <span>{title}</span> 업체 찾기
      </p>
      무료 견적 알아보기
    </TextWrapper>
  </FindCardContainer>
)

interface IConsultCard {
  category: 'move' | 'clean'
  categoryTitle: string
  dateOfReceipt: string
  dateOfService: string
  link: string
  handleSelectConsult: () => void
}

const ConsultCard: React.FC<IConsultCard> = ({ category, categoryTitle, dateOfReceipt, dateOfService, handleSelectConsult, link }) => {
  return (
    <ConsultCardContainer to={link} onClick={handleSelectConsult}>
      <IconWrapper>{category === 'clean' ? <img src={require('assets/images/clean_house.svg')} alt="icon" /> : <img src={require('assets/images/express_truck.svg')} alt="icon" />}</IconWrapper>
      <TextWrapper style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
        <div>
          <p style={{ color: colors.gray33 }}>
            <span>{categoryTitle}</span> 신청내역
          </p>
          신청일 {dateOfReceipt}
          <br />
          서비스일 {dateOfService}
        </div>
        <IconWrapper>
          <img src={require('assets/images/right_arrow.svg')} alt="icon" />
        </IconWrapper>
      </TextWrapper>
    </ConsultCardContainer>
  )
}

export { FindCard, ConsultCard }

const FindCardContainer = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  height: 104px;
  background-color: ${colors.grayBg};
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
  border: 0.5px solid #d7dbe2;
  padding-left: 25px;
`

const PlusIconWrapper = styled.div`
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

const ConsultCardContainer = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 104px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 0.5px solid #d7dbe2;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding-left: 24px;
  padding-right: 16px;
`

const IconWrapper = styled.div``
