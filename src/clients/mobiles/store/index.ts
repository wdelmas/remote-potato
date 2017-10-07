
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createHistory } from 'history';
import socketReducer, { SocketReducer } from './socket'

export interface State {
    socketReducer: SocketReducer
}


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const createReduxStore = (history: any): Store<State> => {
    const middleware = routerMiddleware(history)
    return createStore(
        combineReducers<State>({
            socketReducer,
            routing: routerReducer
        }),
        applyMiddleware(middleware)
    )
}
