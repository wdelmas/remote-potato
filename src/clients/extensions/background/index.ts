import { HOST, MESSAGE_TO_EXTENSION, PORT } from '../../../communication/constants';
import * as SocketIOClient from 'socket.io-client';
const socket = SocketIOClient.connect(`http://${HOST}:${PORT}`);

export const getCurrentTab = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs: chrome.tabs.Tab[]) => {
            return resolve(tabs[0]);
        })
    })
}

export const onUpdateTabsListener = () => {
    chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
        if (changeInfo.status === 'complete')
            return injectScript(tab)
                .then((isInjected) => {
                    if (isInjected)
                        chrome.tabs.sendMessage(tabId, { action: "player_play" }, function (response) {
                            console.log(response)
                        });
                })
    })
}

const injectScript = (tab: chrome.tabs.Tab): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (tab.url.indexOf('http') > -1)
            chrome.tabs.executeScript(tab.id, { file: 'injected.js' },
                (result: any[]) => {
                    if (result.length > 0) {
                        return resolve(true)
                    }
                    return reject(false)
                })
    })
}

export const sendMessageToCurrentTab = (data: any) => {
    return getCurrentTab()
        .then((tab: chrome.tabs.Tab) => {
            console.log(tab)
            chrome.tabs.sendMessage(tab.id, data, function (response) {
                console.log(response)
            });
        })
}

socket.on(MESSAGE_TO_EXTENSION, function (data: any) {
    console.log(data)
    return sendMessageToCurrentTab(data)
});


onUpdateTabsListener()