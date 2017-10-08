import * as React from "react";
import Remote from "./remote/index";
import { SocketService } from "./utils/socket";
import { State, mapStateToProps, ReduxState } from "./store/index";
import { connect } from "react-redux";

export interface AppProps {
    socketService: SocketService
}

const App = (props: AppProps) => {
    return <Remote {...props} />
}

export default connect(
    (state: State, props: AppProps) => mapStateToProps<AppProps>(state, props),
    null)(App)