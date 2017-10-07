import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./app";
import { Debugger } from "../../communication/Debugger";
import { message } from "../../communication/actions";
import { createReduxStore } from "./store/index";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory, Router, Route } from "react-router";
import { Provider } from "react-redux";
import { loadRoomId } from "./store/socket/actions";
import { removeDoubleTapZoom } from "./utils/mobileHandler";
import { initSocket } from "./utils/socket";

removeDoubleTapZoom('button');

const store = createReduxStore(browserHistory)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
const socket = initSocket(store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={() => <App socket={socket} />}>
            </Route>
        </Router>
    </Provider >,
    document.getElementById('app')
)