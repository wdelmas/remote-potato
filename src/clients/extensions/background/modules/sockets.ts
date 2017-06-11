import * as SocketIOClient from 'socket.io-client';
import { HOST, MESSAGE_TO_EXTENSION, PORT, EXT_ID } from "../../../../communication/constants";
import { sendMessageToCurrentTab } from "./browser";
import { Debugger } from "../../../../communication/Debugger";

const IO_SERVER = `http://${HOST}:${PORT}`

const socket = SocketIOClient.connect(IO_SERVER);

export const initSockets = () => {
    socket.on('connect', () => {
        Debugger.log('Connected to WS Server: ' + IO_SERVER)
        socket.emit('room', EXT_ID);
    })

    socket.on(MESSAGE_TO_EXTENSION, function (data: any) {
        return sendMessageToCurrentTab(data)
    });
}