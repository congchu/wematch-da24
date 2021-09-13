import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use-media'
import { useDispatch, useSelector } from 'react-redux'
import { Button, StepProgressBar } from '@wematch/wematch-ui'
import * as userSelector from 'store/user/selectors'
import useMultiStep from 'hooks/useMultiStep'
import CleanType from './step/cleanType'
import MainHeader from 'components/common/MainHeader'
import NavHeader from 'components/common/NavHeader'
import * as colors from 'styles/colors'
import CleanDetailInfo from './components/cleanDetailInfo'
import * as userActions from 'store/user/actions'
import * as cleanActions from 'store/clean/actions'
import * as cleanSelector from 'store/clean/selectors'
import { useHistory } from 'react-router-dom'
import { ESignInCase } from 'store/user/types'

const Clean = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(userSelector.getUser)
  const cleanType = useSelector(cleanSelector.getCleanType)
  const date = useSelector(cleanSelector.getCleanDate)
  const address = useSelector(cleanSelector.getCleanAddress)
  const livingType = useSelector(cleanSelector.getCleanLivingType)
  const houseSpace = useSelector(cleanSelector.getCleanHouseSpace)
  const isDesktop = useMedia({
    minWidth: 1200
  })

  const steps = [<CleanType />, <CleanDetailInfo />]

  const { step, nextStep, prevStep } = useMultiStep({ steps: steps })

  const progressSteps: { status: 'doing' | 'done' | 'todo' }[] = useMemo(() => {
    if (step === 0) {
      return [{ status: 'doing' }, { status: 'todo' }]
    } else {
      return [{ status: 'done' }, { status: 'doing' }]
    }
  }, [step])

  const fetchCleanAutoMatch = () => {
    if (!user) {
      dispatch(userActions.signIn({ prevPage: ESignInCase.CLEAN }))
      history.push('/login')
    } else {
      history.push('/completed?service_type=clean')
    }
  }

  const handleNextStep = () => {
    if (step === 0 && cleanType) {
      nextStep()
    }

    if (step === 1 && date && address && livingType && houseSpace) {
      fetchCleanAutoMatch()
    }
  }

  const isCleanMatch = date && address && livingType && houseSpace

  return (
    <div>
      {isDesktop ? <MainHeader border /> : <NavHeader title="청소 조건 입력" />}
      <CleanWrapper>
        {isDesktop && <Title>청소 종류 선택</Title>}
        <StepProgressBar steps={progressSteps} pointColor={colors.pointBlue} />
        {steps[step]}
        <ButtonGroup>
          {isDesktop && <Button theme={'default'} label="이전" className={'first-button'} onClick={prevStep} />}
          {step < steps.length - 1 ? <Button theme={cleanType ? 'primary' : 'disabled'} onClick={handleNextStep} label="다음" /> : <Button theme={isCleanMatch ? 'primary' : 'disabled'} onClick={handleNextStep} label="무료 전화견적 신청하기" />}
        </ButtonGroup>
      </CleanWrapper>
    </div>
  )
}

export default Clean

const CleanWrapper = styled.div`
  position: relative;
  padding: 80px 24px 0 24px;

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
