import { eventFire } from "../dom";
import { Debugger } from "../../../../../communication/Debugger";
import { messageType, VideoPlayerMessage } from "../../../../../communication/actions";
import { FeedbackComponent, appendFeedbackComponentToContainer } from "./feedbackAction";
import { loadYoutubePlayer } from "./players/youtube";
import { loadAmazonPlayer } from "./players/amazon";
import { loadVimeoPlayer } from "./players/vimeo";
import { loadDefaultPlayer } from "./players/default";

const FMOVIES = 'fmovies'
const NINE_ANIME = '9anime'
const MY_CLOUD = 'mycloud'
const VIMEO = 'vimeo'
const AMAZON = 'primevideo'
const YOUTUBE = 'youtube'


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
    getResponse: () => VideoPlayerMessage
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
        case FMOVIES:
        case NINE_ANIME:
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            playerWrapper.player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLVideoElement
            playerWrapper.container = [document.getElementById('player')]

            break
        case VIMEO:
            loadVimeoPlayer(playerWrapper)
            break
        case AMAZON:
            loadAmazonPlayer(playerWrapper)
            break
        case YOUTUBE:
            loadYoutubePlayer(playerWrapper)
            break;
        default:
            loadDefaultPlayer(playerWrapper)
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
    const videoPlayer: VideoPlayer = {
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
            else
                wrapper.player.volume = 1
            wrapper.feedBackAction.value.textContent = (wrapper.player.volume * 100).toFixed(0).toString();
            return wrapper.player.volume
        },
        volumeDown: function (seconds: number) {
            if (wrapper.player.volume - seconds > 0)
                wrapper.player.volume -= seconds
            else
                wrapper.player.volume = 0
            wrapper.feedBackAction.value.textContent = (wrapper.player.volume * 100).toFixed(0).toString();
            return wrapper.player.volume
        },
        enterFullScreen: function () {
            defaultFullScreenBehavior(wrapper)
        },
        exitFullScreen: function () {
            defaultExitFullScreenBehavior(wrapper)
        },
        setFeedBackAction: function (messageType: messageType) {
            clearTimeout(feedBackTimeout)

            wrapper.feedBackAction.component.className = 'visible';
            wrapper.feedBackAction.component.className = messageType;

            feedBackTimeout = setTimeout(function () {
                wrapper.feedBackAction.component.className = 'hidden';
            }, 1000);
        },
        getResponse: (): VideoPlayerMessage => {
            return {
                currentTime: wrapper.player.currentTime,
                currentTimeAsPercentage: getCurrentTimeAsPercentage(wrapper.player),
                domain: window.location.host,
                title: document.title,
                poster: getPosterImage(),
                favicon: getFavicon(),
                volume: wrapper.player.volume,
                volumeAsPercentage: (wrapper.player.volume * 100).toFixed(0).toString() + '%'
            }
        }
    };
    return customVideoPlayer ? Object.assign({}, videoPlayer, customVideoPlayer) : videoPlayer
}

const getPosterImage = () => {
    let metas = document.getElementsByTagName('meta');
    let images = [];
    for (let i = 0; i < metas.length; i++) {
        let property = metas[i].attributes.getNamedItem('property');
        if (metas[i].attributes.length > 0 && property && property.value === 'og:image') {
            images.push(metas[i].attributes.getNamedItem('content').value);
        }
    }
    return images[0];
};

const getFavicon = () => {
    let metas = document.getElementsByTagName('link');
    let favicons = [];
    for (let i = 0; i < metas.length; i++) {
        let rel = metas[i].attributes.getNamedItem('rel');
        if (metas[i].attributes.length > 0 && rel && rel.value.indexOf('icon') > -1) {
            let favicon = metas[i].attributes.getNamedItem('href').value
            if (favicon.indexOf('http') === -1) {
                favicon = location.origin + favicon
            }
            favicons.push(favicon);
        }
    }
    return favicons[0];
};

export const defaultFullScreenBehavior = (wrapper: VideoPlayerWrapper) => {
    wrapper.feedBackAction.value.textContent = ""
    wrapper.container.forEach((c) => {
        c.style.position = "fixed";
        c.style.top = "0";
        c.style.zIndex = "9990";
        c.style.left = "0";
        c.style.maxHeight = "inherit";
        c.style.height = "100vh";
    })
}
export const defaultExitFullScreenBehavior = (wrapper: VideoPlayerWrapper) => {
    wrapper.feedBackAction.value.textContent = ""
    wrapper.container.forEach((c) => {
        c.style.position = "inherit";
        c.style.top = "auto";
        c.style.zIndex = "auto";
        c.style.left = "auto";
        c.style.height = "inherit";
    })
}
function getCurrentTimeAsPercentage(player: HTMLVideoElement) {
    const percentage = ((100 * player.currentTime) / player.duration).toFixed(0).toString();
    return `${percentage}%`;
}