import React, { useMemo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMedia } from 'react-use-media'
import styled from 'styled-components'
import { Button, StepProgressBar } from '@wematch/wematch-ui'

import * as colors from 'styles/colors'
import MainHeader from 'components/common/MainHeader'
import NavHeader from 'components/common/NavHeader'
import { Title, Body, Headline } from 'components/base/Fonts'


const CleanSurveyBridge = () => {
  const history = useHistory()
  const [option1, setOption1] = useState(-1)
  const [option2, setOption2] = useState(-1)
  const [buttonActive, setButtonActive] = useState(false)

  const progressSteps: { status: 'doing' | 'done' | 'todo' }[] = useMemo(() => {
    return [{ status: 'todo' }, { status: 'todo' }]
  }, [])

  const isDesktop = useMedia({
    minWidth: 1200
  })
  const survey = [
    { title: '청소 비용', options: ['저렴할 수록 좋다', '적당한 가격이 좋다', '정말 잘하면 비용을 더 줘도 좋다'] },
    { title: '청소 작업', options: ['빠르고 신속한 청소가 좋다', '가구, 벽지 등 손상 없는 것이 중요하다', '피톤치드 등 부가서비스가 중요하다'] }
  ]

  const handleClickNextButton = () => {
    history.push('/clean')
  }
  useEffect(() => {
    if (option1 > -1 && option2 > -1) {
      setButtonActive(true)
    }
  }, [option1, option2])

  return (
    <div>
      {isDesktop ? <MainHeader border /> : <NavHeader title="청소 성향 체크" />}
      <CleanWrapper>
        {isDesktop && <CustomTitle>청소 성향 체크</CustomTitle>}
        <StepProgressBar steps={progressSteps} pointColor={colors.pointBlue} />
        <div className="bg-etc5 ">
          <div className="w-max">
            <Headline className="color-33 pb-16">나는 청소업체가,</Headline>
          </div>

          <main className={`bg-ect5 w-max  ${isDesktop ? 'pb-128' : 'pb-250'}`}>
            <div className="py-24">
              <SurveyContainer title={survey[0].title} options={survey[0].options} target_index={option1} setOption={setOption1} />
              <SurveyContainer title={survey[1].title} options={survey[1].options} target_index={option2} setOption={setOption2} />
            </div>
            <ButtonGroup>
              <Button theme={buttonActive ? 'primary' : 'disabled'} onClick={handleClickNextButton} label="다음" />
            </ButtonGroup>
          </main>
        </div>
      </CleanWrapper>
    </div>
  )
}
export default CleanSurveyBridge

interface IProps {
  title: String
  options: String[]
  target_index: number
  setOption: (value: number) => void
}

const SurveyContainer = ({ title, options, setOption, target_index }: IProps) => {
  return (
    <div className="bg-white border border-etc2 radius-6 p-16 mb-24">
      <Title className="color-66 pb-16">{title}</Title>
      {options.map((text, index) => (
        <button className="flex items-center pb-16 pointer" key={index} onClick={() => setOption(index)}>
          <RadioCheck checked={index === target_index}>
            <div></div>
          </RadioCheck>
          <Body className="pl-8 color-33">{text}</Body>
        </button>
      ))}
    </div>
  )
}

const CleanWrapper = styled.div`
  position: relative;
  padding-top: 80px;
  .w-max {
    padding-left: 24px;
    padding-right: 24px;
    @media screen and (min-width: 1200px) {
      padding-left: 240px;
      padding-right: 240px;
    }
  }

  .pb-250 {
    padding-bottom: 250px;
  }
`
const RadioCheck = styled.div<{ checked?: boolean }>`
  height: 18px;
  width: 18px;
  border: solid 2px ${(props) => (props.checked ? '#1672f7' : '#333333')};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: ${(props) => (props.checked ? '' : 'none')};
    height: 12px;
    width: 12px;
    background-color: #1672f7;
    border-radius: 24px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;

  @media screen and (min-width: 1200px) {
    position: relative;
    padding-top: 30px;

    .first-button {
      width: 25%;
    }
  }
`

const CustomTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: ${colors.gray33};
  text-align: center;
  margin-bottom: 24px;
`
