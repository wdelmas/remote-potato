import { getCurrentTab, onUpdateTabsListener } from "./modules/browser";
import { initSockets } from "./modules/sockets";


const injectScript = (tab: chrome.tabs.Tab): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (tab.url.indexOf('http') > -1)
            chrome.tabs.executeScript(tab.id, { file: 'injected.js' },
                (result: any[]) => {
                    if (result.length > 0) {
                        console.log('Script injected tab: ' + tab.id)
                        return resolve(true)
                    }
                    return reject(false)
                })
    })
}

onUpdateTabsListener(injectScript)
initSockets()