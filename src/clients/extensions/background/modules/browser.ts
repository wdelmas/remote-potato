import { Debugger } from "../../../../communication/Debugger";
import { PLAYER_ENTER_FULLSCREEN, PLAYER_EXIT_FULLSCREEN, message, POPUP_OPENED, WEB_APP_URL, PLAYER_FOUND, COMMONS_MESSAGE_TYPE, HANDSHAKE, IS_CONNECTED } from "../../../../communication/actions";
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

export const removeCurrentTab = (cb: Function) => {
    getCurrentTab().then((tab) => {
        chrome.tabs.remove(tab.id, cb())
    })
}
export const refreshCurrentTab = (cb: Function) => {
    getCurrentTab().then((tab) => {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, { code: code });
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
            if (tab) {
                chrome.tabs.sendMessage(tab.id, data, function (response: message) {
                    if (response && response.roomId) {
                        getSocketBackground().emit(MESSAGE_FROM_EXTENSION, response);
                    }
                    else
                        Debugger.log('Answer from InjectedJS')
                });
            }
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
        switch (message.actionType) {
            case IS_CONNECTED:
                if (getSocketBackground().connected) {
                    sendHandshakeToContenScript();
                }
                return;
            case PLAYER_ENTER_FULLSCREEN:
                enterFullScreenWindow(chrome.windows.WINDOW_ID_CURRENT);
                return;
            case PLAYER_EXIT_FULLSCREEN:
                exitFullScreenWindow(chrome.windows.WINDOW_ID_CURRENT);
                return;
            case POPUP_OPENED:
                chrome.runtime.sendMessage({
                    type: COMMONS_MESSAGE_TYPE,
                    actionType: WEB_APP_URL,
                    action: webAppUrl
                } as message);
                return;
        }
        if (message && message.roomId) {
            return getSocketBackground().emit(MESSAGE_FROM_EXTENSION, message);
        }
    })
}

export const onUpdatedListener = () => {
    chrome.tabs.onUpdated.addListener(
        (tabId, changeInfo, tab) => {
            if (getSocketBackground().connected) {
                sendHandshakeToContenScript();
            }
        }
    );
}

export const onInstalledListener = () => {
    chrome.runtime.onInstalled.addListener(details => {
        switch (details.reason) {
            case 'install':
                onInstalled();
                break;
            case 'update':
                onUpdate();
                break;
            default:
                break;

        }
    });
}

const onInstalled = () => {
    let url = chrome.extension.getURL('on-install.html');

    chrome.tabs.create({url}, tab =>  {
        Debugger.log(`New tab launched with local file ${url}`); 
    });
}

const onUpdate = () => {
    // Show update notif with link to changelog
}

function sendHandshakeToContenScript() {
    let data: message = {
        from: 'background',
        type: COMMONS_MESSAGE_TYPE,
        actionType: HANDSHAKE,
        roomId: getRoomId()
    };
    sendMessageToCurrentTab(data);
}
