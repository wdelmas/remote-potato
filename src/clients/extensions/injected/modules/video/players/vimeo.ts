import { VideoPlayerWrapper, defaultFullScreenBehavior } from "../index"
import { eventFire } from "../../dom"

export const loadVimeoPlayer = (playerWrapper: VideoPlayerWrapper) => {
    playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
    playerWrapper.container = [
        document.getElementsByClassName("player js-player player")[0] as any,
        document.getElementsByClassName("player_area")[0] as any]

    playerWrapper.customBehavior = {
        getTitle: function () {
            return document.getElementsByTagName('h1')[0].innerText;
        },
        getSubTitle: function () {
            return document.getElementsByClassName('clip_info-subline--watch clip_info-subline--inline')[0].children[1].children[0].children[0].children[0]['innerText'];
        }
    }

    if (playerWrapper.player)
        eventFire(playerWrapper.player, 'click');
}