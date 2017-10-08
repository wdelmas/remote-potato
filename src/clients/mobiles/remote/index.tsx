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
    PLAYER_EXIT_FULLSCREEN,
    VideoPlayerMessage
} from "../../../communication/actions";
import { Debugger } from "../../../communication/Debugger";

const styles = require('./index.css')
import * as classnames from 'classnames'
import { connect, Dispatch } from "react-redux";
import { State, Dispatcher, mapDispatchToProps, mapStateToProps, ReduxStore, ReduxState } from "../store/index";
import { bindActionCreators } from "redux";
import { SocketReducer } from "../store/socket/index";
import { connectedToWsServer } from "../store/socket/actions";
import { SocketService } from "../utils/socket";
import { playBtn_Clicked } from "../store/videoPlayer/actions";
import { Header } from "./header/header";
import { Poster } from "./poster/poster";
import { Controls } from "./controls/controls";

export interface RemoteProps {
    socketService: SocketService
}

const getSocket = (): any => { }
class RemoteContainer extends React.Component<RemoteProps & ReduxStore, {}>  {

    public play = () => {
        this.props.dispatch(playBtn_Clicked(true))
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_PLAY
        }, { feedbackVibrate: true })
    }

    public pause = () => {
        this.props.dispatch(playBtn_Clicked(false))

        this.props.socketService.sendMessageFromClient({
            type: PLAYER_PAUSE
        }, { feedbackVibrate: true })
    }

    public seekBackward = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_SEEK_BACKWARD,
            action: number.toString()
        }, { feedbackVibrate: true })
    }

    public seekForward = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_SEEK_FORWARD,
            action: number.toString()
        }, { feedbackVibrate: true })
    }

    public volumeUp = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_VOLUME_UP,
            action: number.toString()
        }, { feedbackVibrate: true })
    }

    public volumeDown = (number: number) => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_VOLUME_DOWN,
            action: number.toString()
        }, { feedbackVibrate: true })
    }

    public enterFullScreen = () => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_ENTER_FULLSCREEN,
        }, { feedbackVibrate: true })
    }

    public exitFullScreen = () => {
        this.props.socketService.sendMessageFromClient({
            type: PLAYER_EXIT_FULLSCREEN,
        }, { feedbackVibrate: true })
    }

    public render() {
        const current: VideoPlayerMessage = this.props.reduxState.videoPlayerReducer.current || {
            title: "Boku no Hero Acadomia",
            domain: "9anime.to",
            currentTime: 60,
            duration: 300,
            currentTimeAsPercentage: '40%',
            poster: "http://2.bp.blogspot.com/-r1Ccg34ohHs/WN-GJnJ3_cI/AAAAAAAAe20/6452H0a28vw/w650-h350/boku-no-hero-academia-2nd-season.jpg",
            favicon: "https://9anime.to/favicons/favicon.png",
            volume: 30,
            volumeAsPercentage: '30%'
        }
        return (<div className={styles.container}>
            <Header favicon={current.favicon} domain={current.domain} />
            <Poster url={current.poster} />
            <Controls
                title={current.title}
                controller={this.props.reduxState.videoPlayerReducer.controller}
                play={this.play}
                pause={this.pause}
                duration={current.duration}
                currentTime={current.currentTime}
                seekBackward={this.seekBackward}
                seekForward={this.seekForward}
                volumeUp={this.volumeUp}
                volumeDown={this.volumeDown}
            />
            {/* <div className={styles.row} >
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
                </div> */}
        </div>)
    }

}

export default connect(
    (state: State, props: RemoteProps) => mapStateToProps<RemoteProps>(state, props),
    mapDispatchToProps)(RemoteContainer)

