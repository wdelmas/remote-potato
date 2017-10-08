import { PLAYER_PLAY, VideoPlayerMessage } from "../../../../communication/actions";
import { LOAD_CURRENT_VIDEO_STATE } from "./actions";

export interface VideoPlayerReducer {
    controller: Controller,
    current: VideoPlayerMessage
}

export interface Controller {
    isPlaying: boolean
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
        default:
            return state
    }
}

export function emptyVideoPlayerReducer(): VideoPlayerReducer {
    return {
        controller: {
            isPlaying: false
        },
        current: null
    }
}
