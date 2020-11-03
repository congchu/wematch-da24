import * as React from 'react'
import styled from 'styled-components'
import { Home, Report, Search } from 'components/wematch-ui/Icon'
import BaseBottomNav from 'components/base/BottomNav'
import BaseBottomMenu from 'components/base/BottomNavMenu'

const ResponsiveBottomNav = styled(BaseBottomNav)`
  @media (min-width: 1200px) {
    display: none;
  }
`

export default function BottomNav() {
  const userAgent = window.navigator.userAgent

  const isWmClientApp = React.useMemo(() => {
    return userAgent.indexOf('WmClientApp') > -1
  }, [userAgent])

  if (!isWmClientApp) {
    return (
      <ResponsiveBottomNav>
        <BaseBottomMenu to="/new" replace exact>
          <Home size={24} />
          <span>홈</span>
        </BaseBottomMenu>
        <BaseBottomMenu to="https://wematch.com/service_search.html" isHref replace>
          <Search size={24} />
          <span>서비스 찾기</span>
        </BaseBottomMenu>
        <BaseBottomMenu to="https://wematch.com/inquiry" isHref replace>
          <Report size={24} />
          <span>내 신청서</span>
        </BaseBottomMenu>
      </ResponsiveBottomNav>
    )
  }

  return null
}
