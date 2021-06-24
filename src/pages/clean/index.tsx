import React from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use-media'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, StepProgressBar } from '@wematch/wematch-ui'

import useMultiStep from 'hooks/useMultiStep'

import CleanType from './step/cleanType'
import MainHeader from 'components/common/MainHeader'
import NavHeader from 'components/common/NavHeader'

import * as colors from 'styles/colors'
import CleanDetailInfo from './components/cleanDetailInfo'

const Clean = () => {
  const isDesktop = useMedia({
    minWidth: 1200
  })

  const history = useHistory()
  const dispatch = useDispatch()

  // component 추기
  const steps = [<CleanType />, <CleanDetailInfo />]

  const { step, nextStep, prevStep } = useMultiStep({ steps: steps })

  console.log(step)
  return (
    <div>
      {isDesktop ? <MainHeader /> : <NavHeader title="청소 종류 선택" />}
      <CleanWrapper>
        {isDesktop && <Title>청소 종류 선택</Title>}
        <StepProgressBar steps={[{ status: 'done' }, { status: 'doing' }]} pointColor={colors.pointBlue} />
        {steps[step]}
        <ButtonGroup>
          {isDesktop && <Button theme={'default'} label="이전" className={'first-button'} />}
          <Button theme={'primary'} onClick={nextStep} label="다음" />
        </ButtonGroup>
      </CleanWrapper>
    </div>
  )
}

export default Clean

const CleanWrapper = styled.div`
  position: relative;
  padding: 0 24px;
  margin-top: 56px;

  @media screen and (min-width: 1200px) {
    padding: 70px 240px;
  }
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: ${colors.gray33};
  text-align: center;
  margin-bottom: 24px;
`
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
  }
`
