import React, { useState } from "react";
import styled from "styled-components";
import RatingCard from "./RatingCard";
import RadioBoxListItem from "./RadioBoxListItem";
import { Button, Colors } from "@wematch/wematch-ui";
import Input from "components/common/Input";
import { Textarea } from "components/wematch-ui";
import { IRequestFeedbackForm } from "store/common/types";

interface Props {
  idx: string | null;
  partners: { partner_id: string; partner_name: string }[];
  serviceType: "move" | "clean";
  onSubmit: (form: IRequestFeedbackForm) => void;
  handleNext: () => void;
  isSurvey: boolean | null;
  setIsSurvey: (value: boolean) => void;
}

const FeedbackForm = ({ idx, partners, serviceType, onSubmit, handleNext, isSurvey, setIsSurvey }: Props) => {
  const [selectedPartner, setSelectPartner] = useState<string>("");
  const [expertRating, setExpertRating] = useState(0);
  const [kindnessRating, setKindnessRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [totalPrice, setTotalPrice] = useState("");
  const [optionPrice, setOptionPrice] = useState("");
  const [memo, setMemo] = useState("");
  const [isRecommandation, setIsRecommandation] = useState<boolean | null>(null);
  const [isNext, setIsNext] = useState<boolean | null>(null);

  const validate = () => {
    if (!selectedPartner) return false;
    if (!expertRating) return false;
    if (!kindnessRating) return false;
    if (!priceRating) return false;
    if (!totalPrice) return false;
    if (!optionPrice) return false;
    if (isRecommandation === null) return false;
    if (isNext === null) return false;
    return true;
  };

  const handleSubmit = () => {
    if (!idx) return;

    if (!isSurvey) {
      handleNext();
      return;
    }

    onSubmit({
      idx,
      partner_id: selectedPartner,
      service_type: serviceType,
      professionalism_score: expertRating,
      kindness_score: kindnessRating,
      price_score: priceRating,
      price: parseInt(totalPrice),
      extra_price: parseInt(optionPrice),
      advice_to_others: memo,
      publish_agree: !!isRecommandation,
      use_next_time: !!isNext
    });
    handleNext();
  };

  return (
    <Container>
      <FeedbackTextWrapper>
        <div>
          <h1>이용하신 업체는 어떠셨나요?</h1>
          <p>고객님의 평가는 업체 평점에 반영됩니다. 냉정한 평가로 업계를 개선해주세요.</p>
          <span>*업체는 작성자가 누군지 알 수 없습니다.</span>
        </div>
      </FeedbackTextWrapper>
      <QuestionWrapper>
        <QuestionTitle>위매치 파트너 업체와 이사(청소)를 진행하셨나요?</QuestionTitle>
        <CheckboxList>
          <RadioBoxListItem label={"예"} checked={isSurvey === true} onChange={() => setIsSurvey(true)} />
          <RadioBoxListItem label={"아니오"} checked={isSurvey === false} onChange={() => setIsSurvey(false)} />
        </CheckboxList>
      </QuestionWrapper>
      {isSurvey ? (
        <>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>어떤 업체를 이용하셨나요?</QuestionTitle>
            <CheckboxList>
              {partners.map((partner, index) => (
                <RadioBoxListItem key={index} label={partner.partner_name} checked={selectedPartner === partner.partner_id} onChange={() => setSelectPartner(partner.partner_id)} />
              ))}
            </CheckboxList>
          </QuestionWrapper>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>이용하신 업체를 평가해 주세요</QuestionTitle>
            <FeedbackFormList>
              <RatingCard title={"전문성"} textBody={<span>작업과정에서 전문 업체의 면모가 보였나요?</span>} value={expertRating} onChange={setExpertRating} />
              <RatingCard title={"친절도"} textBody={<span>고객님 말씀을 경청하고, 요청에 친절히 응대했나요?</span>} value={kindnessRating} onChange={setKindnessRating} />
              <RatingCard title={"가격만족도"} textBody={<span>업체가 제시한 가격은 적절했나요? 저렴한지 보단 합리적이었는지 평가해 주세요.</span>} value={priceRating} onChange={setPriceRating} />
            </FeedbackFormList>
          </QuestionWrapper>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>비용은 총 얼마였나요?</QuestionTitle>
            <StyledInput type={"number"} theme={"default"} placeholder={"총 금액(옵션비 포함)"} border style={{ backgroundColor: "white", fontSize: 16, paddingRight: 40, marginTop: 16 }} onChange={(e) => setTotalPrice(e.target.value)} value={totalPrice} pattern="\d*" unit={"만원"} />
          </QuestionWrapper>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>작업 당일, 추가 비용이 발생했나요?</QuestionTitle>
            <StyledInput
              type={"number"}
              theme={"default"}
              placeholder={"추가 비용(계약된 금액 외)"}
              border
              style={{ backgroundColor: "white", fontSize: 16, paddingRight: 40, marginTop: 16 }}
              onChange={(e) => setOptionPrice(e.target.value)}
              value={optionPrice}
              pattern="\d*"
              unit={"만원"}
            />
          </QuestionWrapper>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle style={{ marginBottom: 16, display: "block" }}>이 업체 선택을 고민하는 고객에게 한마디 (선택)</QuestionTitle>
            <Textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder={"만약 친구나 가족이 이 업체를 고려 중이라면 뭐라고 하시겠어요?"} style={{ backgroundColor: "white", height: 142 }} />
          </QuestionWrapper>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>작성하신 평가를 다른 고객들에게 공개하시겠습니까?</QuestionTitle>
            <CheckboxList>
              <RadioBoxListItem label={"예"} checked={isRecommandation === true} onChange={() => setIsRecommandation(true)} />
              <RadioBoxListItem label={"아니오"} checked={isRecommandation === false} onChange={() => setIsRecommandation(false)} />
            </CheckboxList>
          </QuestionWrapper>
          <Divider />
          <QuestionWrapper>
            <QuestionTitle>위매치를 다음에도 이용하실 의향이 있으신가요?</QuestionTitle>
            <CheckboxList>
              <RadioBoxListItem label={"예"} checked={isNext === true} onChange={() => setIsNext(true)} />
              <RadioBoxListItem label={"아니오"} checked={isNext === false} onChange={() => setIsNext(false)} />
            </CheckboxList>
          </QuestionWrapper>
        </>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      <ButtonWrapper>
        <StyledButton label={"내 평가 반영하기"} theme={isSurvey === null || (isSurvey && !validate()) ? "disabled" : "primary"} isRound onClick={handleSubmit} />
      </ButtonWrapper>
    </Container>
  );
};

export default FeedbackForm;

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
      p {
        width: 100%;
      }
    }
  }
  h1 {
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

const FeedbackFormList = styled.div`
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
