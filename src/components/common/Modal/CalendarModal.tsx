import React from 'react'
import Styled from 'styled-components'
import dayjs from "dayjs";

import ModalTemplate from './ModalTemplate'
import DatePicker  from "components/common/DatePicker"
import { CalendarDate } from "components/wematch-ui/utils/date";

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
    `
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
        <ModalTemplate visible={visible} title={title} warning
           onClose={onClose} onOverlayClose={onOverlayClose} onConfirm={onConfirm}>
            <S.Container>
                <DatePicker currentDate={new Date()} rangeStartDate={rangeStartDate} rangeEndDate={rangeEndDate}
                    onSelect={onSelect} selected={selected} disabledDate={disabledDate} />
            </S.Container>
        </ModalTemplate>
    )
}

export default CalendarModal