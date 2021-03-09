import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import browserHistory from 'lib/history'

import PartnerService, { PartnerState } from './partner/reducers'
import CommonService, { CommonState } from './common/reducers'
import FormService, { FormState } from './form/reducers'
import UserService, { UserState } from './user/reducers'
import BackofficeService, {BackofficeState} from './backoffice/reducers'
import PartnerSaga from './partner/sagas'
import CommonSaga from './common/sagas'
import UserSaga from 'store/user/sagas'
import FormSaga from './form/sagas'
import BackofficeSaga from './backoffice/sagas'

export interface RootState {
    router: RouterState;
    partnerState: PartnerState;
    commonState: CommonState;
    formState: FormState;
    userState: UserState;
    backofficeState: BackofficeState;
}

const rootReducer = combineReducers({
    router: connectRouter(browserHistory),
    partnerState: PartnerService,
    commonState: CommonService,
    formState: FormService,
    userState: UserService,
    backofficeState: BackofficeService,
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
);

function* rootSaga() {
    yield all([
        UserSaga(),
        PartnerSaga(),
        CommonSaga(),
        FormSaga(),
        BackofficeSaga()
    ])
}
sagaMiddleware.run(rootSaga)

export default index
