import * as React from "react";
import styled from "styled-components";
import { Home, Report } from "components/wematch-ui/Icon";
import BaseBottomNav from "components/base/BottomNav";
import BaseBottomMenu from "components/base/BottomNavMenu";

const ResponsiveBottomNav = styled(BaseBottomNav)`
  @media (min-width: 1200px) {
    display: none;
  }
`;

export default function BottomNav() {
  return (
    <ResponsiveBottomNav>
      <BaseBottomMenu to="/" replace exact>
        <Home size={24} />
        <span>홈</span>
      </BaseBottomMenu>
      {/* <BaseBottomMenu to={constants.MOVE_URL + "/myconsult.asp"} isHref replace> */}
      <BaseBottomMenu to={"/myrequest"} exact>
        <Report size={24} />
        <span>내신청내역</span>
      </BaseBottomMenu>
    </ResponsiveBottomNav>
  );
}
