import React, {useState, useEffect} from 'react'
import {
    Switch,
    Route,
    Redirect,
    useLocation
} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import ReactPixel from 'react-facebook-pixel'

import store from 'store/index'
import browserHistory from 'lib/history'
import GlobalStyled from 'styles/global'

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

import useScript from 'hooks/useScript'
import useUserAgent from 'hooks/useUserAgent'

//swiper lib
import SwiperCore, {Pagination, Autoplay} from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import {dataLayer} from 'lib/dataLayerUtil'

SwiperCore.use([Pagination, Autoplay])

declare global {
    interface Window {
        ReactNativeWebView: any; // eslint-disable-line
    }
}

function AppRoute() {
    const [script, setScript] = useState('');
    const location = useLocation()
    const customScript = useScript(script)
    const {isIE} = useUserAgent()

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

        dataLayer({event: 'pageview'})
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
                <Route exact path="/unsupported" component={UnSupported}/>
                <Redirect path="/" to="/unsupported"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/partner/list" component={PartnerList}/>
                <Route exact path="/partner/detail/:adminId" component={PartnerDetail}/>
                <Route exact path="/partner/cart" component={PartnerCart}/>
                <Route exact path="/banner/intro" component={Intro}/>
                <Route exact path="/banner/customer" component={Customer}/>
                <Route exact path="/banner/grade" component={Grade}/>
                <Route exact path="/terms" component={Terms}/>
                <Route exact path="/requests/completed" component={CompletedPage}/>
                <Route exact path="/requests/nopartner" component={NoPartnerPage}/>
                <Route exact path="/requests/noservice" component={NoServicePage}/>
                <Route exact path="/requests/completed/:adminId" component={RequestPartnerDetail}/>
                <Route exact path="/error" component={ErrorService}/>
                <Route component={NotFound}/>

            </Switch>
        )
    }
}

function App() {
    return (
        <>
            <GlobalStyled/>
            <Provider store={store}>
                <ConnectedRouter history={browserHistory}>
                    <AppRoute/>
                </ConnectedRouter>
            </Provider>
        </>
    );
}

export default App;
