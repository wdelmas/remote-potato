import { Debugger } from "../../../../communication/Debugger";
import { PLAYER_ENTER_FULLSCREEN, message } from "../../../../communication/actions";


export const getCurrentTab = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true }, (tabs: chrome.tabs.Tab[]) => {
            return resolve(tabs[0]);
        })
    })
}

export const onUpdateTabsListener = (callback: Function) => {
    chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
        if (changeInfo.status === 'complete')
            return callback(tab)
    })
}

export const sendMessageToCurrentTab = (data: any) => {
    return getCurrentTab()
        .then((tab: chrome.tabs.Tab) => {
            Debugger.log(data)
            chrome.tabs.sendMessage(tab.id, data, function (response) {
                Debugger.log(response)
            });
        })
}

const enterFullScreenWindow = (windowId: number) => {
    chrome.windows.update(windowId, { state: "fullscreen" });
}

export const initMessageEventListener = () => {
    chrome.runtime.onMessage.addListener((message: message) => {
        if (message.type === PLAYER_ENTER_FULLSCREEN) {
            chrome.tabs.query({ active: true }, (tabs) => {
                const windowId = tabs[0].windowId;
                enterFullScreenWindow(windowId)
            }
            )
        }
    })
}