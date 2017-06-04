import {
    message,
    PLAYER_PAUSE,
    PLAYER_PLAY,
    PLAYER_SEEK_BACKWARD,
    PLAYER_SEEK_FORWARD
} from '../../../communication/actions';
console.log("plop")
let player: HTMLVideoElement;

chrome.runtime.onMessage.addListener(function (request: message, sender: any, sendResponse) {
    switch (request.type) {
        case PLAYER_PLAY:
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            player = getPlayer()
            player.play()
            sendResponse({ result: 'done ' })
            break
        case PLAYER_PAUSE:
            player = getPlayer()
            player.pause()
            sendResponse({ result: 'done ' })
            break
        case PLAYER_SEEK_BACKWARD:
            player = getPlayer()
            player.currentTime -= parseInt(request.action)
            sendResponse({ result: 'done ' })
            break
        case PLAYER_SEEK_FORWARD:
            player = getPlayer()
            player.currentTime += parseInt(request.action)
            sendResponse({ result: 'done ' })
            break

    }

})


const getPlayer = () => {
    return document.getElementsByClassName('jw-video jw-reset')[0] as HTMLVideoElement
}

const eventFire = (el: any, etype: any) => {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}