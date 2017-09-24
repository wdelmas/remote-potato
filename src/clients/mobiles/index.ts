import { HOST, MESSAGE_FROM_CLIENT, MESSAGE_FROM_SERVER, PORT, IO_SERVER } from '../../communication/constants';
import * as SocketIOClient from 'socket.io-client';
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
} from "../../communication/actions";
import { Debugger } from "../../communication/Debugger";
export const getRoomId = () => {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}
const ROOM_ID = getRoomId()

var socket = SocketIOClient.connect(IO_SERVER);
socket.on('connect', () => {
    Debugger.log('Connected to WS Server: ' + IO_SERVER)
    socket.emit('room', ROOM_ID);
})

socket.on(MESSAGE_FROM_SERVER, function (data: any) {
    Debugger.log(data);
});

const BASE_MESSAGE = {
    extensionId: ROOM_ID
}

export const play = () => {
    const message = Object.assign({}, {
        type: PLAYER_PLAY
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const pause = () => {
    const message = Object.assign({}, {
        type: PLAYER_PAUSE
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const seekBackward = (number: number) => {
    const message = Object.assign({}, {
        type: PLAYER_SEEK_BACKWARD,
        action: number.toString()
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const seekForward = (number: number) => {
    const message = Object.assign({}, {
        type: PLAYER_SEEK_FORWARD,
        action: number.toString()
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const volumeUp = (number: number) => {
    const message = Object.assign({}, {
        type: PLAYER_VOLUME_UP,
        action: number.toString()
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const volumeDown = (number: number) => {
    const message = Object.assign({}, {
        type: PLAYER_VOLUME_DOWN,
        action: number.toString()
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const enterFullScreen = () => {
    const message = Object.assign({}, {
        type: PLAYER_ENTER_FULLSCREEN,
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const exitFullScreen = () => {
    const message = Object.assign({}, {
        type: PLAYER_EXIT_FULLSCREEN,
    }, BASE_MESSAGE) as message
    socket.emit(MESSAGE_FROM_CLIENT, message);
}