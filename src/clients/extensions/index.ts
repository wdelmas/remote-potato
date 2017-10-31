import { Debugger } from "../../communication/Debugger";
import { IO_SERVER } from "../../communication/constants";
import { POPUP_OPENED, message, WEB_APP_URL, COMMONS_MESSAGE_TYPE } from "../../communication/actions";
const QRious = require('qrious');

const sendEventPopUpOpened = () => {
    console.log('POPUP_OPENED')
    const message = {
        from: 'extension',
        type: COMMONS_MESSAGE_TYPE,
        actionType: POPUP_OPENED
    } as message
    chrome.runtime.sendMessage(message);
}

const initMessageEventListener = () => {
    chrome.runtime.onMessage.addListener((message: message) => {
        switch (message.actionType) {
            case WEB_APP_URL:
                const qr = new QRious({
                    value: message.action,
                    element: document.getElementById('qrcode'),
                    background: 'WhiteSmoke',
                    foreground: 'Teal',
                    size: 175
                });
                document.getElementById('qrcode').appendChild(qr.image)

                const displayWebApplink = () => {
                    var a = document.createElement('a');
                    var linkText = document.createTextNode("webAppUrl");
                    a.appendChild(linkText);
                    a.title = message.action;
                    a.href = message.action;
                    document.body.appendChild(a)
                }

                if (DEBUG)
                    displayWebApplink()
                break

        }
    })
}


sendEventPopUpOpened()
initMessageEventListener()

