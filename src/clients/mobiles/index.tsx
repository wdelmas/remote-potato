import * as React from "react";
import * as ReactDOM from "react-dom";
import { MESSAGE_FROM_EXTENSION, IO_SERVER } from "../../communication/constants";
import * as SocketIOClient from 'socket.io-client';
import App from "./app";
import { Debugger } from "../../communication/Debugger";
import { message } from "../../communication/actions";
import { createReduxStore } from "./store/index";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory, Router, Route } from "react-router";
import { Provider } from "react-redux";
import { loadRoomId } from "./store/socket/actions";
import { removeDoubleTapZoom } from "./utils/mobileHandler";
import { makeSocketService, SocketService } from "./utils/socket";

removeDoubleTapZoom('button');
removeDoubleTapZoom('div');

const store = createReduxStore(browserHistory)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const socketService: SocketService = makeSocketService(store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={() => <App socketService={socketService} {...store.getState()} />}>
            </Route>
        </Router>
    </Provider >,
    document.getElementById('app')
)