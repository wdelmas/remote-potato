import { message, PLAYER_PAUSE, PLAYER_PLAY, PLAYER_SEEK_FORWARD } from '../../../communication/actions';
console.log("plop")
let player: HTMLMediaElement;

chrome.runtime.onMessage.addListener(function (request: message, sender: any, sendResponse) {
    switch (request.type) {
        case PLAYER_PLAY:
            console.log('firePlayer')
            const cover = document.getElementsByClassName('cover')[0]
            if (cover)
                eventFire(cover, 'click');
            setTimeout(() => {
                player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLMediaElement
                player.play()
            }, 1000)
            sendResponse({ result: 'done ' })
            break
        case PLAYER_PAUSE:
            console.log('firePlayer')
            player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLMediaElement
            player.pause()
            sendResponse({ result: 'done ' })
            break
        case PLAYER_SEEK_FORWARD:
            console.log('PLAYER_SEEK_FORWARD')
            player = document.getElementsByClassName('jw-video jw-reset')[0] as HTMLMediaElement
            player.currentTime += parseInt(request.action)
            sendResponse({ result: 'done ' })
            break

    }

})

function eventFire(el: any, etype: any) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}