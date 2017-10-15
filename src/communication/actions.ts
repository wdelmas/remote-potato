export const COMMONS_MESSAGE_TYPE = 'COMMONS'
export const TABS_MESSAGE_TYPE = 'TABS'
export const PLAYER_ACTIONS_MESSAGE_TYPE = 'PLAYER_ACTIONS'


export type COMMONS = 'HANDSHAKE' | 'POPUP_OPENED' | 'WEB_APP_URL'
export const HANDSHAKE = 'HANDSHAKE'
export const POPUP_OPENED = 'POPUP_OPENED'
export const WEB_APP_URL = 'WEB_APP_URL'

export type TABS = 'OPEN_NEW_TAB' | 'REMOVE_TAB' | 'REFRESH_TAB'
export const OPEN_NEW_TAB = 'OPEN_NEW_TAB'
export const REMOVE_TAB = 'REMOVE_TAB'
export const REFRESH_TAB = 'REFRESH_TAB'


export type PLAYER_ACTIONS = 'PLAYER_FOUND' | 'GO_TO_TIME' | 'PLAYER_SEEK_FORWARD' | 'PLAYER_SEEK_BACKWARD' | 'PLAYER_PLAY' | 'PLAYER_PAUSE' | 'CHANGE_VOLUME' | 'PLAYER_ENTER_FULLSCREEN' | 'PLAYER_EXIT_FULLSCREEN'
export const PLAYER_FOUND = 'PLAYER_FOUND'
export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const GO_TO_TIME = 'GO_TO_TIME'
export const PLAYER_SEEK_FORWARD = 'PLAYER_SEEK_FORWARD'
export const PLAYER_SEEK_BACKWARD = 'PLAYER_SEEK_BACKWARD'
export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const PLAYER_ENTER_FULLSCREEN = 'PLAYER_ENTER_FULLSCREEN'
export const PLAYER_EXIT_FULLSCREEN = 'PLAYER_EXIT_FULLSCREEN'


export type messageType  = 'COMMONS'  | 'TABS' | 'PLAYER_ACTIONS'
export type actionType = PLAYER_ACTIONS | COMMONS | TABS


export interface message {
    from: 'extension' | 'webapp'
    roomId?: string
    type: messageType
    actionType: actionType
    action?: string
    infos?: VideoPlayerMessage
}

export interface VideoPlayerMessage {
    title: string
    domain: string
    currentTime: number
    duration: number
    isPlaying: boolean
    currentTimeAsPercentage: number
    poster?: string
    favicon?: string
    dominantBackgroundColor?: string
    volume: number
}