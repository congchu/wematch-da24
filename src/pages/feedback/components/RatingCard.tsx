import { Colors } from '@wematch/wematch-ui'
import { StarRating } from 'components/Icon'
import React, { useState } from 'react'
import { ReactNode } from 'react-router/node_modules/@types/react'
import styled from 'styled-components'

interface Props {
  title?: string
  textBody?: ReactNode
  value: number
  onChange: (value: number) => void
}

const RatingCard = ({ title, textBody, value = 0, onChange }: Props) => {
  const renderRating = Array(5)
    .fill(0)
    .map((_, index) => (
      <IconWrapper key={`${title}-ratingIcon-${index}`} onClick={() => onChange(index + 1)}>
        <StarRating width={40} height={40} color={value > 0 && index < value ? '#FFD500' : '#D7DBE2'} />
      </IconWrapper>
    ))
  return (
    <Container>
      <Title>{title}</Title>
      <TextBody>{textBody}</TextBody>
      <div>
        <SelectWrapper>{renderRating}</SelectWrapper>
        <TextWrapper>
          <span>매우 불만족</span>
          <span>매우 만족</span>
        </TextWrapper>
      </div>
    </Container>
  )
}

export default RatingCard

const Container = styled.div`
  width: 100%;
  height: 207px;
  border: 0.5px solid #d7dbe2;
  padding: 16px;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
  background-color: ${Colors.white};
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    align-items: center;
  }
`

const Title = styled.h1`
  font-weight: bold;
  color: ${Colors.gary33};
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -1px;
`
const TextBody = styled.p`
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -1px;
  color: ${Colors.gray66};
  padding-top: 8px;
`

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  span + span {
    margin-left: 17px;
  }
`

const IconWrapper = styled.span``

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 8px;

  span {
    display: block;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -1px;
    color: #e9687f;

    &:last-child {
      padding-right: 7px;
      color: #1672f7;

      @media (min-width: 1200px) {
        padding-right: 0;
      }
    }
  }
`
