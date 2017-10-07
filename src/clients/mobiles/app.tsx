import * as React from "react";
import Remote from "./remote/index";
import { SocketService } from "./utils/socket";
import { StoreAsProps, State, mapStateToProps } from "./store/index";
import { connect } from "react-redux";

export interface AppProps {
    socketService: SocketService
}

const App = (props: AppProps & State) => {
    return <Remote {...props} />
}

export default connect(
    (state: State, props: AppProps) => mapStateToProps<AppProps>(state, props),
    null)(App)