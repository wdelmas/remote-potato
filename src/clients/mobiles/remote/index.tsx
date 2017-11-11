import * as React from "react";
import * as SocketIOClient from 'socket.io-client';

import { MESSAGE_FROM_CLIENT, MESSAGE_FROM_EXTENSION, IO_SERVER } from '../../../communication/constants';
import {
    message,
    PLAYER_PLAY,
    PLAYER_PAUSE,
    PLAYER_SEEK_BACKWARD,
    PLAYER_SEEK_FORWARD,
    CHANGE_VOLUME,
    PLAYER_ENTER_FULLSCREEN,
    PLAYER_EXIT_FULLSCREEN,
    VideoPlayerMessage,
    GO_TO_TIME
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
import { fullScreenBtn_Clicked } from "../store/videoPlayer/actions";
import { rgbToObject, isRGBForWhite } from "../utils/colors";

import { Header } from "./header/header";
import { Poster } from "./poster/poster";
import { Playback } from "./playback/playback";
import { Controls } from "./controls/controls";
import { Volume } from "./volume/volume";
import { BottomControls } from "./bottom-controls/bottom-controls";
import { Title } from "./title/title";
import { debounce } from "../utils/debounce";

export interface RemoteProps {
    socketService: SocketService
}

const getSocket = (): any => { }
class RemoteContainer extends React.Component<RemoteProps & ReduxStore, {}>  {

    public play = () => {
        this.props.socketService.sendPlayerActionsMessageFromClient({
            actionType: PLAYER_PLAY
        }, { feedbackVibrate: true })
    }

    public pause = () => {
        this.props.socketService.sendPlayerActionsMessageFromClient({
            actionType: PLAYER_PAUSE
        }, { feedbackVibrate: true })
    }
    public onTimeChanged = (number: number) => {
        const props = this.props
        debounce(function () {
            props.socketService.sendPlayerActionsMessageFromClient({
                actionType: GO_TO_TIME,
                action: number.toString()
            }, { feedbackVibrate: false })
        }, 250)()

    }
    public seekBackward = (number: number) => {
        this.props.socketService.sendPlayerActionsMessageFromClient({
            actionType: PLAYER_SEEK_BACKWARD,
            action: number.toString()
        }, { feedbackVibrate: true })
    }

    public seekForward = (number: number) => {
        this.props.socketService.sendPlayerActionsMessageFromClient({
            actionType: PLAYER_SEEK_FORWARD,
            action: number.toString()
        }, { feedbackVibrate: true })
    }

    public onVolumeChanged = (number: number) => {
        const props = this.props
        debounce(function () {
            props.socketService.sendPlayerActionsMessageFromClient({
                actionType: CHANGE_VOLUME,
                action: number.toString()
            }, { feedbackVibrate: false })
        }, 250)()
    }

    public enterFullScreen = () => {
        this.props.dispatch(fullScreenBtn_Clicked(true))
        this.props.socketService.sendPlayerActionsMessageFromClient({
            actionType: PLAYER_ENTER_FULLSCREEN,
        }, { feedbackVibrate: true })
    }

    public exitFullScreen = () => {
        this.props.dispatch(fullScreenBtn_Clicked(false))
        this.props.socketService.sendPlayerActionsMessageFromClient({
            actionType: PLAYER_EXIT_FULLSCREEN,
        }, { feedbackVibrate: true })
    }

    public render() {
        const current: VideoPlayerMessage = this.props.reduxState.videoPlayerReducer.current || {
            title: "Nothing playing",
            domain: "remote-potatoe",
            isPlaying: false,
            currentTime: 60,
            duration: 300,
            currentTimeAsPercentage: 40,
            favicon: "http://remote-potato.herokuapp.com/favicons/favicon-32x32.png",
            volume: 0.4
        }
        const rgbColors = rgbToObject(current.dominantBackgroundColor)
        const theme = isRGBForWhite(rgbColors) ? styles.dark : styles.white
        return (<div className={classnames(
            styles.container,
            theme)}>
            <Header favicon={current.favicon} domain={current.domain} />
            <Poster
                url={current.poster}
            />
            <Playback
                onTimeChange={this.onTimeChanged}
                seekBackward={this.seekBackward}
                seekForward={this.seekForward}
                isPlaying={current.isPlaying}
                duration={current.duration}
                currentTime={current.currentTime}
                currentTimeAsPercentage={current.currentTimeAsPercentage}
                dominantBackgroundColor={current.dominantBackgroundColor}
            />
            <Title
                title={current.title}
                subTitle={current.subTitle}
                dominantBackgroundColor={current.dominantBackgroundColor}
            />
            <Controls
                isPlaying={current.isPlaying}
                play={this.play}
                pause={this.pause}
                seekBackward={this.seekBackward}
                seekForward={this.seekForward}
                dominantBackgroundColor={current.dominantBackgroundColor}
            />
            <Volume
                onVolumeChange={this.onVolumeChanged}
                volume={current.volume}
                dominantBackgroundColor={current.dominantBackgroundColor}
            />
            <BottomControls
                controller={this.props.reduxState.videoPlayerReducer.controller}
                enterFullScreen={this.enterFullScreen}
                exitFullScreen={this.exitFullScreen}
                dominantBackgroundColor={current.dominantBackgroundColor}
            />
        </div>)
    }

}

export default connect(
    (state: State, props: RemoteProps) => mapStateToProps<RemoteProps>(state, props),
    mapDispatchToProps)(RemoteContainer)

