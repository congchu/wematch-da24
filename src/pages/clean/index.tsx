import React from 'react';
import styled from 'styled-components';
import {useMedia} from "react-use-media";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, CardButton, Icons} from '@wematch/wematch-ui'

import useMultiStep from "hooks/useMultiStep";

import MainHeader from "components/common/MainHeader";
import MultiStepCard from "components/common/MulitiStepCard";
import NavHeader from "components/common/NavHeader";

import * as colors from 'styles/colors';

const Clean = () => {
  const isDesktop = useMedia({
    minWidth: 1200,
  })

  const history = useHistory()
  const dispatch = useDispatch()

  const steps =
    [
      { title: '일반청소', desc: '합리적인 가격으로 만족스러운 청소', icon: ''},
      { title: '프리미엄 청소', desc: '보이지않는 세균까지 완벽한 청소', icon: ''},
    ]

  const {step, nextStep, prevStep} = useMultiStep({steps: steps})


  console.log(step)
  return (
    <div>
      {isDesktop ? <MainHeader /> : <NavHeader title="청소 종류 선택"/>}
      <CleanWrapper>
        {isDesktop && <Title>청소 종류 선택</Title>}
        {steps.map((step: any) => {
          return (
            <CardButton title={step.title} desc={step.desc} isSelected={false} defaultIcon={<Icons.DefaultCleanAfter />} selectedIcon={<Icons.SelectedCleanAfter />} />
          )
        })}
        <ButtonGroup>
          {isDesktop && <Button theme={"default"} label="이전" className={"first-button"}/>}
          <Button theme={"primary"} onClick={() => nextStep} label="다음"/>
        </ButtonGroup>
      </CleanWrapper>
    </div>
  )
};

export default Clean

const CleanWrapper = styled.div`
  position: relative;
  padding: 0 24px;
  margin-top: 56px;
  
  @media screen and (min-width: 1200px) {
    padding: 70px 240px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: ${colors.gray33};
  text-align: center;
  margin-bottom: 60px;
`;
const ButtonGroup = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;

  @media screen and (min-width: 1200px) {
    position: relative;
    margin-top: 250px;
    
    .first-button {
      width: 25%;
    }
  };
`;