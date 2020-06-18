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

import PartnerList from 'pages/partner/List/index'
import PartnerDetail from 'pages/partner/Detail/index'
import PartnerItem from 'pages/partner/List/item'
import TopGnb from 'components/TopGnb'
import setType from 'pages/partner/List/setType'
import noneList from 'components/EmptyPage/index'

function AppRoute() {
    return (
        <Switch>
            <Route exact path="/partner/list" component={PartnerList} />
            <Route exact path="/partner/detail" component={PartnerDetail} />
            <Route exact path="/partner/item" component={PartnerItem} />
            <Route exact path="/partner/topGnb" component={TopGnb} />
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
