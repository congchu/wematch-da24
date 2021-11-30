import ReactPixel from 'react-facebook-pixel'
import { MoveTypeKoProp } from 'store/form/actions'
import { getAreaLevel } from './areaLevel'

import * as sentry from '@sentry/react'
import { Severity } from '@sentry/react'

export const sendPixelAreaAvgPrice = (moveType: MoveTypeKoProp | undefined, sido: string, gugun: string) => {
  let areaLevel = null
  try {
    areaLevel = getAreaLevel(sido, gugun)
    if (areaLevel && moveType) {
      const name = `접수_${moveType}_${areaLevel.level}`
      ReactPixel.fbq('trackCustom', name, { value: areaLevel.value, currency: 'KRW' })
    } else {
      throw '매핑 지역이 없거나, 이사 구분 없음'
    }
  } catch (e) {
    sentry.setExtra('juso', {
      areaLevel: JSON.stringify(areaLevel),
      moveType: moveType,
      juso: `${sido}${gugun}`,
    })
    sentry.captureMessage('픽셀 지역평균순차감 트래킹 실패', {
      level: Severity.Error,
    })
    sentry.captureException(e)
  }
}
