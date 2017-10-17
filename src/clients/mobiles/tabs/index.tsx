import * as React from "react";
import { SocketService } from "../utils/socket";
import { connect, Dispatch } from "react-redux";
import { State, Dispatcher, mapDispatchToProps, mapStateToProps, ReduxStore, ReduxState } from "../store/index";
import { OPEN_NEW_TAB, REMOVE_TAB, REFRESH_TAB } from "../../../communication/actions";

export interface TabsProps {
    socketService: SocketService
}

class TabsContainer extends React.Component<TabsProps & ReduxStore, {}>  {

    public newTab() {
        this.props.socketService.sendTabsActionsMessageFromClient({
            actionType: OPEN_NEW_TAB,
            action: 'https://www.dashlane.com'
        }, { feedbackVibrate: true })
    }
    public closeCurrentTab() {
        this.props.socketService.sendTabsActionsMessageFromClient({
            actionType: REMOVE_TAB,
        }, { feedbackVibrate: true })
    }
    public refreshCurrentTab() {
        this.props.socketService.sendTabsActionsMessageFromClient({
            actionType: REFRESH_TAB,
        }, { feedbackVibrate: true })
    }
    public render() {
        return (<div>
            <button onClick={() => this.newTab()}>New Tab</button>
            <button onClick={() => this.closeCurrentTab()}>Close Current Tab</button>
            <button onClick={() => this.refreshCurrentTab()}>Refresh Current Tab</button>
        </div>)
    }
}

export default connect(
    (state: State, props: TabsProps) => mapStateToProps<TabsProps>(state, props),
    mapDispatchToProps)(TabsContainer)