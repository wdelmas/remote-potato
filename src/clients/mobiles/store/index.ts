
import { Provider, Dispatch } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createHistory } from 'history';
import socketReducer, { SocketReducer } from './socket'
import videoPlayerReducer, { VideoPlayerReducer } from './videoPlayer'
const loggerMiddleware = require('redux-logger')

export interface State {
    videoPlayerReducer: VideoPlayerReducer
    socketReducer: SocketReducer
}


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const createReduxStore = (history: any): Store<State> => {
    const historyMiddleware = routerMiddleware(history)
    return createStore(
        combineReducers<State>({
            socketReducer,
            videoPlayerReducer,
            routing: routerReducer
        }),
        applyMiddleware(
            historyMiddleware,
            loggerMiddleware.logger)
    )
}


export interface Dispatcher {
    dispatch: (fn: any) => void,
}
export type StoreAsProps = State & Dispatcher

export function mapDispatchToProps(dispatch: Dispatch<State>): Dispatcher {
    return {
        dispatch: (fn: any) => dispatch(fn),
    }
}

export const mapStateToProps = <T>(state: State, props: T) => {
    const newProps = Object.assign({}, props,
        { socketReducer: state.socketReducer }
    )
    return newProps
}