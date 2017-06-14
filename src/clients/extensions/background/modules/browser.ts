import { Debugger } from "../../../../communication/Debugger";
import { PLAYER_ENTER_FULLSCREEN, message, POPUP_OPENED, WEB_APP_URL } from "../../../../communication/actions";
import { IO_SERVER } from "../../../../communication/constants";
import { uuid } from "../../../../communication/helpers";

const extensionId = chrome.runtime.id

export const roomId = `${extensionId}-${debug ? '958ea70e-6c71-3f49-8c63-7b5f80c7faa1' : uuid()}`
export const webAppUrl = `${IO_SERVER}?id=${roomId}`

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
        switch (message.type) {
            case PLAYER_ENTER_FULLSCREEN:
                chrome.tabs.query({ active: true }, (tabs) => {
                    const windowId = tabs[0].windowId;
                    enterFullScreenWindow(windowId)
                })
                break
            case POPUP_OPENED:
                chrome.runtime.sendMessage({
                    type: WEB_APP_URL,
                    action: webAppUrl
                } as message);
                break

        }
    })
}