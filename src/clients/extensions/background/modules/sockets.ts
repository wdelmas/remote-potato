import * as SocketIOClient from 'socket.io-client';
import { HOST, MESSAGE_TO_EXTENSION, PORT, IO_SERVER } from "../../../../communication/constants";
import { sendMessageToCurrentTab, roomId, webAppUrl } from "./browser";
import { Debugger } from "../../../../communication/Debugger";
import { message } from "../../../../communication/actions";


const socket = SocketIOClient.connect(IO_SERVER);

export const initSockets = () => {
    socket.on('connect', () => {
        Debugger.log('Connected to WS Server: ' + IO_SERVER)
        Debugger.log('Room ID ' + roomId)
        Debugger.log('Web app  url:' + webAppUrl)
        socket.emit('room', roomId);
    })

    socket.on(MESSAGE_TO_EXTENSION, function (data: message) {
        Debugger.log(data.type)
        return sendMessageToCurrentTab(data)
    });
}