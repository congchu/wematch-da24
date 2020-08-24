import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import styled, { css } from 'styled-components'
import { white, pointBlue, lineDefault, lineEnd, gray66, gray33 } from 'styles/colors'
import { getPrevMonthDays, getCurrentMonthDays, getNextMonthDays, makeMonthArray, CalendarDate } from '../utils/date'

interface Props extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'onSelect'> {
  currentDate: Dayjs;
  selected: string[];
  onSelect? (date: CalendarDate): void;
  disabledDate?: (date: Date) => boolean;
}

interface DayProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'prev' | 'current' | 'next';
  isSelected: boolean;
  disabled: boolean;
}

const S = {
  Container: styled.table`
    width: 100%;
    background-color: ${white};
    border-collapse: collapse;
    border-spacing: 0;
  `,
  Header: styled.thead`
    border-bottom: 1px solid ${lineDefault};
    color: ${gray66};
    letter-spacing: -1px;
    font-size: 13px;
    padding-bottom: 7px;
  `,
  Body: styled.tbody`
    &:before {
      content: '';
      display: block;
      height: 8px;
    }
  `
}

const DayCell = styled.div<DayProps>`
    width: 40px;
    height: 40px;
    font-size: 13px;
    text-align: center;

    cursor: pointer;
    display: inline-block;
    padding: 12px 0;
    box-sizing: border-box;
    color: ${({ type }) => type !== 'current' ? lineEnd : gray33};
    ${props =>
    props.isSelected && css`
      background-color: ${pointBlue};
      color: ${white};
      border-radius: 50%;
      font-weight: bold;
      box-shadow: 0 4px 10px 4px rgba(45, 128, 247, 0.24);
    `
}
    ${props =>
    props.disabled && css`
      color: ${lineEnd};
    `
}
`

export function Day(props: DayProps) {
  const {
    type,
    isSelected,
    disabled,
    children,
    onClick,
    ...restProps
  } = props

  return (
    <DayCell type={type} isSelected={isSelected}
      disabled={disabled}
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
    <S.Container cellSpacing="0" cellPadding="0" {...restProps}>
      <S.Header>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </S.Header>
      <S.Body>
        {weeks.map((week, i) => {
          return (<tr key={i}>
            {week.map((day, k) => {
              return (<td key={k}>
                <Day type={day.type} isSelected={isSelected(day)}
                  onClick={() => {
                    handleOnSelect(day)
                  }}
                  disabled={disabledDate ? disabledDate(day.date.toDate()) : false}>
                  {isSelected(day)}
                  { day.date.date() }
                </Day>
              </td>)
            })}
          </tr>)
        })}
      </S.Body>
    </S.Container>

  )
}
