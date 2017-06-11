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
    seekBackward: (seconds: number) => void
}

export const getCurrentPlayerByDomain = (domain: string): VideoPlayer => {
    let player: HTMLVideoElement = null

    if (PLAYERS_DOMAIN.indexOf(domain) > -1) {
        player = getVideoPlayer(domain)
    }

    if (player)
        return loadVideoPlayer(player)

    return null
}

export const getVideoPlayer = (domain: string): HTMLVideoElement => {

    let player: HTMLVideoElement = null

    switch (domain) {
        case MY_CLOUD:
        case FMOVIES:
        case NINE_ANIME:
            //only compatible with basic HTML5 player     
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLVideoElement
            break
    }

    if (player)
        Debugger.log('Player loaded from: '+ window.location.href)

    return player
}

export const loadVideoPlayer = (player: HTMLVideoElement): VideoPlayer => {
    return {
        play: function () {
            player.play()
        },
        pause: function () {
            player.pause()
        },
        seekBackward: function (seconds: number) {
            player.currentTime -= seconds
        },
        seekForward: function (seconds: number) {
            player.currentTime += seconds
        }
    }
}