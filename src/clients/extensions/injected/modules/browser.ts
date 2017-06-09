import { message } from "../../../../communication/actions";

export const addMessageListener = (callback: Function) => {
    chrome.runtime.onMessage.addListener(function (request: message, sender: any, sendResponse: (response: any) => void) {
        callback(request, sender, sendResponse)
    })
}


export const getCurrentDomain = (): string => {
    return location.host.split('.')[1]
}