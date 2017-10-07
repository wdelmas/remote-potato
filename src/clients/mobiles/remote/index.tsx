import * as React from "react";
import * as SocketIOClient from 'socket.io-client';

import { MESSAGE_FROM_CLIENT, MESSAGE_FROM_EXTENSION, IO_SERVER } from '../../../communication/constants';
import {
    message,
    PLAYER_PLAY,
    PLAYER_PAUSE,
    PLAYER_SEEK_BACKWARD,
    PLAYER_SEEK_FORWARD,
    PLAYER_VOLUME_UP,
    PLAYER_VOLUME_DOWN,
    PLAYER_ENTER_FULLSCREEN,
    PLAYER_EXIT_FULLSCREEN
} from "../../../communication/actions";
import { Debugger } from "../../../communication/Debugger";

const styles = require('./index.css')
import * as classnames from 'classnames'
import { connect, Dispatch } from "react-redux";
import { State, Dispatcher, mapDispatchToProps, StoreAsProps, mapStateToProps } from "../store/index";
import { bindActionCreators } from "redux";
import { SocketReducer } from "../store/socket/index";
import { connectedToWsServer } from "../store/socket/actions";
import { SocketService } from "../utils/socket";
import { playBtn_Clicked } from "../store/videoPlayer/actions";

export interface RemoteProps {
    socketService: SocketService
}

const getSocket = (): any => { }
class Remote extends React.Component<RemoteProps & StoreAsProps, {}>  {

    public play = () => {
        this.props.dispatch(playBtn_Clicked(true))
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_PLAY
        })
    }

    public pause = () => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_PAUSE
        })
    }

    public seekBackward = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_SEEK_BACKWARD,
            action: number.toString()
        })
    }

    public seekForward = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_SEEK_FORWARD,
            action: number.toString()
        })
    }

    public volumeUp = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_VOLUME_UP,
            action: number.toString()
        })
    }

    public volumeDown = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_VOLUME_DOWN,
            action: number.toString()
        })
    }

    public enterFullScreen = () => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_ENTER_FULLSCREEN,
        })
    }

    public exitFullScreen = () => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_EXIT_FULLSCREEN,
        })
    }

    public render() {
        return (<div className={styles.remoteContainer}>
            <div className={styles.row} >
                <button onClick={() => this.volumeDown(0.1)} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-volume-down"></i></button>
                <div className="empty"></div>
                <button onClick={() => this.volumeUp(0.1)} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-volume-up"></i></button>
            </div>
            <div className={styles.row}>
                <button className={classnames(styles.button, styles.ripple)} onClick={() => this.seekBackward(5)}><i className="fa fa-backward"></i></button>
                <button className={classnames(styles.button, styles.ripple)} onClick={() => this.play()}><i className="fa fa-play"></i></button>
                <button className={classnames(styles.button, styles.ripple)} onClick={() => this.seekForward(5)}><i className="fa fa-forward"></i></button>
            </div>
            <div className={styles.row} >
                <button onClick={() => this.enterFullScreen()} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-expand"></i></button>
                <button onClick={() => this.exitFullScreen()} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-compress"></i></button>
                <div className="empty"></div>
                <button onClick={() => this.pause()} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-pause"></i></button>
            </div>
        </div>)
    }

}

export default connect(
    (state: State, props: RemoteProps) => mapStateToProps<RemoteProps>(state, props),
    mapDispatchToProps)(Remote)

