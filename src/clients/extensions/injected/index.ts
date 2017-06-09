import {
    message,
    PLAYER_PAUSE,
    PLAYER_PLAY,
    PLAYER_SEEK_BACKWARD,
    PLAYER_SEEK_FORWARD,
    HANDSHAKE
} from '../../../communication/actions';

console.log("Script Remote Injected")

let player: HTMLVideoElement;

chrome.runtime.onMessage.addListener(function (request: message, sender: any, sendResponse) {
    switch (request.type) {        
        case PLAYER_PLAY:
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            player = getPlayer()
            player.play()
            sendOkResponse(sendResponse)
            break
        case PLAYER_PAUSE:
            player = getPlayer()
            player.pause()
            sendOkResponse(sendResponse)
            break
        case PLAYER_SEEK_BACKWARD:
            player = getPlayer()
            player.currentTime -= parseInt(request.action)
            sendOkResponse(sendResponse)
            break
        case PLAYER_SEEK_FORWARD:
            player = getPlayer()
            player.currentTime += parseInt(request.action)
            sendOkResponse(sendResponse)
            break
    }

})


const sendOkResponse = (sendResponse: any) => {
    sendResponse({ result: 'done ' })
}

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


 