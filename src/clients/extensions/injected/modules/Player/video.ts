import { eventFire } from "../dom";
import { Debugger } from "../../../../../communication/Debugger";

const FMOVIES = 'fmovies'
const NINE_ANIME = '9anime'
const MY_CLOUD = 'mycloud'

const PLAYERS_DOMAIN = [FMOVIES, NINE_ANIME, MY_CLOUD]

export interface VideoPlayer {
    play: () => void,
    pause: () => void,
    seekForward: (seconds: number) => void,
    seekBackward: (seconds: number) => void,
    volumeUp: (seconds: number) => void,
    volumeDown: (seconds: number) => void,
    enterFullScreen: () => void

}

export interface VideoPlayerWrapper {
    player: HTMLVideoElement,
    container?: HTMLElement
}

export const getCurrentPlayerByDomain = (domain: string): VideoPlayer => {
    let videoPlayer: VideoPlayerWrapper = null

    if (PLAYERS_DOMAIN.indexOf(domain) > -1) {
        videoPlayer = getVideoPlayer(domain)
    }

    if (videoPlayer && videoPlayer.player)
        return loadVideoPlayer(videoPlayer)

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
            playerWrapper.container = document.getElementById('jw')

            Debugger.log(playerWrapper)
            break
    }

    if (playerWrapper.player)
        Debugger.log('Player loaded from: ' + window.location.href)

    return playerWrapper
}



export const loadVideoPlayer = (wrapper: VideoPlayerWrapper): VideoPlayer => {
    return {
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
            if (wrapper.player.volume < 1)
                wrapper.player.volume += seconds
        },
        volumeDown: function (seconds: number) {
            if (wrapper.player.volume > 0)
                wrapper.player.volume -= seconds
        },
        enterFullScreen: function () {
            wrapper.container.style.position = "fixed";
            wrapper.container.style.top = "0";
            wrapper.container.style.left = "0";
        }
    }
}