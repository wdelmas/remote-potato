import * as SocketIOClient from 'socket.io-client'

const socket = SocketIOClient.connect('http://localhost:3002');


chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs: chrome.tabs.Tab[]) => {
    const tab = tabs[0];
    injectScript(tab)
})

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


socket.on('news', function (data: any) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
