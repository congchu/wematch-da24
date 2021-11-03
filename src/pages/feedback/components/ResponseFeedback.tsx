import React from 'react'
import styled from 'styled-components'
import { Button, Colors } from '@wematch/wematch-ui'
import SmileIcon from 'components/Icon/generated/SmileIcon'

interface Props {
  isSurvey?: boolean | null
  serviceType: string | null
}

const ResponseFeedback = ({ isSurvey, serviceType }: Props) => {
  return (
    <Container isSurvey={isSurvey}>
      <SmileIcon />
      <Title>응답해 주셔서 감사합니다.</Title>
      {!isSurvey ? (
        <>
          <Text>
            아쉽지만 다음에는 위매치 소개업체와
            <br />
            진행하실 수 있도록 더 열심히 준비하겠습니다.
          </Text>
          <Text>새 보금자리에서 즐거운 새 출발되시길 기원합니다.</Text>
        </>
      ) : (
        <>
          <Text>
            {serviceType === 'estimate_call' ? (
              <>소중한 의견 감사합니다.</>
            ) : (
              <>
                평가 공개에 동의하신 경우, 고객 정보 <br /> 보호를 위해 최소 7일 후 반영됩니다.
              </>
            )}
          </Text>
          <Text>
            {serviceType === 'estimate_call' ? (
              <>
                방문견적 피드백은 업체 평점에 반영되지만 <br /> 다른 고객들에게 노출되지는 않습니다.
              </>
            ) : (
              <>
                이름, 주소, 연락처 등 개인 정보는 <br /> 공개되지 않습니다.
              </>
            )}
          </Text>
          {/* <div style={{ flex: 1 }} /> */}
          <ButtonWrapper>
            <Button
              label={'이벤트 확인하기'}
              theme={'primary'}
              isRound
              onClick={() => {
                window.location.replace('https://bit.ly/3AhvaIj')
              }}
            />
          </ButtonWrapper>
        </>
      )}
    </Container>
  )
}

export default ResponseFeedback

const Container = styled.div<{ isSurvey?: boolean | null }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ isSurvey }) => (!isSurvey ? 'center' : 'flex-start')};
  align-items: center;
  padding-top: ${({ isSurvey }) => (!isSurvey ? '0px' : '67px')};
  span + span {
    margin-top: 16px;
  }
`

const Title = styled.span`
  display: block;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -1px;
  color: ${Colors.gary33};
  margin-top: 16px;
`

const Text = styled.span`
  display: block;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -1px;
  color: ${Colors.gray66};
  text-align: center;
`

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;

  @media (min-width: 1200px) {
    max-width: 768px;
    width: 100%;
  }
`
