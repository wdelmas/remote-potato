import { PLAYER_PLAY, PLAYER_ENTER_FULLSCREEN, VideoPlayerMessage } from "../../../../communication/actions";
import { LOAD_CURRENT_VIDEO_STATE } from "./actions";

export interface VideoPlayerReducer {
    controller: Controller,
    current: VideoPlayerMessage
}

export interface Controller {
    isFullScreen: boolean
}

export default (state = emptyVideoPlayerReducer(), action: any) => {
    switch (action.type) {
        case LOAD_CURRENT_VIDEO_STATE:
            return Object.assign({}, state, {
                current: action.current
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
            isFullScreen: false
        },
        current: null
    }
}
