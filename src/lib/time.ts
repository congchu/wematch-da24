import dayjs, { Dayjs } from 'dayjs'

export const getCreatedAt = (date: string | Date | Dayjs) => {
  const now = dayjs()
  const createdAt = dayjs(date)

  const diff = now.diff(createdAt, 'hour', true)

  if (diff >= 48) {
    return createdAt.format('YYYY.MM.DD')
  }

  if (diff <= 1) {
    const minuteDiff = now.diff(createdAt, 'minute')
    return minuteDiff <= 3 ? '방금 전' : minuteDiff + '분 전'
  }

  return diff.toFixed() + '시간 전'
}
