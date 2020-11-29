import dayjs, { Dayjs } from 'dayjs'

export const getCreatedAt = (date: string | Date | Dayjs) => {
  const now = dayjs()
  const createdAt = dayjs(date)

  const diffDay = now.diff(createdAt, 'day')
  if(diffDay < 330) {
    return `${Math.ceil(diffDay / 30)}달 내 이사`
  } else {
    const diffYear = Math.floor(diffDay / 364) + 1
    return `${diffYear}년 전 이사`
  }
}
