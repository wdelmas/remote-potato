import { eventFire } from "../dom";

const FMOVIES_DOMAIN = ['fmovies', 'fmovies']

export interface VideoPlayer {
    getPlayer: () => HTMLVideoElement,
    play: () => void,
    pause: () => void,
    seekForward: (seconds: number) => void,
    seekBackward: (seconds: number) => void
}

export const getCurrentPlayerByDomain = (domain: string): VideoPlayer => {
    if (FMOVIES_DOMAIN.indexOf(domain) > -1)
        return loadFMoviesPlayer()
    return null
}

export const loadFMoviesPlayer = (): VideoPlayer => {
    return {
        getPlayer: (): HTMLVideoElement => {
            //only compatible with basic HTML5 player 
            const player = document.getElementsByClassName('jw-video jw-reset')[0]
            return player as HTMLVideoElement
        },
        play: function () {
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            this.getPlayer().play()
        },
        pause: function () {
            this.getPlayer().pause()
        },
        seekBackward: function (seconds: number) {
            this.getPlayer().currentTime -= seconds
        },
        seekForward: function (seconds: number) {
            this.getPlayer().currentTime += seconds
        }
    }
}