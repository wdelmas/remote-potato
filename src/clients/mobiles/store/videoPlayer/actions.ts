import { PLAYER_PLAY, PLAYER_ENTER_FULLSCREEN, VideoPlayerMessage } from "../../../../communication/actions";
export const LOAD_CURRENT_VIDEO_STATE = 'LOAD_CURRENT_VIDEO_STATE'


export const loadCurrentVideoPlayerState = (current: VideoPlayerMessage) => {
    return {
        type: LOAD_CURRENT_VIDEO_STATE,
        current
    }
}

export const fullScreenBtn_Clicked = (isFullScreen: boolean) => {
    return {
        type: PLAYER_ENTER_FULLSCREEN,
        isFullScreen
    }
}