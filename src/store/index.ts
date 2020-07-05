import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import browserHistory from 'lib/history'

import PartnerService, { PartnerState } from './partner/reducers'
import PartnerSaga from './partner/sagas'

export interface RootState {
    router: RouterState;
    partnerState: PartnerState;
}

const rootReducer = combineReducers({
    router: connectRouter(browserHistory),
    partnerState: PartnerService
})

const sagaMiddleware = createSagaMiddleware()

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) ||
    compose

const index = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))),
)

sagaMiddleware.run(PartnerSaga)

export default index
