import { addMessageListener } from "./modules/browser";
import { initActions } from "./modules/events";

console.log("Script Remote Injected")


const actions = initActions
addMessageListener(initActions)






// const l = require("./modules/browser")
// const t = require("./modules/events")
// console.log(l.addMessageListener)
// console.log(t.initActions)

// document.getElementsByName('iframe').forEach((frame: HTMLIFrameElement) => {
//     var t = new HTMLScriptElement()
//     t.innerHTML = '<script>alert(1)</script>'
//     debugger
//     frame.appendChild<HTMLScriptElement>(t)
// })