import { MESSAGE_FROM_EXTENSION, IO_SERVER, MESSAGE_FROM_CLIENT } from "../../../communication/constants";
import * as SocketIOClient from 'socket.io-client';
import { Debugger } from "../../../communication/Debugger";
import { message, HANDSHAKE, COMMONS_MESSAGE_TYPE, actionType, messageType,PLAYER_ACTIONS_MESSAGE_TYPE, TABS_MESSAGE_TYPE } from "../../../communication/actions";
import { loadRoomId, connectedToWsServer } from "../store/socket/actions";
import { State } from "../store/index";
import { Store } from "redux";
import { loadCurrentVideoPlayerState } from "../store/videoPlayer/actions";


const getRoomId = () => {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}

export interface SocketService {
    sendPlayerActionsMessageFromClient: (messageToSend: Partial<message>, options?: {
        feedbackVibrate: boolean
    }) => void
    sendTabsActionsMessageFromClient: (messageToSend: Partial<message>, options?: {
        feedbackVibrate: boolean
    }) => void
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
            sendMessageFromClient(socket, store.getState().socketReducer.roomId, COMMONS_MESSAGE_TYPE, {
                roomId: ROOM_ID,
                from: 'webapp',
                type: COMMONS_MESSAGE_TYPE,
                actionType: HANDSHAKE
            })
        sendHandshake()
    })

    socket.on(MESSAGE_FROM_EXTENSION, function (data: message) {
        store.dispatch(loadCurrentVideoPlayerState(data.infos))
    });
    return {
        sendPlayerActionsMessageFromClient: (messageToSend: Partial<message>, options?: {
            feedbackVibrate: boolean
        }) => {
            sendMessageFromClient(socket, store.getState().socketReducer.roomId, PLAYER_ACTIONS_MESSAGE_TYPE, messageToSend)
            if (options.feedbackVibrate)
                vibrate()
        },
        sendTabsActionsMessageFromClient: (messageToSend: Partial<message>, options?: {
            feedbackVibrate: boolean
        }) => {
            sendMessageFromClient(socket, store.getState().socketReducer.roomId, TABS_MESSAGE_TYPE, messageToSend)
            if (options.feedbackVibrate)
                vibrate()
        }
    }
}

const vibrate = () => {
    if (navigator.vibrate)
        navigator.vibrate(1)
}

const sendMessageFromClient = (socket: any, roomId: string, messageType: messageType, messageToSend: Partial<message>) => {
    const message = Object.assign({}, messageToSend, {
        roomId: roomId,
        type: messageType,
        from: 'webapp'
    }) as message
    socket.emit(MESSAGE_FROM_CLIENT, message)
}
