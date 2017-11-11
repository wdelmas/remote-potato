import { addMessageListener } from "./modules/browser";
import { initActions } from "./modules/events";
import { Debugger } from "../../../communication/Debugger";
import { PLAYER_FOUND, message, COMMONS_MESSAGE_TYPE, HANDSHAKE, IS_CONNECTED } from "../../../communication/actions";

Debugger.log("Script Remote Injected")

addMessageListener(initActions);

let request:message = {
    from: 'extension',
    type: COMMONS_MESSAGE_TYPE,
    actionType: IS_CONNECTED
}
chrome.runtime.sendMessage(request);