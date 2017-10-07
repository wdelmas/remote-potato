import { PLAYER_PLAY } from "../../../../communication/actions";

export interface VideoPlayerReducer {
    isPlaying: boolean
}

export default (state = emptyVideoPlayerReducer(), action: any) => {
    switch (action.type) {
        case PLAYER_PLAY:
            return Object.assign({}, state, {
                isPlaying: state.isPlaying
            })
        default:
            return state
    }
}

export function emptyVideoPlayerReducer(): VideoPlayerReducer {
    return {
        isPlaying: false
    }
}
