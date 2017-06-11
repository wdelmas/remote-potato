import { addMessageListener } from "./modules/browser";
import { initActions } from "./modules/events";

console.log("Script Remote Injected")

addMessageListener(initActions)
