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
import { State } from "../store/index";
import { bindActionCreators } from "redux";

export interface RemoteProps {
    socket: SocketIOClient.Socket
}

export interface RemoteState extends RemoteProps {
    roomId: string
}

const Remote = (props: RemoteState) => {
    console.log(props.roomId)
    const BASE_MESSAGE = {
        extensionId: props.roomId,
        from: 'webapp'
    }
    const play = () => {
        const message = Object.assign({}, {
            type: PLAYER_PLAY
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    const pause = () => {
        const message = Object.assign({}, {
            type: PLAYER_PAUSE
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    const seekBackward = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_SEEK_BACKWARD,
            action: number.toString()
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    const seekForward = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_SEEK_FORWARD,
            action: number.toString()
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    const volumeUp = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_VOLUME_UP,
            action: number.toString()
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    const volumeDown = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_VOLUME_DOWN,
            action: number.toString()
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    const enterFullScreen = () => {
        const message = Object.assign({}, {
            type: PLAYER_ENTER_FULLSCREEN,
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    const exitFullScreen = () => {
        const message = Object.assign({}, {
            type: PLAYER_EXIT_FULLSCREEN,
        }, BASE_MESSAGE) as message
        props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    return (<div className={styles.remoteContainer}>
        <div className={styles.row} >
            <button onClick={() => volumeDown(0.1)} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-volume-down"></i></button>
            <div className="empty"></div>
            <button onClick={() => volumeUp(0.1)} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-volume-up"></i></button>
        </div>
        <div className={styles.row}>
            <button className={classnames(styles.button, styles.ripple)} onClick={() => seekBackward(5)}><i className="fa fa-backward"></i></button>
            <button className={classnames(styles.button, styles.ripple)} onClick={() => play()}><i className="fa fa-play"></i></button>
            <button className={classnames(styles.button, styles.ripple)} onClick={() => seekForward(5)}><i className="fa fa-forward"></i></button>
        </div>
        <div className={styles.row} >
            <button onClick={() => enterFullScreen()} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-expand"></i></button>
            <button onClick={() => exitFullScreen()} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-compress"></i></button>
            <div className="empty"></div>
            <button onClick={() => pause()} className={classnames(styles.button, styles['btn--alt'], styles.ripple)}><i className="fa fa-pause"></i></button>
        </div>
    </div>)

}


function mapStateToProps(state: State, props: RemoteProps): RemoteState {
    const newProps = Object.assign({}, props,
        { roomId: state.socketReducer.roomId }
    )
    return newProps
}

function mapDispatchToProps(dispatch: Dispatch<any>, ) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Remote)



