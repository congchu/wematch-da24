import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import PopupTemplate from "components/wematch-ui/PopupTemplate";
import DatePicker from "components/common/DatePicker";
import { CalendarDate } from "components/wematch-ui/utils/date";
import * as colors from "styles/colors";
import { IServiceType } from "types/partner";

interface Props {
  serviceType: IServiceType;
  moveType?: string;
  visible: boolean;
  title: string;
  onClose?: () => void;
  onOverlayClose?: () => void;
  onConfirm?: () => void;
  onSelect?: (date: CalendarDate) => void;
  selected?: string[] | undefined;
}

const S = {
  Container: styled.div`
    position: relative;
    height: 100%;
    padding-top: 56px !important;
    @media (min-width: 1200px) {
      margin: 0 0 10px 0;
      padding: 0;
    }
  `,
  Header: styled.header`
    border-bottom: 0.5px solid ${colors.lineDefault};
    padding-right: 24px;
    padding-left: 24px;
    padding-top: 16px;
    background: white;
  `,
  Title: styled.div`
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    padding-bottom: 16px;
  `,
  SubTitle: styled.div`
    color: #e9687f;
    font-size: 14px;
    padding-bottom: 16px;
  `,
  DaysContainer: styled.div`
    width: 100%;
    background: ${colors.white};
    border-bottom: 0.5px solid ${colors.lineDefault};
  `,
  Days: styled.table`
    width: 100%;
    color: ${colors.gray66};
    font-size: 15px;
    font-weight: normal;
    letter-spacing: -1px;
    padding-bottom: 14px;
    tr {
      padding: 0 24px;
      box-sizing: border-box;
      justify-content: space-between;
      width: 100%;
      display: flex;
    }
    td {
      width: 100%;
      text-align: center;
      height: 23px;
      font-size: 15px;
      color: ${colors.gray66};
      padding: 16px 0;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }
    }
  `
};

const CalendarModal: React.FC<Props> = (props) => {
  const { visible = false, title, onClose, onSelect, selected, serviceType, moveType } = props;
  const [rangeStartDate, setRangeStartDate] = useState(dayjs());
  const [rangeEndDate, setRangeEndDate] = useState(dayjs().add(55, "day"));

  useEffect(() => {
    // ?????? ???????????? +1??? (21.11.18 Koo)
    if (serviceType === "clean") {
      setRangeEndDate(dayjs().add(56, "day"));

      //????????????, ????????? ????????? ?????? +1?????? 55?????? ?????? ?????? (21.10.21 Koo)
    } else if (moveType === "house" || moveType === "office") {
      setRangeStartDate(dayjs().add(1, "day"));
      setRangeEndDate(dayjs().add(56, "day"));
    }
  }, [moveType]);

  const disabledDate = (date: Date) => {
    return false;
  };

  return (
    <PopupTemplate visible={visible} onClose={onClose}>
      <S.Container>
        <S.Header>
          <S.Title>{title} ????????? ??????????????????</S.Title>
        </S.Header>
        <S.DaysContainer>
          <S.Days>
            <tbody>
              <tr>
                <td>
                  <div>???</div>
                </td>
                <td>
                  <div>???</div>
                </td>
                <td>
                  <div>???</div>
                </td>
                <td>
                  <div>???</div>
                </td>
                <td>
                  <div>???</div>
                </td>
                <td>
                  <div>???</div>
                </td>
                <td>
                  <div>???</div>
                </td>
              </tr>
            </tbody>
          </S.Days>
        </S.DaysContainer>
        <DatePicker currentDate={new Date()} rangeStartDate={rangeStartDate} rangeEndDate={rangeEndDate} onSelect={onSelect} selected={selected} disabledDate={disabledDate} title={title} serviceType={serviceType} />
      </S.Container>
    </PopupTemplate>
  );
};

export default CalendarModal;
