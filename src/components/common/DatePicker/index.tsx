import React, { useMemo } from 'react'
import Styled, { css } from 'styled-components'

import dayjs, { Dayjs } from 'dayjs'
import Calendar from './Calendar'
import { CalendarDate } from 'components/wematch-ui/utils/date'
import { Next } from 'components/wematch-ui/Icon'

import * as colors from 'styles/colors'

/**
 * 2020.06.08 Ryan
 * TODO wematch-ui 상속받아서 custom 처리하려 했으나, DayCell, Day 등 custom 해야할 요소들이 상속 불가능해서 일단은 복사해서 작업 이후에 npm으로 변경되면 수정 변경할 예정
 * */

const S = {
    Container: Styled.div`
    `,
    CalendarHeaderWrapper: Styled.div`
        position: relative;
        padding: 21px 24px 21px;
    `,
    CalendarHeader: Styled.header`
        position: relative;
        text-align: center;
        font-size: 16px;
        line-height: 16px;
        color: ${colors.gray33};
        letter-spacing: -1px;
     
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
    CurrentMonth: Styled.span``,
    CalendarContainer: Styled.div``,
}

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

    const rangeStartMonthDate = React.useMemo(() => {
        if (rangeStartDate) {
            return dayjs(rangeStartDate).startOf('month')
        }
        return null
    }, [rangeStartDate])

    const rangeEndMonthDate = React.useMemo(() => {
        if (rangeEndDate) {
            return dayjs(rangeEndDate).endOf('month')
        }
        return null
    }, [rangeEndDate])

    const prevMonthDate = React.useMemo(() => {
        return dayjs(currentDateValue.month(currentDateValue.month() - 1))
    }, [currentDateValue])

    const nextMonthDate = React.useMemo(() => {
        return dayjs(currentDateValue.month(currentDateValue.month() + 1))
    }, [currentDateValue])

    const isBeforeRangeStartMonthDate = React.useMemo(() => {
        if (!rangeStartMonthDate) {
            return false
        }
        return prevMonthDate.isBefore(rangeStartMonthDate)

    }, [rangeStartMonthDate, prevMonthDate])

    const isAfterRangeEndMonthDate = React.useMemo(() => {
        if (!rangeEndMonthDate) {
            return false
        }
        return nextMonthDate.isAfter(rangeEndMonthDate)

    }, [rangeEndMonthDate, nextMonthDate])

    const handlePrevClick = () => setCurrentDateValue(prevMonthDate)

    const handleNextClick = () => setCurrentDateValue(nextMonthDate)

    const disabledDateWithRange = React.useCallback((date: Date) => {
        const isBeforeRangeStartDate = rangeStartDate ? date < rangeStartDate : false
        const isAfterRangeEndDate = rangeEndDate ? date > rangeEndDate : false
        const isDisabledDate = disabledDate ? disabledDate(date) : false

        return isBeforeRangeStartDate || isAfterRangeEndDate || isDisabledDate
    }, [rangeStartDate, rangeEndDate, disabledDate])

    return (
        <S.Container>
            <S.CalendarHeaderWrapper>
                <S.CalendarHeader>
                    {!isBeforeRangeStartMonthDate &&
                        <button onClick={handlePrevClick}>
                            <Next size={16} style={{transform: 'scale(-1,1)'}}/>
                            <div>이전</div>
                        </button>}
                    <S.CurrentMonth>{currentDateValue.month() + 1}월</S.CurrentMonth>
                    {!isAfterRangeEndMonthDate &&
                        <button onClick={handleNextClick}>
                            <div>다음</div>
                            <Next size={16}/>
                        </button>}
                </S.CalendarHeader>
            </S.CalendarHeaderWrapper>
            <Calendar currentDate={currentDateValue} onSelect={onSelect} disabledDate={disabledDateWithRange} selected={selected} />
        </S.Container>
    )
}

export default DatePicker