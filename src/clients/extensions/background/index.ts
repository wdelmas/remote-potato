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

chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    console.log(changeInfo)
    injectScript(tab)
    if (changeInfo.status === 'complete')
        chrome.tabs.sendMessage(tabId, { action: "player_play" }, function (response) {
            console.log(response)
        });
})

chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (tab) => {
        console.log('Inject code to Tab')
        injectScript(tab)
    })
})

const injectScript = (tab: chrome.tabs.Tab) => {
    if (tab.url.indexOf('http') > -1)
        chrome.tabs.executeScript(tab.id, {
            file: 'injected.js'
        })
}


socket.on(MESSAGE_TO_EXTENSION, function (data: any) {
    console.log(data)
    getCurrentTab()
        .then((tab: chrome.tabs.Tab) => {
            console.log(tab)
            chrome.tabs.sendMessage(tab.id, data, function (response) {
                console.log(response)
            });
        })
});

    // socket.emit('my other event', { my: 'data' });