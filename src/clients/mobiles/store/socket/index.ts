import { LOAD_ROOM_ID, CONNECTED_TO_WS_SERVER } from "./actions";

export interface SocketReducer {
    connected: boolean
    roomId: string
}

export default (state = emptySocketReducer(), action: any) => {
    switch (action.type) {
        case LOAD_ROOM_ID:
            return Object.assign({}, state, {
                roomId: action.roomId
            })
        case CONNECTED_TO_WS_SERVER:
            return Object.assign({}, state, {
                connected: action.connected
            })
        default:
            return state
    }
}

export function emptySocketReducer(): SocketReducer {
    return {
        connected: false,
        roomId: null
    }
}
