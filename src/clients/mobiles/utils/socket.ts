import { MESSAGE_FROM_EXTENSION, IO_SERVER } from "../../../communication/constants";
import * as SocketIOClient from 'socket.io-client';
import { Debugger } from "../../../communication/Debugger";
import { message } from "../../../communication/actions";
import { loadRoomId } from "../store/socket/actions";


const getRoomId = () => {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}

export const initSocket = (store: any) => {

    const ROOM_ID = getRoomId()

    store.dispatch(loadRoomId(ROOM_ID))

    const socket = SocketIOClient.connect(IO_SERVER);
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

    return socket
}


