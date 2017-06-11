import { addMessageListener } from "./modules/browser";
import { initActions } from "./modules/events";
import { Debugger } from "../../../communication/Debugger";

Debugger.log("Script Remote Injected")

addMessageListener(initActions)
