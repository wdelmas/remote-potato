import { HOST, MESSAGE_FROM_CLIENT, MESSAGE_FROM_EXTENSION, PORT, IO_SERVER } from '../../communication/constants';
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

socket.on(MESSAGE_FROM_EXTENSION, function (data: message) {
    switch (data.type) {
        case 'PLAYER_VOLUME_UP':
        case 'PLAYER_VOLUME_DOWN':
            break
    }
});

const BASE_MESSAGE = {
    extensionId: ROOM_ID,
    from: 'webapp'
}


removeDoubleTapZoom('button');


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

function removeDoubleTapZoom(tagName: string) {
    let tags = document.getElementsByTagName(tagName)
    for (let i = tags.length; i--;) {
        tags[i].addEventListener('touchstart', preventZoom)
    }
}

function preventZoom(e: any) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

    e.preventDefault();
    e.target.click();
}