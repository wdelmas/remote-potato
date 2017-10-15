export const HANDSHAKE = 'HANDSHAKE'
export const POPUP_OPENED = 'POPUP_OPENED'
export const WEB_APP_URL = 'WEB_APP_URL'

export type COMMONS = 'HANDSHAKE' | 'POPUP_OPENED' | 'WEB_APP_URL'



export const PLAYER_FOUND = 'PLAYER_FOUND'
export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const GO_TO_TIME = 'GO_TO_TIME'
export const PLAYER_SEEK_FORWARD = 'PLAYER_SEEK_FORWARD'
export const PLAYER_SEEK_BACKWARD = 'PLAYER_SEEK_BACKWARD'
export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const PLAYER_ENTER_FULLSCREEN = 'PLAYER_ENTER_FULLSCREEN'
export const PLAYER_EXIT_FULLSCREEN = 'PLAYER_EXIT_FULLSCREEN'

export type PLAYER_ACTIONS = 'PLAYER_FOUND' | 'GO_TO_TIME' | 'PLAYER_SEEK_FORWARD' | 'PLAYER_SEEK_BACKWARD' | 'PLAYER_PLAY' | 'PLAYER_PAUSE' | 'CHANGE_VOLUME' | 'PLAYER_ENTER_FULLSCREEN' | 'PLAYER_EXIT_FULLSCREEN'

export type messageType = PLAYER_ACTIONS | COMMONS


export interface message {
    from: 'extension' | 'webapp'
    extensionId?: string
    type: messageType
    action?: string
    infos?: VideoPlayerMessage
}

export interface VideoPlayerMessage {
    title: string
    domain: string
    currentTime: number
    duration: number
    currentTimeAsPercentage: number
    poster?: string
    favicon?: string
    dominantBackgroundColor?: string
    volume: number
}