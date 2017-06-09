import * as SocketIOClient from 'socket.io-client';
import { HOST, MESSAGE_TO_EXTENSION, PORT } from "../../../../communication/constants";
import { sendMessageToCurrentTab } from "./browser";

const socket = SocketIOClient.connect(`http://${HOST}:${PORT}`);

export const initSockets = () => {

    socket.on(MESSAGE_TO_EXTENSION, function (data: any) {
        console.log(data)
        return sendMessageToCurrentTab(data)
    });
}