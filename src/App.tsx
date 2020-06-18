import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store from 'store/index'
import browserHistory from 'lib/history'
import GlobalStyled from 'styles/global'

import PartnerList from 'pages/partner/list'
import PartnerDetail from 'pages/partner/detail'
import PartnerItem from 'pages/partner/item'
import TopGnb from 'pages/partner/TopGnb'
import setType from 'pages/partner/setType'
import noneList from 'pages/partner/noneList'

function AppRoute() {
    return (
        <Switch>
            <Route exact path="/partner/list" component={PartnerList} />
            <Route exact path="/partner/detail" component={PartnerDetail} />
            <Route exact path="/partner/item" component={PartnerItem} />
            <Route exact path="/partner/TopGnb" component={TopGnb} />
            <Route exact path="/partner/setType" component={setType} />
            <Route exact path="/partner/noneList" component={noneList} />
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
