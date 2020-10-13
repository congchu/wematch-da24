import React from 'react'
import {
    Switch,
    Route,
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


function AppRoute() {
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
