import { eventFire } from "../dom";
import { Debugger } from "../../../../../communication/Debugger";
import { messageType } from "../../../../../communication/actions";
import { FeedbackComponent, appendFeedbackComponentToContainer } from "./feedbackAction";

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
    exitFullScreen: () => void,
    setFeedBackAction: (messageType: messageType) => void
}

export interface VideoPlayerWrapper {
    player: HTMLVideoElement,
    container?: HTMLElement[]
    feedBackAction?: FeedbackComponent
    customBehavior?: Partial<VideoPlayer>
}

export const getCurrentPlayerByDomain = (domain: string): VideoPlayer => {
    let videoPlayer: VideoPlayerWrapper = null

    videoPlayer = getVideoPlayer(domain)

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
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            playerWrapper.player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLVideoElement
            playerWrapper.container = [document.getElementById('player')]

            break
        case VIMEO:
            playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
            playerWrapper.container = [
                document.getElementsByClassName("player js-player player")[0] as any,
                document.getElementsByClassName("player_area")[0] as any]

            if (playerWrapper.player)
                eventFire(playerWrapper.player, 'click');

            break
        case AMAZON:
            playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
            playerWrapper.container = [
                document.getElementsByClassName("webPlayerContainer")[0] as any]

            const playBtn = document.getElementsByClassName('av-play-icon js-deeplinkable')[0]
            if (playBtn)
                eventFire(playBtn, 'click');
            break

        default:
            playerWrapper.player = document.getElementsByTagName('video')[0] as HTMLVideoElement
            playerWrapper.container = [document.getElementsByTagName('video')[0] && document.getElementsByTagName('video')[0].parentNode as HTMLVideoElement]
            break
    }

    if (playerWrapper.player) {
        playerWrapper.feedBackAction = appendFeedbackComponentToContainer(playerWrapper.container[0]);
        Debugger.log('Player loaded from: ' + window.location.href)
        Debugger.log(playerWrapper)
    }

    return playerWrapper
}

let feedBackTimeout: any;

export const loadVideoPlayer = (wrapper: VideoPlayerWrapper, customVideoPlayer?: Partial<VideoPlayer>): VideoPlayer => {
    const videoPlayer = {
        play: function () {
            wrapper.player.play()
            wrapper.feedBackAction.value.textContent = getCurrentTimeAsPercentage(wrapper.player);
        },
        pause: function () {
            wrapper.player.pause()
            wrapper.feedBackAction.value.textContent = getCurrentTimeAsPercentage(wrapper.player);
        },
        seekBackward: function (seconds: number) {
            wrapper.player.currentTime -= seconds
            wrapper.feedBackAction.value.textContent = getCurrentTimeAsPercentage(wrapper.player);
        },
        seekForward: function (seconds: number) {
            wrapper.player.currentTime += seconds
            wrapper.feedBackAction.value.textContent = getCurrentTimeAsPercentage(wrapper.player);
        },
        volumeUp: function (seconds: number) {
            if (wrapper.player.volume + seconds < 1)
                wrapper.player.volume += seconds
            wrapper.feedBackAction.value.textContent = (wrapper.player.volume * 100).toFixed(0).toString();
            return wrapper.player.volume
        },
        volumeDown: function (seconds: number) {
            if (wrapper.player.volume - seconds > 0)
                wrapper.player.volume -= seconds
            wrapper.feedBackAction.value.textContent = (wrapper.player.volume * 100).toFixed(0).toString();
            return wrapper.player.volume
        },
        enterFullScreen: function () {
            wrapper.feedBackAction.value.textContent = ""
            wrapper.container.forEach((c) => {
                c.style.position = "fixed";
                c.style.top = "0";
                c.style.zIndex = "9990";
                c.style.left = "0";
                c.style.maxHeight = "inherit";
                c.style.height = "100vh";
            })
        },
        exitFullScreen: function () {
            wrapper.feedBackAction.value.textContent = ""
            wrapper.container.forEach((c) => {
                c.style.position = "inherit";
                c.style.top = "auto";
                c.style.zIndex = "auto";
                c.style.left = "auto";
                c.style.height = "inherit";
            })
        },
        setFeedBackAction: function (messageType: messageType) {
            clearTimeout(feedBackTimeout)

            wrapper.feedBackAction.component.className = 'visible';
            wrapper.feedBackAction.component.className = messageType;

            feedBackTimeout = setTimeout(function () {
                wrapper.feedBackAction.component.className = 'hidden';
            }, 1000);
        }
    };
    return customVideoPlayer ? Object.assign({}, videoPlayer, customVideoPlayer) : videoPlayer
}

function getCurrentTimeAsPercentage(player: HTMLVideoElement) {
    const percentage = ((100 * player.currentTime) / player.duration).toFixed(0).toString();
    return `${percentage}%`;
}