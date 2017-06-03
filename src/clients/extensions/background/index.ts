
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs: chrome.tabs.Tab[]) => {
    const tab = tabs[0];
    injectScript(tab)
})


chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (tab) => {
        injectScript(tab)
    })

        chrome.tabs.sendMessage(tab.tabId,{action: "open_dialog_box"}, function(response) {
            console.log(response)
        }); 

})

const injectScript = (tab: chrome.tabs.Tab) => {
    if (tab.url.indexOf('http') > -1)
        chrome.tabs.executeScript(tab.id, {
            file: 'injected.js'
        })   
}

