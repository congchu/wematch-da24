import dayjs from "dayjs"
import {CalendarDate} from "components/wematch-ui/utils/date"

export const isExceedDiffDay = (date: CalendarDate, maxDays: number) => {
    const today = dayjs().add(-1, 'day');
    const diffDay = date.date.diff(today, 'day');

    return diffDay > maxDays
}