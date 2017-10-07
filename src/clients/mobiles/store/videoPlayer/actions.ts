import { PLAYER_PLAY } from "../../../../communication/actions";

export const playBtn_Clicked = (isPlaying: boolean) => {
    return {
        type: PLAYER_PLAY,
        isPlaying
    }
}