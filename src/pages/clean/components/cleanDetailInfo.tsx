import React, { useState } from "react";
import Input from "components/common/Input";
import AddressModal from "components/common/Modal/AddressModal";
import CalendarModal from "components/common/Modal/CalendarModal";
import Select from "components/common/Select";
import InputBox from "components/InputBox";
import { Textarea } from "components/wematch-ui";
import { CalendarDate } from "components/wematch-ui/utils/date";
import { CALENDAR_MAX_DAYS } from "constants/values";
import useHashToggle from "hooks/useHashToggle";
import { isExceedDiffDay } from "lib/dateUtil";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setCleanAddress, setCleanDate, setCleanMemo, setHouseSpace, setLivingType, setSelectOptionItem } from "store/clean/actions";
import * as cleanSelector from "store/clean/selectors";
import { Juso, JusoType } from "store/common/types";
import styled from "styled-components";
import * as colors from "styles/colors";

const CleanDetailInfo = () => {
  const livingTypeItem = [
    { key: "아파트", value: "아파트" },
    { key: "주택/빌라", value: "주택/빌라" },
    { key: "원룸/오피스텔(9평이하)", value: "원룸/오피스텔(9평이하)" }
  ];
  const optionItems = ["줄눈시공", "피톤치드", "마루코팅", "식기세척기", "매트리스", "냉장고(단문)", "냉장고(양문)", "전기오븐", "김치냉장고"];
  const dispatch = useDispatch();
  const date = useSelector(cleanSelector.getCleanDate);
  const address = useSelector(cleanSelector.getCleanAddress);
  const addressType = useSelector(cleanSelector.getCleanAddressType);
  const livingType = useSelector(cleanSelector.getCleanLivingType);
  const houseSpace = useSelector(cleanSelector.getCleanHouseSpace);
  const selectOptionItem = useSelector(cleanSelector.getCleanSelectOptionItem);
  const cleanMemo = useSelector(cleanSelector.getCleanMemo);

  const [visibleCalendarModal, setVisibleCalendarModal] = useHashToggle("#calendar");
  const [visibleAddressModal, setVisibleAddressModal] = useHashToggle("#address");
  const [visibleLivingSelectorModal, setVisibleLivingSelectorModal] = useHashToggle("#living-type");

  const onSelectDate = (date: CalendarDate) => {
    if (isExceedDiffDay(date, CALENDAR_MAX_DAYS)) {
      alert(`청소업체조회는 내일부터 최장${CALENDAR_MAX_DAYS}일까지만 비교가 가능합니다.`);
      return;
    }

    dispatch(setCleanDate([date.date.format("YYYY-MM-DD")]));

    debounceSelectDate();
  };

  const handleClickOptionItem = (option: string) => {
    if (selectOptionItem.includes(option)) {
      dispatch(setSelectOptionItem(selectOptionItem.filter((_option) => _option !== option)));
    } else {
      dispatch(setSelectOptionItem([...selectOptionItem, option]));
    }
  };

  const debounceSelectDate = debounce(() => {
    setVisibleCalendarModal(false);
  }, 300);

  const handleSelectAddress = (address: Juso, addressType: JusoType) => {
    dispatch(setCleanAddress({ address, addressType }));
    setVisibleAddressModal(!visibleAddressModal);
  };

  const handleHouseInput = (space: string) => {
    const parseSpace = Number(space);
    if (Number.isInteger(parseSpace) && parseSpace > 0 && parseSpace < 1000) {
      dispatch(setHouseSpace(parseSpace));
    } else if (space === "") {
      dispatch(setHouseSpace(0));
    }
  };

  const handleCleanMemo = (memo: string) => {
    dispatch(setCleanMemo(memo));
  };

  const handleLivingType = (type: string) => {
    dispatch(setLivingType(type));
  };

  const renderAddressValue = () => {
    if (addressType === null) {
      return undefined;
    }
    return addressType === "road" ? address?.roadAddr : address?.jibunAddr;
  };

  return (
    <Container>
      <Section>
        <Title>청소 예정일</Title>
        <InputBox icon={"down"} placeHolder={"날짜 선택"} value={date?.[0]?.split("-")?.join("-")} onClick={() => setVisibleCalendarModal(true)} />
      </Section>
      <Section>
        <Title>청소지</Title>
        <InputBox icon={"search"} placeHolder={"주소 검색"} value={renderAddressValue()} onClick={() => setVisibleAddressModal(true)} />
        <InputBox icon={"down"} placeHolder={"거주형태 선택"} value={livingTypeItem.find((item) => item.key === livingType)?.value} onClick={() => setVisibleLivingSelectorModal(true)} />
        <Input icon={"space"} type={"number"} theme={"default"} placeholder={"평형 입력 ex)24"} border style={{ backgroundColor: "transparent", fontSize: 16, paddingRight: 40 }} onChange={(e) => handleHouseInput(e.target.value)} value={houseSpace > 0 ? houseSpace : ""} pattern="\d*" />
      </Section>
      <Section>
        <Title>옵션 선택</Title>
        <OptionGroups>
          <OptionItem key={"option-not-selected"} selected={selectOptionItem.length === 0} onClick={() => dispatch(setSelectOptionItem([]))}>
            옵션없음
          </OptionItem>
          {optionItems.map((optionItem) => (
            <OptionItem key={optionItem} selected={selectOptionItem.includes(optionItem)} onClick={() => handleClickOptionItem(optionItem)}>
              {optionItem}
            </OptionItem>
          ))}
        </OptionGroups>
      </Section>
      <Section>
        <Title>업체 전달 메모</Title>
        <Textarea value={cleanMemo} placeholder={"업체 전달 메모 작성(선택)"} onChange={(e) => handleCleanMemo(e.target.value)} />
        <InfoText>*무료 전화견적 신청 시 최대 3개 업체와 매칭됩니다.</InfoText>
      </Section>
      <CalendarModal visible={visibleCalendarModal} title="청소" onClose={() => setVisibleCalendarModal(false)} onSelect={onSelectDate} selected={date} serviceType={"clean"} />
      <AddressModal
        visible={visibleAddressModal}
        title={"청소지를 검색해주세요"}
        onClose={() => setVisibleAddressModal(!visibleAddressModal)}
        onConfirm={() => setVisibleAddressModal(!visibleAddressModal)}
        onClick={() => setVisibleAddressModal(!visibleAddressModal)}
        onSelect={handleSelectAddress}
      />
      <Select visible={visibleLivingSelectorModal} items={livingTypeItem} onOverlayClose={() => setVisibleLivingSelectorModal(false)} onClose={() => setVisibleLivingSelectorModal(false)} onSelect={(data: string) => handleLivingType(data)} headerTitle="거주형태 선택" />
    </Container>
  );
};

export default CleanDetailInfo;

const Container = styled.div`
  padding-bottom: 150px;
  section + section {
    margin-top: 40px;
  }
  section > div {
    margin-top: 8px;
  }

  @media (min-width: 768px) {
    padding-bottom: 0;
  }
`;

const Section = styled.section``;

const Title = styled.h3`
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -1px;
  color: ${colors.gray33};
`;

const OptionGroups = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  column-gap: 3px;
  row-gap: 3px;
`;

const OptionItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  color: ${({ selected }) => (selected ? "#1672F7" : colors.gray88)};
  border: 1px solid ${({ selected }) => (selected ? "#1672F7" : "#D7DBE2")};
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const InfoText = styled.span`
  display: block;
  font-size: 16px;
  color: ${colors.gray33};
  margin-top: 20px;
`;
