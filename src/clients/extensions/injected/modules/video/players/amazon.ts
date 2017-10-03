import { VideoPlayerWrapper, defaultFullScreenBehavior, defaultExitFullScreenBehavior } from "../index"
import { eventFire } from "../../dom"

export const loadAmazonPlayer = (playerWrapper: VideoPlayerWrapper) => {
    playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
    playerWrapper.container = [document.getElementsByClassName("webPlayerContainer")[0] as any]

    const playBtn = document.getElementsByClassName('av-play-icon js-deeplinkable')[0]
    if (playBtn)
        eventFire(playBtn, 'click');
}