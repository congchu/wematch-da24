import React, {useState,useEffect} from 'react'
import {
    Switch,
    Route,
    useLocation
} from 'react-router-dom'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store from 'store/index'
import browserHistory from 'lib/history'
import GlobalStyled from 'styles/global'

import Home from "pages/home";
import PartnerList from 'pages/partner/List/index'
import PartnerDetail from 'pages/partner/Detail/index'
import PartnerCart from "pages/partner/Cart";
import useScript from "./hooks/useScript";


function AppRoute() {
    const [script, setScript] = useState('');
    const location = useLocation()
    const customScript = useScript(script)

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
    }, [location.pathname])

    useEffect(() => {
        if (script.length !== 0) {
            return customScript
        }
    }, [script])

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/partner/list" component={PartnerList} />
            <Route exact path="/partner/detail/:username" component={PartnerDetail} />
            <Route exact path="/partner/cart" component={PartnerCart}/>
        </Switch>
    )
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

export default App;
