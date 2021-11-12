import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import RatingCard from './RatingCard'
import CheckboxListItem from './CheckboxListItem'
import RadioBoxListItem from './RadioBoxListItem'
import { Button, Colors } from '@wematch/wematch-ui'
import Input from 'components/common/Input'
import { Textarea } from 'components/wematch-ui'
import { RequestEstimateForm } from 'store/common/types'

interface Props {
  idx: string | null
  partners: { partner_id: string; partner_name: string }[]
  serviceType: 'move' | 'clean'
  onSubmit: (form: RequestEstimateForm) => void
  handleNext: () => void
  isSurvey: boolean | null
  setIsSurvey: (value: boolean) => void
}

interface EstimatePartner {
  partner_id: string
  professionalism_score: number
  kindness_score: number
  price_score: number
  advice_to_others: string
}

const EstimateForm = ({ idx, partners, serviceType, onSubmit, handleNext, isSurvey, setIsSurvey }: Props) => {
  const [selectedPartners, setSelectPartners] = useState<{ partner_id: string; partner_name: string }[]>([])
  const [partnerEstimates, setPartnerEstimates] = useState<{ [key: string]: EstimatePartner }>({})
  const [isNext, setIsNext] = useState<boolean | null>(null)

  const validate = () => {
    if (!selectedPartners.length) return false;
    const partners = Object.values(partnerEstimates);
    const validatedCount = partners.filter(({ professionalism_score, kindness_score, price_score }) => {
      return professionalism_score > 0 && kindness_score > 0 && price_score > 0;
    }).length;
    return partners.length == validatedCount && isNext;
  };

  const handleSubmit = () => {
    if (!idx) return

    if (!isSurvey) {
      handleNext()
      return
    }

    const selectedPartnerIds = selectedPartners.map((partner) => partner.partner_id)

    onSubmit({
      idx,
      estimated_partners: Object.values(partnerEstimates),
      not_estimated_partners: partners
        .map((partner) => partner.partner_id)
        .filter((id) => !selectedPartnerIds.includes(id))
        .map((partner_id) => ({ partner_id })),
      use_next_time: !!isNext
    })

    handleNext()
  }
  const handleCheckbox = (partner: { partner_id: string; partner_name: string }) => {
    if (!partnerEstimates[partner.partner_id]) {
      setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { partner_id: partner.partner_id, professionalism_score: 0, kindness_score: 0, price_score: 0, advice_to_others: '' } })
      setSelectPartners([...selectedPartners, partner])
    } else {
      delete partnerEstimates[partner.partner_id]
      setPartnerEstimates({ ...partnerEstimates })
      setSelectPartners(selectedPartners.filter((id) => id.partner_id !== partner.partner_id))
    }
  }

  const renderPartnerSurvey = selectedPartners.map((partner, index) => {
    return (
      <Fragment key={`partnerSurvey-${partner.partner_id}-${index}`}>
        <Divider />
        <QuestionWrapper>
          <PartnerTitle>{partner.partner_name}</PartnerTitle>
          <QuestionTitle>이용하신 업체를 평가해 주세요</QuestionTitle>
          <EstimateFormList>
            <RatingCard
              key={`${partner.partner_id}-RatingCard-1`}
              title={'전문성'}
              textBody={<span>작업과정에서 전문 업체의 면모가 보였나요?</span>}
              value={partnerEstimates[partner.partner_id].professionalism_score || 0}
              onChange={(value: number) => {
                setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], professionalism_score: value } })
              }}
            />
            <RatingCard
              key={`${partner.partner_id}-RatingCard-2`}
              title={'친절도'}
              textBody={<span>고객님 말씀을 경청하고, 요청에 친절히 응대했나요?</span>}
              value={partnerEstimates[partner.partner_id].kindness_score || 0}
              onChange={(value: number) => {
                setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], kindness_score: value } })
              }}
            />
            <RatingCard
              key={`${partner.partner_id}-RatingCard-3`}
              title={'가격만족도'}
              textBody={<span>업체가 제시한 가격은 적절했나요? 저렴한지 보단 합리적이었는지 평가해 주세요.</span>}
              value={partnerEstimates[partner.partner_id].price_score || 0}
              onChange={(value: number) => {
                setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], price_score: value } })
              }}
            />
          </EstimateFormList>
        </QuestionWrapper>
        <Divider />
        <QuestionWrapper>
          <QuestionTitle style={{ marginBottom: 16, display: 'block' }}>이 업체 선택을 고민하는 고객에게 한마디 (선택)</QuestionTitle>
          <Textarea
            value={partnerEstimates[partner.partner_id].advice_to_others}
            onChange={(e) => {
              setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], advice_to_others: e.target.value } })
            }}
            placeholder={'만약 친구나 가족이 이 업체를 고려 중이라면 뭐라고 하시겠어요?'}
            style={{ backgroundColor: 'white', height: 142 }}
          />
        </QuestionWrapper>
      </Fragment>
    )
  })

  return (
    <Container>
      <FeedbackTextWrapper>
        <div>
          <h1>방문견적을 받으신 이사업체는 어떠셨나요?</h1>
          <p>고객님의 평가는 업체 평점에 반영됩니다. 냉정한 평가로 이사업계를 개선해주세요.</p>
          <span>
            *업체는 작성자가 누군지 알 수 없습니다. <br />
            *방문견적 후기는 노출되지 않고 업체 평점에만 반영됩니다.
          </span>
        </div>
      </FeedbackTextWrapper>
      <QuestionWrapper>
        <QuestionTitle>위매치에서 소개받은 업체와 방문견적을 진행하셨나요?</QuestionTitle>
        <CheckboxList>
          <RadioBoxListItem key={`survey-radio-1`} label={'예'} checked={isSurvey === true} onChange={() => setIsSurvey(true)} />
          <RadioBoxListItem key={`survey-radio-2`} label={'아니오'} checked={isSurvey === false} onChange={() => setIsSurvey(false)} />
        </CheckboxList>
      </QuestionWrapper>
      {isSurvey ? (
        <>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>어떤 업체들에게 방문견적을 받으셨나요? (모든 업체를 선택해 주세요.)</QuestionTitle>
            <CheckboxList>
              {partners.map((partner, index) => (
                <CheckboxListItem key={`${partner.partner_id}-checkbox-${index}`} label={partner.partner_name} checked={selectedPartners.filter((item) => item.partner_id === partner.partner_id).length > 0} onChange={() => handleCheckbox(partner)} />
              ))}
            </CheckboxList>
          </QuestionWrapper>
          {selectedPartners.length ? (
            <>
              {renderPartnerSurvey}
              <Divider />
              <QuestionWrapper>
                <QuestionTitle>위매치를 다음에도 이용하실 의향이 있으신가요?</QuestionTitle>
                <CheckboxList>
                  <RadioBoxListItem key={`isNext-radio-1`} label={'예'} checked={isNext === true} onChange={() => setIsNext(true)} />
                  <RadioBoxListItem key={`isNext-radio-2`} label={'아니오'} checked={isNext === false} onChange={() => setIsNext(false)} />
                </CheckboxList>
              </QuestionWrapper>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      <ButtonWrapper>
        <StyledButton label={'내 평가 반영하기'} theme={isSurvey === null || (isSurvey && !validate()) ? 'disabled' : 'primary'} isRound onClick={handleSubmit} />
      </ButtonWrapper>
    </Container>
  )
}

export default EstimateForm

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  flex: 1;
`

const ButtonWrapper = styled.div`
  padding: 24px;

  @media (min-width: 1200px) {
    max-width: 768px;
    width: 100%;
    align-self: center;
  }
`

const StyledButton = styled(Button)``

const FeedbackTextWrapper = styled.div`
  padding: 8px 24px 24px 24px;
  line-height: 29px;
  letter-spacing: -1px;
  color: ${Colors.gray66};
  border-bottom: 0.5px solid #d7dbe2;
  background-color: ${Colors.white};
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    div {
      max-width: 768px;
      width: 100%;
      align-self: center;
      h1 {
        width: 100%;
      }
      p {
        width: 100%;
      }
    }
  }
  h1 {
    width: 188px;
    font-weight: bold;
    font-size: 20px;
    color: ${Colors.gary33};
    padding-top: 8px;
  }

  p {
    display: block;
    width: 260px;
    font-size: 16px;
    line-height: 23px;
    padding-top: 8px;
  }

  span {
    display: block;
    font-size: 12px;
    line-height: 17px;
    padding-top: 16px;
  }
`

const EstimateFormList = styled.div`
  width: 100%;
  padding: 24px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CheckboxList = styled.ul`
  padding: 0;
  margin: 16px 0 0 0;

  list-style: none;
  li + li {
    margin-top: 16px;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 8px solid #ebeef2;
`

const QuestionWrapper = styled.div`
  padding: 24px;
  @media (min-width: 1200px) {
    max-width: 768px;
    width: 100%;
    align-self: center;
  }
`

const QuestionTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -1px;
  color: ${Colors.gary33};
`

const StyledInput = styled(Input)`
  input {
    &::placeholder {
      color: '#999';
    }
  }
`

const PartnerTitle = styled.span`
  font-size: 20px;
  color: #1672f7;
  font-weight: bold;
  display: block;
`
