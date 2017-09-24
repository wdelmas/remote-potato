import { message, PLAYER_EXIT_FULLSCREEN } from "../../../../communication/actions";
import { initActions } from "./events";
const noop = () => {}

export const addMessageListener = (callback: Function) => {
    chrome.runtime.onMessage.addListener(function (request: message, sender: any, sendResponse: (response: any) => void) {
        callback(request, sender, sendResponse)
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
    document.onkeydown = function(evt) {
        switch (evt.keyCode) {
            case ESC_KEY:
                initActions({
                    type: PLAYER_EXIT_FULLSCREEN
                }, null, noop);
                break;
        }
    };
};