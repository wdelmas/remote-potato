import { MESSAGE_FROM_EXTENSION, IO_SERVER, MESSAGE_FROM_CLIENT } from "../../../communication/constants";
import * as SocketIOClient from 'socket.io-client';
import { Debugger } from "../../../communication/Debugger";
import { message } from "../../../communication/actions";
import { loadRoomId, connectedToWsServer } from "../store/socket/actions";
import { State } from "../store/index";
import { Store } from "redux";


const getRoomId = () => {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}

export interface SocketService {
    sendMessageFromClient: (messageToSend: Partial<message>) => void
}

export const makeSocketService = (store: Store<State>): SocketService => {

    const socket = SocketIOClient.connect(IO_SERVER);

    const ROOM_ID = getRoomId()

    store.dispatch(loadRoomId(ROOM_ID))

    socket.on('connect', () => {
        Debugger.log('Connected to WS Server: ' + IO_SERVER)
        socket.emit('room', ROOM_ID);
        store.dispatch(connectedToWsServer(true))
    })

    socket.on(MESSAGE_FROM_EXTENSION, function (data: message) {
        switch (data.type) {
            case 'PLAYER_VOLUME_UP':
            case 'PLAYER_VOLUME_DOWN':
                break
        }
    });
    return {
        sendMessageFromClient: (messageToSend: Partial<message>) => {
            return sendMessageFromClient(socket, store.getState().socketReducer.roomId, messageToSend)
        }
    }
}


const sendMessageFromClient = (socket: any, roomId: string, messageToSend: Partial<message>) => {
    const message = Object.assign({}, messageToSend, {
        extensionId: roomId,
        from: 'webapp'
    }) as message
    socket.emit(MESSAGE_FROM_CLIENT, message)
}