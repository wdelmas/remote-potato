import { VideoPlayerWrapper, defaultFullScreenBehavior } from "../index"
import { eventFire } from "../../dom"

export const loadDefaultPlayer = (playerWrapper: VideoPlayerWrapper) => {
    playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
    playerWrapper.container = [document.getElementsByTagName('video')[0] && document.getElementsByTagName('video')[0].parentNode as HTMLVideoElement]
}