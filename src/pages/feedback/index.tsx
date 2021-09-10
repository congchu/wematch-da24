import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Colors } from '@wematch/wematch-ui'
import FeedbackForm from './components/FeedbackForm'
import { useHistory, useLocation } from 'react-router'
import { bookingApi } from 'lib/api'
import useSWRImmutable from 'swr/immutable'
import { IRequestFeedbackForm, RequestEstimateForm } from 'store/common/types'
import { useDispatch } from 'react-redux'
import { fetchPartnerEstimate, fetchPartnerFeedback } from 'store/common/actions'
import ResponseFeedback from './components/ResponseFeedback'
import EstimateForm from './components/EstimateForm'

interface IResponsePartnerData {
  partners: { partner_id: string; partner_name: string }[]
  service_type: 'move' | 'clean'
}

const fetcher = (url: string): Promise<IResponsePartnerData> => bookingApi.get(url).then(({ data }) => data.data)

export default function FeedbackPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const [step, setStep] = useState(0)
  const [isSurvey, setIsSurvey] = useState<boolean | null>(null)
  const params = new URLSearchParams(location.search)
  const idx = params.get('idx')
  const serviceType = params.get('serviceType')

  if (!idx) {
    history.replace('/error')
  }

  const { data, error } = useSWRImmutable(`/feedback/matched-partners?idx=${idx}`, fetcher)

  const onSubmitFeedback = (form: IRequestFeedbackForm) => {
    dispatch(fetchPartnerFeedback(form))
  }

  const onSubmitEstimate = (form: RequestEstimateForm) => {
    dispatch(fetchPartnerEstimate(form))
  }

  const handleNext = () => {
    setStep((step) => step + 1)
  }

  if (!data) {
    return <div>loading</div>
  }

  const components = [
    <Container>
      <Header>
        <Logo>
          <span>위매치</span>
        </Logo>
      </Header>
      {serviceType === 'happy_call' ? (
        <FeedbackForm partners={data.partners} serviceType={data.service_type} onSubmit={onSubmitFeedback} idx={idx} handleNext={handleNext} isSurvey={isSurvey} setIsSurvey={setIsSurvey} />
      ) : (
        <EstimateForm partners={data.partners} serviceType={data.service_type} onSubmit={onSubmitEstimate} idx={idx} handleNext={handleNext} isSurvey={isSurvey} setIsSurvey={setIsSurvey} />
      )}
    </Container>,
    <ResponseFeedback isSurvey={isSurvey} serviceType={serviceType} />
  ]

  return (
    <Container>
      {components.map((component, index) => {
        if (index === step) {
          return <Fragment key={`${serviceType}-${index}`}>{component}</Fragment>
        }

        return null
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  background-color: ${Colors.white};
  display: flex;
  flex-direction: column;
`

const Logo = styled.h1`
  display: block;
  height: 55px;
  padding: 0 24px;
  margin-top: 0;
  padding: 24px 0 10px 24px;
  box-sizing: border-box;

  span {
    display: block;
    width: 87px;
    height: 16px;
    font-size: 1px;
    background: url(https://s3.ap-northeast-2.amazonaws.com/marketdesigners-asset/images/logo/wematch_c.png) 0 0 no-repeat;
    background-size: 100% auto;
    color: transparent;
  }

  @media (min-width: 1200px) {
    max-width: 768px;
    width: 100%;
    align-self: center;
    padding-left: 0;
  }
`
