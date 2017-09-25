import { eventFire } from "../dom";
import { Debugger } from "../../../../../communication/Debugger";

const FMOVIES = 'fmovies'
const NINE_ANIME = '9anime'
const MY_CLOUD = 'mycloud'
const VIMEO = 'vimeo'
const AMAZON = 'primevideo'


const PLAYERS_DOMAIN = [FMOVIES, NINE_ANIME, MY_CLOUD, VIMEO, AMAZON]

export interface VideoPlayer {
    play: () => void,
    pause: () => void,
    seekForward: (seconds: number) => void,
    seekBackward: (seconds: number) => void,
    volumeUp: (seconds: number) => number,
    volumeDown: (seconds: number) => number,
    enterFullScreen: () => void,
    exitFullScreen: () => void
}

export interface VideoPlayerWrapper {
    player: HTMLVideoElement,
    container?: HTMLElement[]
    customBehavior?: Partial<VideoPlayer>
}

export const getCurrentPlayerByDomain = (domain: string): VideoPlayer => {
    let videoPlayer: VideoPlayerWrapper = null

    if (PLAYERS_DOMAIN.indexOf(domain) > -1) {
        videoPlayer = getVideoPlayer(domain)
    }

    if (videoPlayer && videoPlayer.player) {
        return loadVideoPlayer(videoPlayer, videoPlayer.customBehavior)
    }

    return null
}

export const getVideoPlayer = (domain: string): VideoPlayerWrapper => {

    let playerWrapper: VideoPlayerWrapper = {
        player: null
    }
    switch (domain) {
        case MY_CLOUD:
        case FMOVIES:
        case NINE_ANIME:
            //only compatible with basic HTML5 player     
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            playerWrapper.player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLVideoElement
            playerWrapper.container = [document.getElementById('player')]

            break
        case VIMEO:
            //only compatible with basic HTML5 player     
            playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
            playerWrapper.container = [
                document.getElementsByClassName("player js-player player")[0] as any,
                document.getElementsByClassName("player_area")[0] as any]

            if (playerWrapper.player)
                eventFire(playerWrapper.player, 'click');

            break
        case AMAZON:
            //only compatible with basic HTML5 player     
            playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
            playerWrapper.container = [
                document.getElementsByClassName("webPlayerContainer")[0] as any]

            const playBtn = document.getElementsByClassName('av-play-icon js-deeplinkable')[0]
            if (playBtn)
                eventFire(playBtn, 'click');

            break
    }

    if (playerWrapper.player) {

        Debugger.log('Player loaded from: ' + window.location.href)
        Debugger.log(playerWrapper)
    }

    return playerWrapper
}



export const loadVideoPlayer = (wrapper: VideoPlayerWrapper, customVideoPlayer?: Partial<VideoPlayer>): VideoPlayer => {
    const videoPlayer = {
        play: function () {
            wrapper.player.play()
        },
        pause: function () {
            wrapper.player.pause()
        },
        seekBackward: function (seconds: number) {
            wrapper.player.currentTime -= seconds
        },
        seekForward: function (seconds: number) {
            wrapper.player.currentTime += seconds
        },
        volumeUp: function (seconds: number) {
            if (wrapper.player.volume + seconds < 1)
                wrapper.player.volume += seconds
            return wrapper.player.volume
        },
        volumeDown: function (seconds: number) {
            if (wrapper.player.volume - seconds > 0)
                wrapper.player.volume -= seconds
            return wrapper.player.volume
        },
        enterFullScreen: function () {
            wrapper.container.forEach((c) => {
                c.style.position = "fixed";
                c.style.top = "0";
                c.style.zIndex = "9990";
                c.style.left = "0";
            })
        },
        exitFullScreen: function () {
            wrapper.container.forEach((c) => {
                c.style.position = "inherit";
                c.style.top = "auto";
                c.style.zIndex = "auto";
                c.style.left = "auto";
            })
        }
    };
    return customVideoPlayer ? Object.assign({}, videoPlayer, customVideoPlayer) : videoPlayer
}
