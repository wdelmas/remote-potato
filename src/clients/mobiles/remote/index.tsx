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
import { BASE_MESSAGE } from "../index";

const styles = require('./index.css')
import * as classnames from 'classnames'

export interface RemoteProps {
    socket: SocketIOClient.Socket
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Remote extends React.Component<RemoteProps, {}> {
    public play = () => {
        const message = Object.assign({}, {
            type: PLAYER_PLAY
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    public pause = () => {
        const message = Object.assign({}, {
            type: PLAYER_PAUSE
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    public seekBackward = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_SEEK_BACKWARD,
            action: number.toString()
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    public seekForward = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_SEEK_FORWARD,
            action: number.toString()
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    public volumeUp = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_VOLUME_UP,
            action: number.toString()
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    public volumeDown = (number: number) => {
        const message = Object.assign({}, {
            type: PLAYER_VOLUME_DOWN,
            action: number.toString()
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    public enterFullScreen = () => {
        const message = Object.assign({}, {
            type: PLAYER_ENTER_FULLSCREEN,
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    public exitFullScreen = () => {
        const message = Object.assign({}, {
            type: PLAYER_EXIT_FULLSCREEN,
        }, BASE_MESSAGE) as message
        this.props.socket.emit(MESSAGE_FROM_CLIENT, message);
    }

    render() {
        return (<div className={styles.remoteContainer}>
            <div className={styles.row} >
                <button onClick={() => this.volumeDown(0.1)} className={classnames(styles.button,styles['btn--alt'], styles.ripple)}><i className="fa fa-volume-down"></i></button>
                <div className="empty"></div>
                <button onClick={() => this.volumeUp(0.1)} className={classnames(styles.button,styles['btn--alt'], styles.ripple)}><i className="fa fa-volume-up"></i></button>
            </div>
            <div className={styles.row}>
                <button className={classnames(styles.button, styles.ripple)} onClick={() => this.seekBackward(5)}><i className="fa fa-backward"></i></button>
                <button className={classnames(styles.button, styles.ripple)}  onClick={() => this.play()}><i className="fa fa-play"></i></button>
                <button className={classnames(styles.button, styles.ripple)}  onClick={() => this.seekForward(5)}><i className="fa fa-forward"></i></button>
            </div>
            <div className={styles.row} >
                <button onClick={() => this.enterFullScreen()} className={classnames(styles.button,styles['btn--alt'], styles.ripple)}><i className="fa fa-expand"></i></button>
                <button onClick={() => this.exitFullScreen()} className={classnames(styles.button,styles['btn--alt'], styles.ripple)}><i className="fa fa-compress"></i></button>
                <div className="empty"></div>
                <button onClick={() => this.pause()} className={classnames(styles.button,styles['btn--alt'], styles.ripple)}><i className="fa fa-pause"></i></button>
            </div>
        </div>)

    }
}





