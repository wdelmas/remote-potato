import { LOAD_ROOM_ID } from "./actions";

export interface SocketReducer {
    roomId: string
}

export default (state = SocketReducer(), action: any) => {
    switch (action.type) {
        case LOAD_ROOM_ID:
            return Object.assign({}, state, {
                roomId: action.roomId
            })
        default:
            return state
    }
}

export function SocketReducer(): SocketReducer {
    return {
        roomId: null
    }
}
