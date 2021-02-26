import React, { useState, useEffect } from 'react'
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import ReactPixel from 'react-facebook-pixel'

import store from 'store/index'
import browserHistory from 'lib/history'
import GlobalStyled from 'styles/global'
import * as userActions from 'store/user/actions';

import Home from 'pages/home'
import PartnerList from 'pages/partner/List/index'
import PartnerDetail from 'pages/partner/Detail/index'
import PartnerCart from 'pages/partner/Cart'
import Intro from 'pages/banner/Intro'
import Customer from 'pages/banner/Customer'
import Grade from 'pages/banner/Grade'
import UnSupported from 'pages/unsupported'
import Terms from 'pages/terms'
import CompletedPage from 'pages/requests/Completed'
import NoServicePage from 'pages/requests/NoService'
import NoPartnerPage from 'pages/requests/NoPartner'
import RequestPartnerDetail from 'pages/requests/Detail/index'
import NotFound from 'pages/notFound'
import ErrorService from 'pages/errorService'
import * as userSelector from 'store/user/selectors'
import useScript from 'hooks/useScript'
import useUserAgent from 'hooks/useUserAgent'
import { useCookies } from 'react-cookie'
import { dataLayer } from 'lib/dataLayerUtil'
import MyConsult from 'pages/myconsult'
import MyConsultDetail from 'pages/myconsult/myConsultDetail'
import { get } from 'lodash'
import Login from 'pages/login'

//swiper lib
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import { ESignInCase } from 'store/user/types'
import UserReviewPage from "./pages/userReview";

SwiperCore.use([Pagination, Autoplay])

declare global {
    interface Window {
        ReactNativeWebView: any; // eslint-disable-line
    }
    interface TenpingScript {
        SendConversion: () => void
    }
}

function AppRoute() {
    const dispatch = useDispatch();
    const [script, setScript] = useState('');
    const location = useLocation()
    const customScript = useScript(script)
    const { isIE } = useUserAgent()
    const [cookies] = useCookies(['x-wematch-token'])
    const { token } = useSelector(userSelector.getUser);
    const wematchToken = get(cookies, 'x-wematch-token');

    const getPathname = () => {
        let pathname = 5
        switch (location.pathname) {
            case '/partner/list':
                return pathname = 5
            case '/partner/detail':
                return pathname = 5
            case '/partner/cart':
                return pathname = 3
        }
        return pathname
    }

    useEffect(() => {
        const wematchToken = get(cookies, 'x-wematch-token');
        if (wematchToken !== undefined) {
            dispatch(userActions.fetchGetUserAsync.request({ token: wematchToken }))
        }
    }, [])


    useEffect(() => {
        if (location.pathname !== '/') {
            const script = `
                if(!wcs.add) var wcs_add = {};
                wcs_add["wa"] = "s_52e77a8a8b79";
                if (!_nasa) var _nasa={};
                _nasa["cnv"] = wcs.cnv("${getPathname()}", "1");
                wcs_do(_nasa);
            `;
            setScript(script)
        }

        dataLayer({ event: 'pageview' })
        ReactPixel.pageView()
    }, [location.pathname])

    useEffect(() => {
        if (script.length !== 0) {
            return customScript
        }
    }, [script])

    // ie인 경우 무조건 unsupported로 보낸다.
    if (isIE) {
        return (
            <Switch>
                <Route exact path="/unsupported" component={UnSupported} />
                <Redirect path="/" to="/unsupported" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/partner/list" component={PartnerList} />
                <Route exact path="/partner/detail/:adminId" component={PartnerDetail} />
                <Route exact path="/partner/cart" component={PartnerCart} />
                <Route exact path="/banner/intro" component={Intro} />
                <Route exact path="/banner/customer" component={Customer} />
                <Route exact path="/banner/grade" component={Grade} />
                <Route exact path="/myrequest" component={MyConsult} />
                <Route exact path="/myrequest/detail" component={MyConsultDetail} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/requests/completed" component={CompletedPage} />
                <Route exact path="/requests/nopartner" component={NoPartnerPage} />
                <Route exact path="/requests/noservice" component={NoServicePage} />
                <Route exact path={["/requests/completed/:adminId", "/comment/:adminId"]} component={RequestPartnerDetail} />
                <Route exact path="/comment" component={UserReviewPage} />
                <Route exact path="/error" component={ErrorService} />
                <Route exact path="/login" render={props => wematchToken ? <Redirect to={{ pathname: "/"}} /> : <Login />} />
                <Route component={NotFound} />
            </Switch>
        )
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


interface IAuthRoute {
    exact: boolean
    path: string
    component: any
}

// 인증 라우터
// const AuthRoute: React.FC<IAuthRoute> = ({ component: Component, ...rest }) => {
//     const { token } = useSelector(userSelector.getUser);
//     const location = useLocation();
//     const dispatch = useDispatch();

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


