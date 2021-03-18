import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'

import dayjs, { Dayjs } from 'dayjs'

import Calendar from './Calendar'
import {CalendarDate, getCurrentMonthDays} from 'components/wematch-ui/utils/date'
import { Next } from 'components/wematch-ui/Icon'

import * as colors from 'styles/colors'

/**
 * 2020.06.08 Ryan
 * TODO wematch-ui 상속받아서 custom 처리하려 했으나, DayCell, Day 등 custom 해야할 요소들이 상속 불가능해서 일단은 복사해서 작업 이후에 npm으로 변경되면 수정 변경할 예정
 * */

const S = {
    Container: styled.div`
      position: relative;
      overflow: scroll;
      height: calc(${window.innerHeight}px - 56px - 100px);
      
      @media screen and (min-width: 768px) {
        height: calc(480px - 56px - 100px);
      }
    `,
    Wrapper: styled.div`
      margin-bottom: 20px;
    `,
    CalendarHeaderWrapper: styled.div`
        position: relative;
        padding: 21px 24px 21px;
    `,
    CalendarHeader: styled.header`
        position: relative;
        padding: 21px 24px;
        font-size: 16px;
        line-height: 16px;
        color: ${colors.gray33};
        letter-spacing: -1px;
        font-weight: bold;
        text-align: left;
        span {
          user-select: none;
        }

        button {
            font-size: 14px;
            cursor: pointer;
            position: absolute;
            display: inline-flex;
        
            &:nth-child(1) {
              left: 0;
            }
            &:last-child {
              right: 0; 
            }
        }
    `,
    CurrentMonth: styled.span``,
    CalendarContainer: styled.div``,
    Info: styled.div`
      padding: 16px;
      margin: 30px 24px 78px 24px;
      border: 1px solid #D7DBE2;
      border-radius: 6px;
      color: #333333;
      
      @media screen and (min-width: 768px) {
        margin-bottom: 70px;
      }
      .title {
        color: ${colors.gray33};
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .content {
        font-size: 14px;
        line-height: 21px;
        color: ${colors.gray66};
        font-weight: normal;
      } 
    `,
    Toast: styled.div`
      width: 100%;
      position: fixed;
      bottom: 0;
      box-sizing: border-box;
      
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        margin: 8px;
        background-color: ${colors.gray33};
        opacity: 0.96;
        height: 56px;
      
      }
      p {
        font-size: 14px;
        line-height: 21px;
        color: ${colors.white};
      }
    `,
}

const Dot = styled.span`
    width: 8px;
    height: 8px;
    background-color: #F78F16;
    border-radius: 50%;
    margin-right: 12px;
`

interface Props {
    currentDate?: Dayjs | Date;
    selected?: string[];
    onSelect? (date: CalendarDate): void;
    rangeStartDate?: Dayjs | Date;
    rangeEndDate?: Dayjs | Date;
    disabledDate?: (date: Date) => boolean;
}

const DatePicker: React.FC<Props> = (props) => {
    const {
        currentDate,
        onSelect,
        disabledDate,
        selected = [],
        rangeStartDate,
        rangeEndDate
    } = props

    const initialDate = (() => {
        if (currentDate) {
            if (currentDate instanceof Date) {
                return dayjs(currentDate)
            }
        }
        return dayjs()
    })()

    const [currentDateValue, setCurrentDateValue] = React.useState<Dayjs>(initialDate)
    const maxDate = currentDateValue.add(55, 'day')

    const disabledDateWithRange = React.useCallback((date: Date) => {
        const isBeforeRangeStartDate = rangeStartDate ? date < rangeStartDate : false
        const isAfterRangeEndDate = rangeEndDate ? date > rangeEndDate : false
        const isDisabledDate = disabledDate ? disabledDate(date) : false

        return isBeforeRangeStartDate || isAfterRangeEndDate || isDisabledDate
    }, [rangeStartDate, rangeEndDate, disabledDate])

    const diffMonth = Math.ceil(maxDate.diff(currentDateValue, 'month', true)) + 1
    let arr = new Array(diffMonth).fill(undefined).map((val,idx) => idx);
    return (
        <S.Container>
            <S.Wrapper>
                {arr.map(index => {
                    let date = dayjs(new Date()).add(index, "month");
                    return (
                      <>
                          <S.CalendarHeader>{`${currentDateValue.year()}년 ${currentDateValue.month() + 1 + index}월`}</S.CalendarHeader>
                          <Calendar currentDate={date} onSelect={onSelect} disabledDate={disabledDateWithRange} selected={selected} maxDate={maxDate}/>
                      </>
                    )
                })}
                <S.Info>
                    <p className="title"><em>견적신청 가능 날짜</em></p>
                    <p className="content">오늘부터 55일 이내 날짜에서만 이사업체 견적신청이 가능해요.</p>
                </S.Info>
                <S.Toast>
                    <div>
                        <Dot/><p>손 없는 날/금~토요일은 가격이 비쌀 수 있어요.</p>
                    </div>
                </S.Toast>
            </S.Wrapper>
        </S.Container>
    )
}

export default DatePicker