import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import browserHistory from 'lib/history'

export interface RootState {}

const rootReducer = combineReducers({
    router: connectRouter(browserHistory),
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

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))),
)

export default store