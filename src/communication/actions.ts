export const HANDSHAKE = 'HANDSHAKE'
export const POPUP_OPENED = 'POPUP_OPENED'
export const WEB_APP_URL = 'WEB_APP_URL'

export type COMMONS = 'HANDSHAKE' | 'POPUP_OPENED' | 'WEB_APP_URL'



export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const PLAYER_SEEK_FORWARD = 'PLAYER_SEEK_FORWARD'
export const PLAYER_SEEK_BACKWARD = 'PLAYER_SEEK_BACKWARD'
export const PLAYER_VOLUME_UP = 'PLAYER_VOLUME_UP'
export const PLAYER_VOLUME_DOWN = 'PLAYER_VOLUME_DOWN'
export const PLAYER_ENTER_FULLSCREEN = 'PLAYER_ENTER_FULLSCREEN'
export const PLAYER_EXIT_FULLSCREEN = 'PLAYER_EXIT_FULLSCREEN'

export type PLAYER_ACTIONS = 'PLAYER_SEEK_FORWARD' | 'PLAYER_SEEK_BACKWARD' | 'PLAYER_PLAY' | 'PLAYER_PAUSE' | 'PLAYER_VOLUME_UP' | 'PLAYER_VOLUME_DOWN' | 'PLAYER_ENTER_FULLSCREEN' | 'PLAYER_EXIT_FULLSCREEN'

export type messageType = PLAYER_ACTIONS | COMMONS


export interface message {
    from : 'extension' | 'webapp'
    extensionId?: string
    type: messageType
    action?: string
    infos?: VideoPlayerMessage
}

export interface VideoPlayerMessage {
    title: string
    domain: string
    currentTime: number
    currentTimeAsPercentage: string
    poster?: string
    favicon?: string
    volume: number
    volumeAsPercentage: string
}