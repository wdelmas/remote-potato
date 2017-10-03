import { VideoPlayerWrapper, defaultFullScreenBehavior, defaultExitFullScreenBehavior } from "../index"
import { eventFire } from "../../dom"

export const loadVimeoPlayer = (playerWrapper: VideoPlayerWrapper) => {
    playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
    playerWrapper.container = [
        document.getElementsByClassName("player js-player player")[0] as any,
        document.getElementsByClassName("player_area")[0] as any]

    if (playerWrapper.player)
        eventFire(playerWrapper.player, 'click');
}