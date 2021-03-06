import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import Select from "components/common/Select";
import CalendarModal from "components/common/Modal/CalendarModal";
import AddressModal from "components/common/Modal/AddressModal";
import { CalendarDate } from "components/wematch-ui/utils/date";

import useHashToggle from "hooks/useHashToggle";

import { CALENDAR_MAX_DAYS } from "constants/values";

import { Juso, JusoType } from "store/common/types";
import * as commonSelector from "store/common/selectors";
import * as commonActions from "store/common/actions";
import * as formSelector from "store/form/selectors";
import * as formActions from "store/form/actions";

import { isExceedDiffDay } from "lib/dateUtil";
import { dataLayer } from "lib/dataLayerUtil";
import * as colors from "styles/colors";
import InputBox from "components/InputBox";
import { EFormError } from "../MoveForm";
import { replaceContentString } from "lib/stringUtil";

type MoveInputProps = {
  departAddress: string;
  departFloor: string;
  arriveAddress: string;
  arriveFloor: string;
  userName: string;
  phone: string;
};

interface Props extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  type: formActions.MoveTypeProp;
  onChange?(estimate: MoveInputProps): void;
  formValidations: EFormError[];
}

const S = {
  Container: styled.div<{ type: formActions.MoveTypeProp }>`
    display: ${(props) => (props.type === "house" || props.type === "office" ? "block" : "none")};
  `,
  Title: styled.h3`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -1px;
    color: ${colors.gray33};
    margin-bottom: 16px;
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
  `,
  Group: styled.div`
    display: flex;
    flex-direction: row;
  `,
  TextContainer: styled.div`
    overflow: hidden;
    position: relative;
    height: 80px;
    padding: 12px 16px;
    border: 1px solid ${colors.lineDefault};
    background-color: #f8f9fb;
    border-radius: 6px;
  `,
  Textarea: styled.textarea`
    display: block;
    width: 100%;
    border: 0 none;
    resize: none;
    outline: none;
    background-color: transparent;
    letter-spacing: -1px;
    height: 110px;
    font-size: 16px;
    line-height: 28px;
    border-radius: 4px;
    &::placeholder {
      color: ${colors.gray88};
      /* letter-spacing: -1px; */
    }
  `,
  ContentsWrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    span {
      margin-top: 4px;
      font-size: 15px;
      text-align: end;
      color: ${colors.gray88};
    }
  `
};

const MoveInput: React.FC<Props> = (props) => {
  const { type, onChange, formValidations, ...restProps } = props;

  const dispatch = useDispatch();

  const getMoveType = useSelector(formSelector.getType);
  const getMoveDate = useSelector(formSelector.getDate);
  const getMoveAddress = useSelector(formSelector.getAddress);
  const getMoveFloor = useSelector(formSelector.getFloor);
  const getJuso = useSelector(commonSelector.getJuso);
  const getContents = useSelector(formSelector.getContents);

  const floorItems = [
    { key: "??????", value: "?????????" },
    { key: "1", value: "1???" },
    { key: "2", value: "2???" },
    { key: "3", value: "3???" },
    { key: "4", value: "4???" },
    { key: "5", value: "5???" },
    { key: "6", value: "6???" },
    { key: "7", value: "7???" },
    { key: "8", value: "8???" },
    { key: "9", value: "9???" },
    { key: "10", value: "10???" },
    { key: "11", value: "11???" },
    { key: "12", value: "12???" },
    { key: "13", value: "13???" },
    { key: "14", value: "14???" },
    { key: "15", value: "15???" },
    { key: "16", value: "16???" },
    { key: "17", value: "17???" },
    { key: "18", value: "18???" },
    { key: "19", value: "19???" },
    { key: "20", value: "20???" },
    { key: "21", value: "21???" },
    { key: "22", value: "22???" },
    { key: "23", value: "23???" },
    { key: "24", value: "24???" },
    { key: "25", value: "25??? ??????" }
  ];

  const [visibleCalendarModal, setVisibleCalendarModal] = useHashToggle("#calendar");
  const [visibleStartAddressModal, setVisibleStartAddressModal] = useHashToggle("#startAddress");
  const [visibleStartFloorModal, setVisibleStartFloorModal] = useHashToggle("#startFloor");
  const [visibleEndAddressModal, setVisibleEndAddressModal] = useHashToggle("#endAddress");
  const [visibleEndFloorModal, setVisibleEndFloorModal] = useHashToggle("#endFloor");

  const getMoveTypeText = useCallback(() => {
    if (getMoveType === "house") {
      return "??????";
    } else if (getMoveType === "office") {
      return "?????????";
    }
  }, [getMoveType]);

  const toggleCalendarCancel = () => {
    setVisibleCalendarModal(!visibleCalendarModal);
  };

  const toggleStartAddress = () => setVisibleStartAddressModal(!visibleStartAddressModal);
  const toggleStartFloor = () => setVisibleStartFloorModal(!visibleStartFloorModal);
  const toggleEndAddress = () => setVisibleEndAddressModal(!visibleEndAddressModal);
  const toggleEndFloor = () => setVisibleEndFloorModal(!visibleEndFloorModal);

  const onSelectDate = (date: CalendarDate) => {
    if (isExceedDiffDay(date, CALENDAR_MAX_DAYS)) {
      alert(`????????????????????? ???????????? ??????${CALENDAR_MAX_DAYS}???????????? ????????? ???????????????.`);
      return;
    }

    dispatch(formActions.setMoveDate([date.date.format("YYYY-MM-DD")]));
    const selectedDate = date.date.format("YYYY-MM-DD");

    dataLayer({
      event: "input_info",
      category: "?????????_??????_?????????_1",
      label: selectedDate,
      action: "????????????",
      CD6: getMoveTypeText()
    });

    debounceSelectDate();
  };

  const debounceSelectDate = debounce(() => {
    setVisibleCalendarModal(false);
  }, 300);

  const onSelectStartAddress = (juso: Juso, type: JusoType) => {
    dispatch(
      formActions.setAddress({
        ...getMoveAddress,
        start: juso.roadAddr
      })
    );

    dispatch(
      commonActions.setJuso({
        ...getJuso,
        start: juso,
        type: {
          ...getJuso.type,
          start: type
        }
      })
    );

    dataLayer({
      event: "input_info",
      category: "?????????_??????_?????????_1",
      label: juso.roadAddr,
      action: "?????????",
      CD6: getMoveTypeText()
    });

    toggleStartAddress();
  };

  const onSelectStartFloorAddress = (data: string) => {
    dispatch(
      formActions.setFloor({
        ...getMoveFloor,
        start: data
      })
    );

    dataLayer({
      event: "input_info",
      category: "?????????_??????_?????????_1",
      label: data + "???",
      action: "?????????_??????",
      CD6: getMoveTypeText()
    });
  };

  const onSelectEndAddress = (juso: Juso, type: JusoType) => {
    dispatch(
      formActions.setAddress({
        ...getMoveAddress,
        end: juso.roadAddr
      })
    );

    dispatch(
      commonActions.setJuso({
        ...getJuso,
        end: juso,
        type: {
          ...getJuso.type,
          end: type
        }
      })
    );

    dataLayer({
      event: "input_info",
      category: "?????????_??????_?????????_1",
      label: juso.roadAddr,
      action: "?????????",
      CD6: getMoveTypeText()
    });

    toggleEndAddress();
  };

  const onSelectEndFloorAddress = (data: string) => {
    dispatch(
      formActions.setFloor({
        ...getMoveFloor,
        end: data
      })
    );

    dataLayer({
      event: "input_info",
      category: "?????????_??????_?????????_1",
      label: data + "???",
      action: "?????????_??????",
      CD6: getMoveTypeText()
    });
  };

  const renderFloor = useCallback(
    (type: "start" | "end") => {
      return getMoveFloor[type] ? (getMoveFloor[type] === "25" ? `${getMoveFloor[type]}??? ??????` : `${getMoveFloor[type]}???`) : getMoveFloor[type];
    },
    [getMoveFloor]
  );

  const renderAddressValue = useCallback((type: "start" | "end") => (getJuso.type?.[type] === "road" ? getJuso[type]?.roadAddr : getJuso[type]?.jibunAddr), [getJuso]);

  return (
    <S.Container id="dsl_move_input_terms_1" {...restProps} type={type}>
      <S.Form>
        <S.Title>?????? ??????</S.Title>
        <InputBox icon={"down"} placeHolder={"?????? ??????"} value={getMoveDate[0]?.split("-")?.join(".")} onClick={() => setVisibleCalendarModal(true)} error={formValidations.includes(EFormError.DATE)} />
        {/* <Input theme="default" border readOnly placeholder="???????????????" onClick={() => setVisibleCalendarModal(true)} value={getMoveDate} style={{ backgroundColor: 'transparent' }} icon="down" /> */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
          <S.Title>????????? ??????</S.Title>
          <InputBox icon={"search"} placeHolder={"?????? ??????"} value={renderAddressValue("start")} onClick={toggleStartAddress} style={{ marginBottom: "8px" }} error={formValidations.includes(EFormError.START_ADDRESS)} />
          {/* <Input theme="default" border readOnly placeholder="?????????" rootStyle={{ width: '100%' }} onClick={toggleStartAddress} value={getJuso.type?.start === 'road' ? getJuso.start?.roadAddr : getJuso.start?.jibunAddr} style={{ backgroundColor: 'transparent' }} icon="search" /> */}
          <InputBox icon={"down"} placeHolder={"?????? ??????"} value={renderFloor("start")} onClick={toggleStartFloor} error={formValidations.includes(EFormError.START_FLOOR)} />
          {/* <Input theme="default" border readOnly icon="down" placeholder="?????? ??????" rootStyle={{ width: '100%' }} onClick={toggleStartFloor} value={renderFloor('start')} style={{ backgroundColor: 'transparent' }} /> */}
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
          <S.Title>????????? ??????</S.Title>
          <InputBox icon={"search"} placeHolder={"?????? ??????"} value={renderAddressValue("end")} onClick={toggleEndAddress} style={{ marginBottom: "8px" }} error={formValidations.includes(EFormError.END_ADDRESS)} />
          {/* <Input theme="default" border readOnly placeholder="?????????" rootStyle={{ width: '100%' }} onClick={toggleEndAddress} value={getJuso.type?.end === 'road' ? getJuso.end?.roadAddr : getJuso.end?.jibunAddr} style={{ backgroundColor: 'transparent' }} icon="search" /> */}
          <InputBox icon={"down"} placeHolder={"?????? ??????"} value={renderFloor("end")} onClick={toggleEndFloor} error={formValidations.includes(EFormError.END_FLOOR)} />
          {/* <Input theme="default" border readOnly icon="down" placeholder="??????" rootStyle={{ width: '100%' }} onClick={toggleEndFloor} value={getMoveFloor.end ? getMoveFloor.end + '???' : getMoveFloor.end} style={{ backgroundColor: 'transparent' }} /> */}
        </div>

        <S.ContentsWrapper>
          <S.Title>?????? ?????? ??????(??????)</S.Title>
          <S.TextContainer>
            <S.Textarea
              placeholder="???????????? ????????? ????????? ????????? ????????? ?????????."
              value={getContents}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  dispatch(formActions.setContents(replaceContentString(e.target.value)));
                }
              }}
            />
          </S.TextContainer>
          <span>
            <span style={{ color: colors.gray33 }}>{`${getContents ? getContents.length : 0}`}</span>/500???
          </span>
        </S.ContentsWrapper>
      </S.Form>
      <CalendarModal visible={visibleCalendarModal} title="??????" onClose={toggleCalendarCancel} onSelect={onSelectDate} selected={getMoveDate} serviceType={"move"} moveType={getMoveType} />
      <AddressModal visible={visibleStartAddressModal} title="???????????? ??????????????????" onClose={toggleStartAddress} onConfirm={toggleStartAddress} onClick={toggleStartAddress} onSelect={onSelectStartAddress} />
      <Select visible={visibleStartFloorModal} items={floorItems} onOverlayClose={toggleStartFloor} onClose={toggleStartFloor} onSelect={onSelectStartFloorAddress} headerTitle="?????? ??????" />
      <AddressModal visible={visibleEndAddressModal} title="???????????? ??????????????????" onClose={toggleEndAddress} onConfirm={toggleEndAddress} onClick={toggleEndAddress} onSelect={onSelectEndAddress} />
      <Select visible={visibleEndFloorModal} items={floorItems} onOverlayClose={toggleEndFloor} onClose={toggleEndFloor} onSelect={onSelectEndFloorAddress} headerTitle="?????? ??????" />
    </S.Container>
  );
};

export default MoveInput;
