import { MESSAGE_FROM_EXTENSION, IO_SERVER, MESSAGE_FROM_CLIENT } from "../../../communication/constants";
import * as SocketIOClient from 'socket.io-client';
import { Debugger } from "../../../communication/Debugger";
import { message, HANDSHAKE } from "../../../communication/actions";
import { loadRoomId, connectedToWsServer } from "../store/socket/actions";
import { State } from "../store/index";
import { Store } from "redux";
import { loadCurrentVideoPlayerState } from "../store/videoPlayer/actions";


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
        const sendHandshake = () =>
            sendMessageFromClient(socket, store.getState().socketReducer.roomId, {
                extensionId: ROOM_ID,
                from: 'webapp',
                type: HANDSHAKE
            })
        sendHandshake()
    })

    socket.on(MESSAGE_FROM_EXTENSION, function (data: message) {
        store.dispatch(loadCurrentVideoPlayerState(data.infos))
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
