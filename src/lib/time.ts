import dayjs, { Dayjs } from 'dayjs'

export const getCreatedAt = (date: string | Date | Dayjs) => {
  const now = dayjs()
  const createdAt = dayjs(date)

  const diffYear = now.diff(createdAt, 'year')
  if (diffYear >= 1) {
    return `${diffYear}년 전`
  }

  const diffMonth = now.diff(createdAt, 'month')
  if (diffMonth <= 12) {
    return `${diffMonth}달 전`
  }

  const diffDay = now.diff(createdAt, 'day')
  return `${diffDay}일 전`
}
