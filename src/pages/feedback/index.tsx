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
import Skeleton from 'components/common/Skeleton/skeleton'

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

  if (!idx || !serviceType) {
    history.replace('/notfound')
  }

  const { data, error } = useSWRImmutable(idx ? `/feedback/matched-partners?idx=${idx}` : null, fetcher)

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
    return (
      <Container style={{ padding: '24px', boxSizing: 'border-box', position: 'relative' }}>
        <Skeleton style={{ width: '120px', height: '20px' }} animated />
        <Skeleton style={{ width: '120px', height: '20px', marginTop: '24px' }} animated />
        <Skeleton style={{ width: '100px', height: '20px', marginTop: '8px' }} animated />
        <Skeleton style={{ width: '248px', height: '12px', marginTop: '24px' }} animated />
        <Skeleton style={{ width: '248px', height: '12px', marginTop: '8px' }} animated />
        <Skeleton style={{ width: '197px', height: '14px', marginTop: '24px' }} animated />
        <Divider style={{ margin: '24px 0' }} />
        <Skeleton style={{ width: '312px', height: '20px' }} animated />
        <Skeleton style={{ width: '50px', height: '14px', marginTop: '24px' }} animated />
        <Skeleton style={{ width: '75px', height: '14px', marginTop: '24px' }} animated />
        <div style={{ left: '24px', right: '24px', position: 'absolute', bottom: '24px' }}>
          <Skeleton style={{ width: '100%', height: '56px', borderRadius: '6px' }} animated />
        </div>
      </Container>
    )
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

const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #ebeef2;
`
