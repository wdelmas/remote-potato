export const LOAD_ROOM_ID = 'LOAD_ROOM_ID'

export const loadRoomId = (roomId: string) => {
    return {
        type: LOAD_ROOM_ID,
        roomId
    }
}
