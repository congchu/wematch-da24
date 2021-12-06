import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components";
import { gray33 } from "styles/colors";
import { resetButton } from "styles/mixins";
import Calendar from "./Calendar";
import { CalendarDate } from "../utils/date";

interface Props {
  currentDate?: Dayjs | Date;
  selected?: string[];
  onSelect?(date: CalendarDate): void;
  rangeStartDate?: Dayjs | Date;
  rangeEndDate?: Dayjs | Date;
  disabledDate?: (date: Date) => boolean;
}

const S = {
  Container: styled.div`
    max-width: 312px;
    header {
      position: relative;
      text-align: center;
      margin-bottom: 24px;
      color: ${gray33};
      letter-spacing: -1px;

      button {
        ${resetButton};
        font-size: 14px;
        position: absolute;

        &:nth-child(1) {
          left: 0;
        }
        &:last-child {
          right: 0;
        }
      }
    }
  `,
  CurrentMonth: styled.span`
    line-height: 16px;
    font-size: 16px;
    font-weight: bold;
  `,
  CalendarContainer: styled.div`
    max-width: 280px;
    margin: 0 auto;
  `
};

export function DatePicker(props: Props) {
  const { currentDate, onSelect, disabledDate, selected = [], rangeStartDate, rangeEndDate } = props;
  const initialDate = (() => {
    if (currentDate) {
      if (currentDate instanceof Date) {
        return dayjs(currentDate);
      }
    }
    return dayjs();
  })();

  const [currentDateValue, setCurrentDateValue] = React.useState<Dayjs>(initialDate);

  const rangeStartMonthDate = React.useMemo(() => {
    if (rangeStartDate) {
      return dayjs(rangeStartDate).startOf("month");
    }
    return null;
  }, [rangeStartDate]);

  const rangeEndMonthDate = React.useMemo(() => {
    if (rangeEndDate) {
      return dayjs(rangeEndDate).endOf("month");
    }
    return null;
  }, [rangeEndDate]);

  const prevMonthDate = React.useMemo(() => {
    return dayjs(currentDateValue.month(currentDateValue.month() - 1));
  }, [currentDateValue]);

  const nextMonthDate = React.useMemo(() => {
    return dayjs(currentDateValue.month(currentDateValue.month() + 1));
  }, [currentDateValue]);

  const isBeforeRangeStartMonthDate = React.useMemo(() => {
    if (!rangeStartMonthDate) {
      return false;
    }
    return prevMonthDate.isBefore(rangeStartMonthDate);
  }, [rangeStartMonthDate, prevMonthDate]);

  const isAfterRangeEndMonthDate = React.useMemo(() => {
    if (!rangeEndMonthDate) {
      return false;
    }
    return nextMonthDate.isAfter(rangeEndMonthDate);
  }, [rangeEndMonthDate, nextMonthDate]);

  const handlePrevClick = () => setCurrentDateValue(prevMonthDate);

  const handleNextClick = () => setCurrentDateValue(nextMonthDate);

  const disabledDateWithRange = React.useCallback(
    (date: Date) => {
      const isBeforeRangeStartDate = rangeStartDate ? date < rangeStartDate : false;
      const isAfterRangeEndDate = rangeEndDate ? date > rangeEndDate : false;
      const isDisabledDate = disabledDate ? disabledDate(date) : false;

      return isBeforeRangeStartDate || isAfterRangeEndDate || isDisabledDate;
    },
    [rangeStartDate, rangeEndDate, disabledDate]
  );

  return (
    <S.Container>
      <header>
        {!isBeforeRangeStartMonthDate && <button onClick={handlePrevClick}>이전달</button>}
        <S.CurrentMonth>
          {currentDateValue.year()}년 {currentDateValue.month() + 1}월
        </S.CurrentMonth>
        {!isAfterRangeEndMonthDate && <button onClick={handleNextClick}>다음달</button>}
      </header>
      <S.CalendarContainer>
        <Calendar currentDate={currentDateValue} onSelect={onSelect} disabledDate={disabledDateWithRange} selected={selected} />
      </S.CalendarContainer>
    </S.Container>
  );
}
