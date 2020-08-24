import React from 'react'
import DatePicker from './index'
import { CalendarDate } from 'components/wematch-ui/utils/date'
import dayjs from 'dayjs'

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import GlobalStyled from 'styles/global'

export default  {
    title: 'components|DatePicker',
    component: DatePicker,
    decorators: [withKnobs]
};

const DatePickerSample = () => {
    // const beforeDisabledDate = (date: Date) => {
    //     const today = new Date()
    //     return date < today
    // }
    //
    // const afterDisabledDate = (date: Date) => {
    //     const compareDate = new Date().setDate(date.getDate() + 55);
    //     return date > new Date(compareDate)
    // }

    const rangeStartDate = React.useMemo(() => {
        return dayjs()
    }, [])

    const rangeEndDate = React.useMemo(() => {
        return dayjs().add(2, 'month').endOf('month')
    }, [])

    const disabledDate = (date: Date) => {
        const today = new Date()
        const compareDate = new Date().setDate(date.getDate() + 55)
        // return today > date || date > new Date(compareDate)
        return false
    }

    return (
        <>
            <GlobalStyled />
            <DatePicker currentDate={new Date()} onSelect={() => console.log('aa')} disabledDate={disabledDate} rangeStartDate={rangeStartDate} rangeEndDate={rangeEndDate} />
        </>
    )
}

export const defaultDatePicker = () => <DatePickerSample />;

defaultDatePicker.story = {
    name: 'Default DatePicker'
};
