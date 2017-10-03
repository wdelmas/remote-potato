import { VideoPlayerWrapper, defaultFullScreenBehavior, defaultExitFullScreenBehavior } from "../index"

export const loadYoutubePlayer = (playerWrapper: VideoPlayerWrapper) => {
    playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
    playerWrapper.container = [document.getElementById("player-container") as any]

    playerWrapper.customBehavior = {
        enterFullScreen: function () {
            defaultFullScreenBehavior(playerWrapper)
            playerWrapper.player.style.minWidth = '100vw';
            playerWrapper.player.style.minHeight = '100vh';

        },
        exitFullScreen: function () {
            defaultExitFullScreenBehavior(playerWrapper)
            playerWrapper.player.style.minWidth = 'inherit';
            playerWrapper.player.style.minHeight = 'inherit';
        }
    }
}