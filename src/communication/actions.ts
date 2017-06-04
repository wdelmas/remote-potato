export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const PLAYER_SEEK_FORWARD = 'PLAYER_SEEK_FORWARD'

export type PLAYER_ACTIONS = 'PLAYER_SEEK_FORWARD' | 'PLAYER_PLAY' | 'PLAYER_PAUSE'  

export type messageType = PLAYER_ACTIONS


export interface message {
    type: messageType
    action?: string
}