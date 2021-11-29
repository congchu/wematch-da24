import { getAreaLevel } from './areaLevel'
import { MoveTypeKoProp } from 'store/form/actions'
import * as sentry from '@sentry/react'
import { Severity } from '@sentry/react'

const googleAds: any = {
  접수_가정_상상: { gwId: 'AW-862163644', eventId: 'kGW0COPr7oUDELyljpsD' },
  접수_가정_상중: { gwId: 'AW-862163644', eventId: 'LWwICPLUxoUDELyljpsD' },
  접수_가정_상하: { gwId: 'AW-862163644', eventId: '45gyCJ3fjoYDELyljpsD' },
  접수_가정_중상: { gwId: 'AW-862163644', eventId: 'Kp7KCKXPt4YDELyljpsD' },
  접수_가정_중중: { gwId: 'AW-862163644', eventId: 'j2GMCOnOt4YDELyljpsD' },
  접수_가정_중하: { gwId: 'AW-862163644', eventId: 'hFikCPbhjoYDELyljpsD' },
  접수_가정_하상: { gwId: 'AW-862163644', eventId: 'FeNGCLzjjoYDELyljpsD' },
  접수_가정_하중: { gwId: 'AW-862163644', eventId: 'uwx7CMvjjoYDELyljpsD' },
  접수_가정_하하: { gwId: 'AW-862163644', eventId: 'ijeXCPjnwIYDELyljpsD' },
  접수_사무실_상상: { gwId: 'AW-862163644', eventId: 'ljiQCKLet4YDELyljpsD' },
  접수_사무실_상중: { gwId: 'AW-862163644', eventId: 'Zy0VCJjwwIYDELyljpsD' },
  접수_사무실_상하: { gwId: 'AW-862163644', eventId: '_lxoCPXtwIYDELyljpsD' },
  접수_사무실_중상: { gwId: 'AW-862163644', eventId: 'US41CMXzwIYDELyljpsD' },
  접수_사무실_중중: { gwId: 'AW-862163644', eventId: '_6ciCIXywIYDELyljpsD' },
  접수_사무실_중하: { gwId: 'AW-862163644', eventId: 'I9fZCNbft4YDELyljpsD' },
  접수_사무실_하상: { gwId: 'AW-862163644', eventId: 'D53lCN_0joYDELyljpsD' },
  접수_사무실_하중: { gwId: 'AW-862163644', eventId: 'iJZ2CNb1wIYDELyljpsD' },
  접수_사무실_하하: { gwId: 'AW-862163644', eventId: 'd3_6CJXjt4YDELyljpsD' },
}

export const sendGAdsAreaAvgPrice = (moveType: MoveTypeKoProp | undefined, sido: string, gugun: string) => {
  let areaLevel = null
  try {
    areaLevel = getAreaLevel(sido, gugun)

    if (areaLevel && moveType) {
      const key = `접수_${moveType}_${areaLevel.level}`
      gtag('event', 'conversion', {
        send_to: `${googleAds[key].gwId}/${googleAds[key].eventId}`,
        value: areaLevel.value,
        currency: 'KRW',
      })

      // TODO : 주석 제거
      console.log("'event'", "'conversion'", {
        send_to: `${googleAds[key].gwId}/${googleAds[key].eventId}`,
        value: areaLevel.value,
        currency: 'KRW',
      })
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
