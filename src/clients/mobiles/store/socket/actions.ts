export const LOAD_ROOM_ID = 'LOAD_ROOM_ID'
export const CONNECTED_TO_WS_SERVER = 'CONNECTED_TO_WS_SERVER'

export const loadRoomId = (roomId: string) => {
    return {
        type: LOAD_ROOM_ID,
        roomId
    }
}

export const connectedToWsServer = (connected: boolean) => {
    return {
        type: CONNECTED_TO_WS_SERVER,
        connected
    }
}

