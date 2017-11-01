import { message, PLAYER_EXIT_FULLSCREEN, HANDSHAKE, PLAYER_ACTIONS_MESSAGE_TYPE } from "../../../../communication/actions";
const noop = () => { }

export const addMessageListener = () => {
    chrome.runtime.onMessage.addListener(function (request: message, sender: any, sendResponse: (response: any) => void) {
        if (request.actionType === HANDSHAKE) {
            showControlDiv();
        }
        return true
    })
}

const showControlDiv = () => {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('connected');
}