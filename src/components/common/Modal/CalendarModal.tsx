import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import ModalTemplate from './ModalTemplate'
import PopupTemplate from "components/wematch-ui/PopupTemplate";
import DatePicker  from 'components/common/DatePicker'
import { CalendarDate } from 'components/wematch-ui/utils/date'
import Styled from "styled-components";
import * as colors from "styles/colors";

interface Props {
    visible: boolean
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
      border-bottom: 1px solid ${colors.lineDefault};
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
    DaysContainer: styled.div`
      width: 100%;
    `,
    Days: styled.table`
        width: 100%;
        color: ${colors.gray66};
        font-size: 15px;
        font-weight: normal;
        letter-spacing: -1px;
        padding-bottom: 14px;
        tr {
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
            
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
            }
        }
       
    `,
}

const CalendarModal: React.FC<Props> = (props) => {
    const {
        visible = false,
        title,
        onClose,
        onOverlayClose,
        onConfirm,
        onSelect,
        selected,
    } = props
    // const [selectedDates, setSelectedDates] = React.useState<string[]>([])

    const rangeStartDate = React.useMemo(() => {
        return dayjs()
    }, [])

    const rangeEndDate = React.useMemo(() => {
        return dayjs().add(55, 'day')
    }, [])

    const disabledDate = (date: Date) => {
        return false
    }

    // const onSelect = (date: CalendarDate) => {
    //     setSelectedDates([date.date.format()])
    // }

    return (
        <PopupTemplate visible={visible} onClose={onClose}>
            <S.Container>
                <S.Header>
                    <S.Title>이사 날짜를 선택해주세요.</S.Title>
                    <S.DaysContainer>
                        <S.Days>
                            <tr>
                                <td><div>일</div></td>
                                <td><div>월</div></td>
                                <td><div>화</div></td>
                                <td><div>수</div></td>
                                <td><div>목</div></td>
                                <td><div>금</div></td>
                                <td><div>토</div></td>
                            </tr>
                        </S.Days>
                    </S.DaysContainer>
                </S.Header>
                <DatePicker currentDate={new Date()} rangeStartDate={rangeStartDate} rangeEndDate={rangeEndDate}
                    onSelect={onSelect} selected={selected} disabledDate={disabledDate} />
            </S.Container>
        </PopupTemplate>
    )
}

export default CalendarModal
