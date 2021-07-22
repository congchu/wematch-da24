import React from 'react';
import styled, {css} from 'styled-components';

import * as colors from 'styles/colors';

interface MultiStepCardProps {
  title: string;
  desc: string;
}
const MultiStepCard = ({title, desc}: MultiStepCardProps) => {
  return (
    <MultiStepCardWrapper isSelected={true}>
      <Title isSelected={true}>{title}</Title>
      <Desc>{desc}</Desc>
      <Icon>A</Icon>
    </MultiStepCardWrapper>
  )
};

export default MultiStepCard

const MultiStepCardWrapper = styled.div<{isSelected: boolean}>`
  position: relative;
  border: 1px solid ${colors.lineDefault};
  ${({isSelected}) => (
    isSelected && css`
      border-color: ${colors.pointBlue};
      box-shadow: 0px 4px 10px rgba(22, 114, 247, 0.25);
    `
  )}; 
  box-sizing: border-box;
  border-radius: 6px;
  padding: 24px 20px;
  margin-bottom: 8px;
`;

const Title = styled.h1<{isSelected: boolean}>`
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  color: ${props => props.isSelected ? `${colors.pointBlue}` : `${colors.gray33}`};
  margin-bottom: 8px;
`;

const Desc = styled.span`
  font-weight: normal;
  font-size: 14px;
`;

const Icon = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 20px;
`;