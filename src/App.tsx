import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { useCookies } from "react-cookie";
import { LOCAL_ENV } from "constants/env";
import { get } from "lodash";

import useScript from "hooks/useScript";
import useReceiveMessage from "hooks/useReceiveMessage";
import useUserAgent from "hooks/useUserAgent";
import store from "store/index";
import browserHistory from "lib/history";
import * as userActions from "store/user/actions";
import * as commonActions from "store/common/actions";
import * as userSelector from "store/user/selectors";

import { dataLayer } from "lib/dataLayerUtil";
import ReactPixel from "react-facebook-pixel";

import GlobalStyled from "styles/global";

// pages
import Home from "pages/home";
import Login from "pages/login";
import { Intro, Customer, Grade } from "pages/banner";
import { PartnerList, PartnerDetail, PartnerCart } from "pages/partner";
import { CompletedPage, NoServicePage, NoPartnerPage, RequestPartnerDetail } from "pages/requests";
import { ChecklistIntro, ChecklistDetail } from "./pages/checklist";
import CleanPage from "pages/clean";
import CleanBridge01 from "./pages/clean/bridge01";
import PartnerRegisterPage from "./pages/partnerRegister";
import UserReviewPage from "./pages/userReview";
import NoticePage from "./pages/notice";
import ContactPage from "./pages/contact";
import FaqPage from "./pages/faq";
import Terms from "pages/terms";
import NotFound from "pages/notFound";
import ErrorService from "pages/errorService";
import UnSupported from "pages/unsupported";
import Template from "pages/requests/Completed/template";
import MyConsult from "pages/myconsult";
import FeedbackPage from "pages/feedback";
import MyConsultDetail from "pages/myconsult/myConsultDetail";

//swiper lib
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Pagination, Autoplay]);

declare global {
  interface Window {
    ReactNativeWebView: any; // eslint-disable-line
  }
  interface TenpingScript {
    SendConversion: () => void;
  }
}

function AppRoute() {
  const dispatch = useDispatch();
  const [script, setScript] = useState("");
  const location = useLocation();
  const customScript = useScript(script);
  const { isIE } = useUserAgent();
  const [cookies] = useCookies([`x-wematch-token-${LOCAL_ENV}`]);
  const getDeviceId = useReceiveMessage();
  const { token } = useSelector(userSelector.getUser);
  const wematchToken = get(cookies, `x-wematch-token-${LOCAL_ENV}`);

  const getPathname = () => {
    let pathname = 5;
    switch (location.pathname) {
      case "/partner/list":
        return (pathname = 5);
      case "/partner/detail":
        return (pathname = 5);
      case "/partner/cart":
        return (pathname = 3);
    }
    return pathname;
  };

  useEffect(() => {
    const wematchToken = get(cookies, `x-wematch-token-${LOCAL_ENV}`);
    if (wematchToken !== undefined) {
      dispatch(userActions.fetchGetUserAsync.request({ token: wematchToken }));
    }
  }, []);

  useEffect(() => {
    if (getDeviceId) {
      dispatch(commonActions.setDeviceId(getDeviceId));
    }
  }, [dispatch, getDeviceId]);

  useEffect(() => {
    if (location.pathname !== "/") {
      const script = `
                if(!wcs.add) var wcs_add = {};
                wcs_add["wa"] = "s_52e77a8a8b79";
                if (!_nasa) var _nasa={};
                _nasa["cnv"] = wcs.cnv("${getPathname()}", "1");
                wcs_do(_nasa);
            `;
      setScript(script);
    }

    dataLayer({ event: "pageview" });
    ReactPixel.pageView();
  }, [location.pathname]);

  useEffect(() => {
    if (script.length !== 0) {
      return customScript;
    }
  }, [script]);

  // ie인 경우 무조건 unsupported로 보낸다.
  if (isIE) {
    return (
      <Switch>
        <Route exact path="/unsupported" component={UnSupported} />
        <Redirect path="/" to={`/unsupported${location.search}`} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={(props) => (wematchToken ? <Redirect to={{ pathname: "/" }} /> : <Login />)} />

        {/*청소*/}
        <Route exact path="/clean" component={CleanPage} />

        {/* GA용 청소 브릿지 페이지 */}
        <Route exact path="/clean/bridge01" component={CleanBridge01} />

        {/* 파트너 */}
        <Route exact path="/partner/list" component={PartnerList} />
        <Route exact path="/partner/detail/:adminId" component={PartnerDetail} />
        <Route exact path="/partner/cart" component={PartnerCart} />
        <Route exact path="/partnernew" component={PartnerRegisterPage} />

        {/* 배터 */}
        <Route exact path="/banner/intro" component={Intro} />
        <Route exact path="/banner/customer" component={Customer} />
        <Route exact path="/banner/grade" component={Grade} />
        {/* 요청 */}
        <Route exact path="/requests/nopartner" component={NoPartnerPage} />
        <Route exact path="/requests/noservice" component={NoServicePage} />
        <Route exact path={["/requests/completed/:adminId", "/comment/:adminId"]} component={RequestPartnerDetail} />
        <Route exact path="/completed" component={CompletedPage} />
        <Route exact path="/completed/:inquiry_idx" component={Template} />

        {/* 내 신청내역 */}
        <Route exact path="/myrequest" component={MyConsult} />
        <Route exact path="/myrequest/detail" component={MyConsultDetail} />

        {/* 기타 */}
        <Route exact path="/notice" component={NoticePage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/feedback" component={FeedbackPage} />
        <Route exact path="/comment" component={UserReviewPage} />

        <Route exact path="/checklist" component={ChecklistIntro} />
        <Route exact path="/checklist/:type" component={ChecklistDetail} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/faq" component={FaqPage} />

        {/* 에러, 404 */}
        <Route exact path="/error" component={ErrorService} />
        <Route exact path="/notfound" component={NotFound} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

function App() {
  return (
    <>
      <GlobalStyled />
      <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
          <AppRoute />
        </ConnectedRouter>
      </Provider>
    </>
  );
}

// interface IAuthRoute {
//   exact: boolean
//   path: string
//   component: any
// }
// 인증 라우터
// const AuthRoute: React.FC<IAuthRoute> = ({ component: Component, ...rest }) => {
//     const { token } = useSelector(userSelector.getUser);
//     const location = useLocation();
//     const dispatch = useDispatch();ㄴ

//     return <Route {...rest} render={props => {
//         if (!token) {
//             dispatch(userActions.signIn({ prevPage: ESignInCase.ERROR }))
//             return <Redirect to={{ pathname: "/", state: { from: location.pathname, } }} />
//         } else {
//             return <Component {...props} />
//         }
//     }} />
// }

export default App;
