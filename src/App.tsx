import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom'

import GlobalStyled from 'styles/global'

import PartnerList from 'pages/partner/List/index'
import PartnerDetail from 'pages/partner/Detail/index'
import PartnerItem from 'pages/partner/List/item'
import TopGnb from 'components/TopGnb'
import setType from 'pages/partner/List/setType'
import noneList from 'components/EmptyPage/index'

function App() {
  return (
      <>
          <GlobalStyled />
          <BrowserRouter>
              <Switch>
                  <Route exact path="/partner/list" component={PartnerList} />
                  <Route exact path="/partner/detail/:username" component={PartnerDetail} />
                  <Route exact path="/partner/item" component={PartnerItem} />
                  <Route exact path="/partner/topGnb" component={TopGnb} />
                  <Route exact path="/partner/setType" component={setType} />
                  <Route exact path="/partner/noneList" component={noneList} />
              </Switch>
          </BrowserRouter>
      </>
  );
}

export default App;
