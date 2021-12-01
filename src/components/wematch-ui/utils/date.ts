import { range } from "lodash";
import dayjs, { Dayjs } from "dayjs";

export interface CalendarDate {
  type: "prev" | "next" | "current";
  date: Dayjs;
}

export const getPrevMonthDays = (currentDate: Dayjs, amount: number): CalendarDate[] => {
  if (amount <= 0) {
    return [];
  }
  const lastDateOfPrevMonth = currentDate.startOf("month").subtract(1, "day");
  const lastDayOfPrevMonth = lastDateOfPrevMonth.date();
  return range(amount).map((_, index) => {
    const day = lastDayOfPrevMonth - (amount - index - 1);
    const date = new Date(lastDateOfPrevMonth.year(), lastDateOfPrevMonth.month(), day);
    return { type: "prev", date: dayjs(date) };
  });
};

export const getNextMonthDays = (currentDate: Dayjs, daysLength: number): CalendarDate[] => {
  const maxDaysLength = 35;
  return range(maxDaysLength - daysLength).map((_, index) => {
    const day = index + 1;
    const date = new Date(currentDate.year(), currentDate.month() + 1, day);
    return { type: "next", date: dayjs(date) };
  });
};

export const getCurrentMonthDays = (currentDate: Dayjs): CalendarDate[] => {
  const daysInMonth = currentDate.daysInMonth();
  return range(daysInMonth).map((_, index) => {
    const day = index + 1;
    const date = new Date(currentDate.year(), currentDate.month(), day);
    return { type: "current", date: dayjs(date) };
  });
};

export const makeMonthArray = (days: CalendarDate[]): CalendarDate[][] => {
  const nestedArr = range(days.length / 7).map((_, index) => {
    const start = index * 7;
    return days.slice(start, start + 7);
  });
  return nestedArr;
};

export const getBeforeDate = (createAt: string | Date | Dayjs) => {
  const parseDate = dayjs(createAt);
  const now = dayjs();

  const second = now.diff(parseDate, "second");
  if (second <= 3600) {
    const minute = now.diff(parseDate, "minute");
    return `${minute}분 전`;
  }

  // 48 시간 이전까지는 시간으로 보여준다
  if (second <= 172800) {
    const hour = now.diff(parseDate, "hour");
    return `${hour}시간 전`;
  }

  if (second > 172800) {
    const day = now.diff(parseDate, "day");
    return `${day}일 전`;
  }
};
