import { VideoPlayerWrapper, defaultFullScreenBehavior, defaultExitFullScreenBehavior } from "../index"

export const loadYoutubePlayer = (playerWrapper: VideoPlayerWrapper) => {
    playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
    playerWrapper.container = [
        document.getElementById("player-container")
        || (document.getElementsByClassName("html5-video-container") && document.getElementsByClassName("html5-video-container")[0])
    ] as any[]

    playerWrapper.customBehavior = {
        getPoster: function () {
            var searchParams = new URLSearchParams(window.location.search);
            let videoId = searchParams.get("v");
            return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
        },
        getTitle: function () {
            let title = document.title;
            return new RegExp(/(.*)\s- YouTube/g).exec(title)[1];
        },
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