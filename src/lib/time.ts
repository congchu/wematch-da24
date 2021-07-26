import dayjs, { Dayjs } from 'dayjs'

export const getCreatedAt = (date: string | Date | Dayjs) => {
  const now = dayjs()
  const createdAt = dayjs(date)

  const diffDay = now.diff(createdAt, 'day')
  if(diffDay < 330) {
    return Math.ceil(diffDay / 30)
  } else {
    return Math.floor(diffDay / 364) + 1
  }
}
