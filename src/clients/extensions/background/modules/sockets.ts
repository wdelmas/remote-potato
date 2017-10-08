import * as SocketIOClient from 'socket.io-client';
import { MESSAGE_TO_EXTENSION, IO_SERVER } from "../../../../communication/constants";
import { sendMessageToCurrentTab, roomId, webAppUrl } from "./browser";
import { Debugger } from "../../../../communication/Debugger";
import { message, HANDSHAKE } from "../../../../communication/actions";


const socket = SocketIOClient.connect(IO_SERVER);

export const initSockets = () => {
    socket.on('connect', () => {
        Debugger.log('Connected to WS Server: ' + IO_SERVER)
        Debugger.log('Room ID ' + roomId)
        Debugger.log('Web app  url:' + webAppUrl)
        socket.emit('room', roomId)
    })

    socket.on(MESSAGE_TO_EXTENSION, function (data: message) {
        return sendMessageToCurrentTab(data)
    });
}

export const getSocketBackground = () => socket