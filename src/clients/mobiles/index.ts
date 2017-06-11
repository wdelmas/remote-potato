import { HOST, MESSAGE_FROM_CLIENT, MESSAGE_FROM_SERVER, PORT, EXT_ID } from '../../communication/constants';
import * as SocketIOClient from 'socket.io-client';
import { message, PLAYER_PLAY, PLAYER_PAUSE, PLAYER_SEEK_BACKWARD, PLAYER_SEEK_FORWARD } from "../../communication/actions";
import { Debugger } from "../../communication/Debugger";

const IO_SERVER = `http://${HOST}:${PORT}`

var socket = SocketIOClient.connect(IO_SERVER);
socket.on('connect', () => {
    Debugger.log('Connected to WS Server: ' + IO_SERVER)
    socket.emit('hub', EXT_ID);
})

socket.on(MESSAGE_FROM_SERVER, function (data: any) {
    Debugger.log(data);
});

const BASE_MESSAGE = {
    extensionId: EXT_ID
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