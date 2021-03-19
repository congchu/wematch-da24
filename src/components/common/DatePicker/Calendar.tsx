import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import styled, { css } from 'styled-components'
import { getPrevMonthDays, getCurrentMonthDays, getNextMonthDays, makeMonthArray, CalendarDate } from 'components/wematch-ui/utils/date'
import sol2lun from 'lib/sol2lun'
import { isExceedDiffDay } from 'lib/dateUtil'
import { CALENDAR_MAX_DAYS } from 'constants/values'

import * as colors from 'styles/colors'

interface Props extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'onSelect'> {
    maxDate: Dayjs | Date;
    currentDate: Dayjs;
    selected: string[];
    onSelect? (date: CalendarDate): void;
    disabledDate?: (date: Date) => boolean;
}

interface DayProps extends React.HTMLAttributes<HTMLDivElement> {
    type: 'prev' | 'current' | 'next';
    isSelected: boolean;
    disabled: boolean;
    isLuckyDay?: boolean;
    isExceedDiffDay?: boolean;
}

const CalendarWrapper = styled.div`
    padding: 0 15px 11px 15px
    `;
const S = {
    Container: styled.table`
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    `,
    Header: styled.thead`
        border-bottom: 1px solid ${colors.lineDefault};
        color: ${colors.gray66};
        font-size: 14px;
        font-weight: bold;
        letter-spacing: -1px;
        padding-bottom: 7px;
        
        th {
            height: 23px;
            padding-bottom: 8px;
            border-bottom: 1px solid ${colors.lineDefault};
            font-size: 14px;
            color: ${colors.gray66};
        }
    `,
    Body: styled.tbody`
        &:before {
          content: '';
          display: block;
          height: 8px;
        }
    `
}

const Dot = styled.span`
    width: 8px;
    height: 8px;
    background-color: #F78F16;
    border-radius: 50%;
    margin-top: -8px;
    position: absolute;
    right: 4px;
    border: 1px solid white;
    top: 10px;
`

const DayCell = styled.div<DayProps>`
    width: 40px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    display: ${(({ type }) => type === 'current' ? 'inline-block' : 'none')};
    padding: 12px 0;
    box-sizing: border-box;
    color: ${({ type }) => type !== 'current' ? colors.lineEnd : colors.gray33};
    
    
    ${props => props.isSelected && css`
        background-color: ${colors.pointBlue};
        color: ${colors.white};
        border-radius: 50%;
        font-weight: bold;
        box-shadow: 0 4px 10px 4px rgba(45, 128, 247, 0.24);
    `};
    
    ${props => props.disabled && css`
        color: ${colors.lineEnd};
        cursor: not-allowed;
        text-decoration: line-through;
    `};
    
    ${props => props.isExceedDiffDay && css`
        color: ${colors.lineEnd};
    `};

`

function Day(props: DayProps) {
    const {
        type,
        isSelected,
        disabled,
        children,
        onClick,
        isLuckyDay,
        ...restProps
    } = props

    return (
        <DayCell type={type} isSelected={isSelected} disabled={disabled} isLuckyDay={isLuckyDay}
             onClick={(event) => {
                 if (!disabled) {
                     if (onClick) {
                         onClick(event)
                     }
                 }
             }}
             {...restProps}
        >
            {children}
        </DayCell>
    )
}

export default function Calendar(props: Props) {
    const {
        maxDate,
        currentDate,
        selected,
        onSelect,
        disabledDate,
        ...restProps
    } = props

    const weeks = React.useMemo(() => {
        const FIRST_DAY_OF_WEEK = 0 // sunday

        const firstDay = currentDate.date(1).day()
        const prevMonthDays = getPrevMonthDays(currentDate, firstDay - FIRST_DAY_OF_WEEK)
        const currentMonthDays = getCurrentMonthDays(currentDate)
        const tempDays = [...prevMonthDays, ...currentMonthDays]
        const nextMonthDays = getNextMonthDays(currentDate, tempDays.length)
        return makeMonthArray([...tempDays, ...nextMonthDays])
    }, [currentDate])

    const handleOnSelect = (date: CalendarDate) => {
        if (onSelect) {
            onSelect(date)
        }
    }

    const isSelected = (date: CalendarDate) => {
        return selected.some((selectedDate: string) => {
            return dayjs(selectedDate).isSame(date.date, 'date')
        })
    }


    return (
        <CalendarWrapper>
        <S.Container cellSpacing="0" cellPadding="0" {...restProps}>
            <S.Body>
                {weeks.map((week, i) => {
                    return (
                        <tr key={i}>
                            {week.map((day, k) => {
                                // @ts-ignore
                                const { lDay } = sol2lun.solar2lunar(day.date.year(), day.date.month() + 1, day.date.date());
                                const isLuckyDay = sol2lun.isLuckyDay(lDay)
                                return (
                                     <td key={k}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                                            <Day type={day.type} isSelected={isSelected(day)}
                                                 onClick={() => { handleOnSelect(day) }}
                                                 disabled={disabledDate ? disabledDate(day.date.toDate()) : false}
                                                 isLuckyDay={isLuckyDay}
                                                 isExceedDiffDay={isExceedDiffDay(day, CALENDAR_MAX_DAYS)}
                                            >
                                                {isSelected(day)}
                                                {day.date.date()}
                                            </Day>
                                            {(isLuckyDay && day.type === 'current' && disabledDate && !disabledDate(day.date.toDate())) && <Dot/>}
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </S.Body>
        </S.Container>
        </CalendarWrapper>
    )
}
