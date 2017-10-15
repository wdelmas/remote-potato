import { Debugger } from "../../../../communication/Debugger";
import { PLAYER_ENTER_FULLSCREEN, PLAYER_EXIT_FULLSCREEN, message, POPUP_OPENED, WEB_APP_URL, PLAYER_FOUND, COMMONS_MESSAGE_TYPE } from "../../../../communication/actions";
import { IO_SERVER, MESSAGE_FROM_EXTENSION } from "../../../../communication/constants";
import { uuid } from "../../../../communication/helpers";
import { getSocketBackground } from "./sockets";

const extensionId = chrome.runtime.id;

const getRoomId = () => {
    if (window.localStorage['roomId'])
        return window.localStorage['roomId']

    const roomId = `${extensionId}-${DEBUG ? '958ea70e-6c71-3f49-8c63-7b5f80c7faa1' : uuid()}`
    window.localStorage['roomId'] = roomId
    return roomId
}

export const roomId = getRoomId()


export const webAppUrl = `${IO_SERVER}?id=${roomId}`;

export const getCurrentTab = (): Promise<chrome.tabs.Tab> => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs: chrome.tabs.Tab[]) => {
            return resolve(tabs[0]);
        })
    })
};
export const openNewTab = (url: string, cb: Function) => {
    chrome.tabs.create({
        active: true,
        url
    }, cb())
}

export const removeCurrentTab = (url: string, cb: Function) => {
    getCurrentTab().then((tab) => {
        chrome.tabs.remove(tab.id, cb())
    })
}
export const refreshCurrentTab = (url: string, cb: Function) => {
    getCurrentTab().then((tab) => {
        chrome.tabs.update(tab.id,{
            url :tab.url
        }, cb())
    })
}
export const onUpdateTabsListener = (callback: Function) => {
    chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
        if (changeInfo.status === 'complete')
            return callback(tab)
    })
};

export const sendMessageToCurrentTab = (data: any) => {
    return getCurrentTab()
        .then((tab: chrome.tabs.Tab) => {
            Debugger.log(data)
            chrome.tabs.sendMessage(tab.id, data, function (response: message) {
                if (response && response.roomId) {
                    getSocketBackground().emit(MESSAGE_FROM_EXTENSION, response);
                }
                else
                    Debugger.log('Answer from InjectedJS')
            });
        })
};

const enterFullScreenWindow = (windowId: number) => {
    chrome.windows.update(windowId, { state: "fullscreen" });
};

const exitFullScreenWindow = (windowId: number) => {
    chrome.windows.update(windowId, { state: "normal" });
};

export const initMessageEventListener = () => {
    chrome.runtime.onMessage.addListener((message: message) => {

        if (message && message.roomId) {
            return getSocketBackground().emit(MESSAGE_FROM_EXTENSION, message);
        }
        switch (message.actionType) {
            case PLAYER_ENTER_FULLSCREEN:
                enterFullScreenWindow(chrome.windows.WINDOW_ID_CURRENT);
                break;
            case PLAYER_EXIT_FULLSCREEN:
                exitFullScreenWindow(chrome.windows.WINDOW_ID_CURRENT);
                break;
            case POPUP_OPENED:
                chrome.runtime.sendMessage({
                    type : COMMONS_MESSAGE_TYPE,
                    actionType: WEB_APP_URL,
                    action: webAppUrl
                } as message);
                break
        }
    })
}