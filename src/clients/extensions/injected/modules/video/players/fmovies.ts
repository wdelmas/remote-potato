import { VideoPlayerWrapper, defaultFullScreenBehavior, defaultExitFullScreenBehavior } from "../index"
import { eventFire } from "../../dom";

export const loadFmoviesPlayer = (playerWrapper: VideoPlayerWrapper) => {
    const cover = document.getElementsByClassName('cover')[0]
    if (cover)
        eventFire(cover, 'click');
    playerWrapper.player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLVideoElement
    playerWrapper.container = [document.getElementById('player')]

    playerWrapper.customBehavior = {
        getTitle: function () {
            let title = document.title;
            return new RegExp(/Watch\s(.*)\sin HD on Fmovies\.to/g).exec(title)[1];
        }
    }
}