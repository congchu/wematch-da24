import dayjs from "dayjs"
import {CalendarDate} from "components/wematch-ui/utils/date"

export const isExceedDiffDay = (date: CalendarDate, maxDays: number) => {
    const today = dayjs().add(-1, 'day');
    const diffDay = date.date.diff(today, 'day');

    return diffDay > maxDays
}

export const whatDay = (targetDate?: string): string => {
    const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일')
    const movingOutDay = dayjs(targetDate).day()
    return week[movingOutDay]
}

/* USAGE : YYYY-MM-DD -convert-> YYYY.MM.DD */
export const formatDateDash2Dot = (orgDate: string): string => {
    return orgDate.replace(/-/g, '.')
}