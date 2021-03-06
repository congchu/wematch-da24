import React, { useState, Fragment } from "react";
import styled from "styled-components";
import RatingCard from "./RatingCard";
import CheckboxListItem from "./CheckboxListItem";
import RadioBoxListItem from "./RadioBoxListItem";
import { Button, Colors } from "@wematch/wematch-ui";
import Input from "components/common/Input";
import { Textarea } from "components/wematch-ui";
import { RequestEstimateForm } from "store/common/types";

interface Props {
  idx: string | null;
  partners: { partner_id: string; partner_name: string }[];
  serviceType: "move" | "clean";
  onSubmit: (form: RequestEstimateForm) => void;
  handleNext: () => void;
  isSurvey: boolean | null;
  setIsSurvey: (value: boolean) => void;
}

interface EstimatePartner {
  partner_id: string;
  professionalism_score: number;
  kindness_score: number;
  price_score: number;
  advice_to_others: string;
}

const EstimateForm = ({ idx, partners, serviceType, onSubmit, handleNext, isSurvey, setIsSurvey }: Props) => {
  const [selectedPartners, setSelectPartners] = useState<{ partner_id: string; partner_name: string }[]>([]);
  const [partnerEstimates, setPartnerEstimates] = useState<{ [key: string]: EstimatePartner }>({});
  const [isNext, setIsNext] = useState<boolean | null>(null);

  const validate = () => {
    if (!selectedPartners.length) return false;
    const partners = Object.values(partnerEstimates);
    const validatedCount = partners.filter(({ professionalism_score, kindness_score, price_score }) => {
      return professionalism_score > 0 && kindness_score > 0 && price_score > 0;
    }).length;
    return partners.length == validatedCount && isNext;
  };

  const handleSubmit = () => {
    if (!idx) return;

    if (!isSurvey) {
      handleNext();
      return;
    }

    const selectedPartnerIds = selectedPartners.map((partner) => partner.partner_id);

    onSubmit({
      idx,
      estimated_partners: Object.values(partnerEstimates),
      not_estimated_partners: partners
        .map((partner) => partner.partner_id)
        .filter((id) => !selectedPartnerIds.includes(id))
        .map((partner_id) => ({ partner_id })),
      use_next_time: !!isNext
    });

    handleNext();
  };
  const handleCheckbox = (partner: { partner_id: string; partner_name: string }) => {
    if (!partnerEstimates[partner.partner_id]) {
      setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { partner_id: partner.partner_id, professionalism_score: 0, kindness_score: 0, price_score: 0, advice_to_others: "" } });
      setSelectPartners([...selectedPartners, partner]);
    } else {
      delete partnerEstimates[partner.partner_id];
      setPartnerEstimates({ ...partnerEstimates });
      setSelectPartners(selectedPartners.filter((id) => id.partner_id !== partner.partner_id));
    }
  };

  const renderPartnerSurvey = selectedPartners.map((partner, index) => {
    return (
      <Fragment key={`partnerSurvey-${partner.partner_id}-${index}`}>
        <Divider />
        <QuestionWrapper>
          <PartnerTitle>{partner.partner_name}</PartnerTitle>
          <QuestionTitle>???????????? ????????? ????????? ?????????</QuestionTitle>
          <EstimateFormList>
            <RatingCard
              key={`${partner.partner_id}-RatingCard-1`}
              title={"?????????"}
              textBody={<span>?????????????????? ?????? ????????? ????????? ?????????????</span>}
              value={partnerEstimates[partner.partner_id].professionalism_score || 0}
              onChange={(value: number) => {
                setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], professionalism_score: value } });
              }}
            />
            <RatingCard
              key={`${partner.partner_id}-RatingCard-2`}
              title={"?????????"}
              textBody={<span>????????? ????????? ????????????, ????????? ????????? ????????????????</span>}
              value={partnerEstimates[partner.partner_id].kindness_score || 0}
              onChange={(value: number) => {
                setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], kindness_score: value } });
              }}
            />
            <RatingCard
              key={`${partner.partner_id}-RatingCard-3`}
              title={"???????????????"}
              textBody={<span>????????? ????????? ????????? ???????????????? ???????????? ?????? ????????????????????? ????????? ?????????.</span>}
              value={partnerEstimates[partner.partner_id].price_score || 0}
              onChange={(value: number) => {
                setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], price_score: value } });
              }}
            />
          </EstimateFormList>
        </QuestionWrapper>
        <Divider />
        <QuestionWrapper>
          <QuestionTitle style={{ marginBottom: 16, display: "block" }}>??? ?????? ????????? ???????????? ???????????? ????????? (??????)</QuestionTitle>
          <Textarea
            value={partnerEstimates[partner.partner_id].advice_to_others}
            onChange={(e) => {
              setPartnerEstimates({ ...partnerEstimates, [partner.partner_id]: { ...partnerEstimates[partner.partner_id], advice_to_others: e.target.value } });
            }}
            placeholder={"?????? ????????? ????????? ??? ????????? ?????? ???????????? ????????? ????????????????"}
            style={{ backgroundColor: "white", height: 142 }}
          />
        </QuestionWrapper>
      </Fragment>
    );
  });

  return (
    <Container>
      <FeedbackTextWrapper>
        <div>
          <h1>??????????????? ????????? ??????????????? ????????????????</h1>
          <p>???????????? ????????? ?????? ????????? ???????????????. ????????? ????????? ??????????????? ??????????????????.</p>
          <span>
            *????????? ???????????? ????????? ??? ??? ????????????. <br />
            *???????????? ????????? ???????????? ?????? ?????? ???????????? ???????????????.
          </span>
        </div>
      </FeedbackTextWrapper>
      <QuestionWrapper>
        <QuestionTitle>??????????????? ???????????? ????????? ??????????????? ???????????????????</QuestionTitle>
        <CheckboxList>
          <RadioBoxListItem key={`survey-radio-1`} label={"???"} checked={isSurvey === true} onChange={() => setIsSurvey(true)} />
          <RadioBoxListItem key={`survey-radio-2`} label={"?????????"} checked={isSurvey === false} onChange={() => setIsSurvey(false)} />
        </CheckboxList>
      </QuestionWrapper>
      {isSurvey ? (
        <>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>?????? ??????????????? ??????????????? ???????????????? (?????? ????????? ????????? ?????????.)</QuestionTitle>
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
                <QuestionTitle>???????????? ???????????? ???????????? ????????? ????????????????</QuestionTitle>
                <CheckboxList>
                  <RadioBoxListItem key={`isNext-radio-1`} label={"???"} checked={isNext === true} onChange={() => setIsNext(true)} />
                  <RadioBoxListItem key={`isNext-radio-2`} label={"?????????"} checked={isNext === false} onChange={() => setIsNext(false)} />
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
        <StyledButton label={"??? ?????? ????????????"} theme={isSurvey === null || (isSurvey && !validate()) ? "disabled" : "primary"} isRound onClick={handleSubmit} />
      </ButtonWrapper>
    </Container>
  );
};

export default EstimateForm;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  padding: 24px;

  @media (min-width: 1200px) {
    max-width: 768px;
    width: 100%;
    align-self: center;
  }
`;

const StyledButton = styled(Button)``;

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
`;

const EstimateFormList = styled.div`
  width: 100%;
  padding: 24px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CheckboxList = styled.ul`
  padding: 0;
  margin: 16px 0 0 0;

  list-style: none;
  li + li {
    margin-top: 16px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-bottom: 8px solid #ebeef2;
`;

const QuestionWrapper = styled.div`
  padding: 24px;
  @media (min-width: 1200px) {
    max-width: 768px;
    width: 100%;
    align-self: center;
  }
`;

const QuestionTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: -1px;
  color: ${Colors.gary33};
`;

const StyledInput = styled(Input)`
  input {
    &::placeholder {
      color: "#999";
    }
  }
`;

const PartnerTitle = styled.span`
  font-size: 20px;
  color: #1672f7;
  font-weight: bold;
  display: block;
`;
