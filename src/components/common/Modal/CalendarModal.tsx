import React from 'react'
import Styled from 'styled-components'
import dayjs from 'dayjs'

import ModalTemplate from './ModalTemplate'
import DatePicker  from 'components/common/DatePicker'
import { CalendarDate } from 'components/wematch-ui/utils/date'

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
    Container: Styled.div`
        margin-top: 35px;
        padding: 0 24px 6px;
            
        @media (min-width: 1200px) {
            margin: 5px 0 10px 0;
            padding: 0;
        }
    `,
    Info: Styled.div`
      padding: 16px 16px 14px;
      margin: 30px 10px 0;
      border: 1px solid #D7DBE2;
      border-radius: 6px;
      color: #333333;
      
      .infoTitle{
        position: relative;
        padding-left: 13px;
        font-size: 14px;
        line-height: 21px;
        .dot {
          position: absolute;
          top: 5px;
          left: -1px;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #F79016;
      }
      em {
        display: inline-block;
        margin-bottom: 2px;
        font-size: 15px;
        font-weight: 600;
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
        <ModalTemplate visible={visible} title={title} warning panelHeight={620}
           onClose={onClose} onOverlayClose={onOverlayClose} onConfirm={onConfirm}>
            <S.Container>
                <DatePicker currentDate={new Date()} rangeStartDate={rangeStartDate} rangeEndDate={rangeEndDate}
                    onSelect={onSelect} selected={selected} disabledDate={disabledDate} />
                <S.Info>
                    <p className="infoTitle"><em>조회가능 날짜</em><br />내일부터 55일 이내 날짜에만 이사업체 <br /> 조회가 가능해요!</p>
                </S.Info>
            </S.Container>
        </ModalTemplate>
    )
}

export default CalendarModal
