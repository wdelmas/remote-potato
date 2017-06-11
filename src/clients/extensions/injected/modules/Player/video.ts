import { eventFire } from "../dom";

const FMOVIES_DOMAIN = ['fmovies', 'fmovies']

export interface VideoPlayer {
    play: () => void,
    pause: () => void,
    seekForward: (seconds: number) => void,
    seekBackward: (seconds: number) => void
}

export const getCurrentPlayerByDomain = (domain: string): VideoPlayer => {
    let player: HTMLVideoElement = null

    if (FMOVIES_DOMAIN.indexOf(domain) > -1) {
        player = getFMoviesPlayer()
    }

    if (player)
        return loadVideoPlayer(player)

    return null
}

export const getFMoviesPlayer = (): HTMLVideoElement => {
    //only compatible with basic HTML5 player     
    const cover = document.getElementsByClassName('cover')[0]
    if (cover)
        eventFire(cover, 'click');
    const player = document.getElementsByClassName('jw-video jw-reset')[0]
    return player as HTMLVideoElement
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