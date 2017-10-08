import { addMessageListener, addKeyboardListeners } from "./modules/browser";
import { initActions } from "./modules/events";
import { Debugger } from "../../../communication/Debugger";
import { PLAYER_FOUND, message } from "../../../communication/actions";

Debugger.log("Script Remote Injected")

addMessageListener(initActions)
addKeyboardListeners();