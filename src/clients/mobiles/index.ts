import { HOST, MESSAGE_FROM_CLIENT, MESSAGE_FROM_SERVER, PORT } from '../../communication/constants';
import * as SocketIOClient from 'socket.io-client';
import { message, PLAYER_PLAY, PLAYER_PAUSE, PLAYER_SEEK_BACKWARD, PLAYER_SEEK_FORWARD } from "../../communication/actions";

var socket = SocketIOClient.connect(`http://${HOST}:${PORT}`);
socket.on(MESSAGE_FROM_SERVER, function (data: any) {
    console.log(data);
});

export const play = () => {
    const message: message = {
        type: PLAYER_PLAY
    }
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const pause = () => {
    const message: message = {
        type: PLAYER_PAUSE
    }
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const seekBackward = (number: number) => {
    const message: message = {
        type: PLAYER_SEEK_BACKWARD,
        action: number.toString()
    }
    socket.emit(MESSAGE_FROM_CLIENT, message);
}

export const seekForward = (number: number) => {
    const message: message = {
        type: PLAYER_SEEK_FORWARD,
        action: number.toString()
    }
    socket.emit(MESSAGE_FROM_CLIENT, message);
}