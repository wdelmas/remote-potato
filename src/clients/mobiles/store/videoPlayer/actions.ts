import { PLAYER_PLAY, VideoPlayerMessage } from "../../../../communication/actions";
export const LOAD_CURRENT_VIDEO_STATE = 'LOAD_CURRENT_VIDEO_STATE'


export const loadCurrentVideoPlayerState = (current: VideoPlayerMessage) => {
    return {
        type: LOAD_CURRENT_VIDEO_STATE,
        current
    }
}

export const playBtn_Clicked = (isPlaying: boolean) => {
    return {
        type: PLAYER_PLAY,
        isPlaying
    }
}