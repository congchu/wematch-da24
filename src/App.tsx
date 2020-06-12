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

function AppRoute() {
    return (
        <Switch>
            <Route exact path="/partner/list" component={PartnerList} />
            <Route exact path="/partner/detail" component={PartnerDetail} />
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
