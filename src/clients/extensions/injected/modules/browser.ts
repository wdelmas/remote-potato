import { message, PLAYER_EXIT_FULLSCREEN, HANDSHAKE } from "../../../../communication/actions";
import { initActions } from "./events";
import { sendOkResponse } from "./messaging";
const noop = () => { }

export const addMessageListener = (callback: any) => {
    chrome.runtime.onMessage.addListener(function (request: message, sender: any, sendResponse: (response: any) => void) {
        callback(request, sender)
            .then((result: message) => {
                if (result) {
                    chrome.runtime.sendMessage( result);
                }
            })
        return true
    })
}

export const getCurrentDomain = (): string => {
    const host = location.host.split('.')
    if (host.length > 0)
        return host[host.length - 2]
    return null
}

export const addKeyboardListeners = () => {
    const ESC_KEY = 27;
    document.onkeydown = function (evt) {
        switch (evt.keyCode) {
            case ESC_KEY:
                initActions({
                    from: 'webapp',
                    type: PLAYER_EXIT_FULLSCREEN
                }, null);
                break;
        }
    };
};