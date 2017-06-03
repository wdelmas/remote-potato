
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs: chrome.tabs.Tab[]) => {
    const tab = tabs[0];
    injectScript(tab)
})
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    console.log(changeInfo)
    if (changeInfo.status === 'complete')
        console.log('TAB UPDATED')
})

chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (tab) => {
        console.log('Inject code to Tab')
        injectScript(tab)
    })

    setTimeout(() => {
        chrome.tabs.sendMessage(tab.tabId, { action: "player_play" }, function (response) {
            console.log(response)
        });
    }, 3000)

})

const injectScript = (tab: chrome.tabs.Tab) => {
    if (tab.url.indexOf('http') > -1)
        chrome.tabs.executeScript(tab.id, {
            file: 'injected.js'
        })
}

