import { PLAYER_PLAY, PLAYER_ENTER_FULLSCREEN, VideoPlayerMessage } from "../../../../communication/actions";
import { LOAD_CURRENT_VIDEO_STATE } from "./actions";

export interface VideoPlayerReducer {
    controller: Controller,
    current: VideoPlayerMessage
}

export interface Controller {
    isPlaying: boolean
    isFullScreen: boolean
}

export default (state = emptyVideoPlayerReducer(), action: any) => {
    switch (action.type) {
        case LOAD_CURRENT_VIDEO_STATE:
            return Object.assign({}, state, {
                current: action.current
            })
        case PLAYER_PLAY:
            return Object.assign({}, state, {
                controller: {
                    isPlaying: action.isPlaying
                }
            })
        case PLAYER_ENTER_FULLSCREEN:
            return Object.assign({}, state, {
                controller: {
                    isFullScreen: action.isFullScreen
                }
            })
        default:
            return state
    }
}

export function emptyVideoPlayerReducer(): VideoPlayerReducer {
    return {
        controller: {
            isPlaying: false,
            isFullScreen: false
        },
        current: null
    }
}
