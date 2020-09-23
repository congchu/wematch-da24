import dayjs, { Dayjs } from 'dayjs'

export const getCreatedAt = (date: string | Date | Dayjs) => {
  const now = dayjs()
  const createdAt = dayjs(date)

  const diffDay = now.diff(createdAt, 'day')
  return `${diffDay}일 전`
}
