
import { initSockets } from "./modules/sockets";

initSockets()

chrome.runtime.onMessage.addListener(function request(request) {
    if (request.name == "requestFullScreen") {
        chrome.tabs.query({active: true}, function (tabs) {
                let windowId = tabs[0].windowId;
                chrome.windows.update(windowId, { state: "fullscreen" });
            }
        );
    }
});