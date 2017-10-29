import { VideoPlayerWrapper, defaultFullScreenBehavior } from "../index"
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
            let regexMatch = new RegExp(/Watch\s(.*)\sOnline | Free Movies/g).exec(title);
            return (regexMatch && regexMatch[1]) || title;
        }
    }
}