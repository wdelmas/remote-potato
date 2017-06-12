import { Debugger } from "../../communication/Debugger";
import { IO_SERVER } from "../../communication/constants";
const QRious = require('qrious');


const qr = new QRious({
    value: IO_SERVER,
    element: document.getElementById('qrcode'),
    background: 'white',
    padding: 25,
    size: 200
});
document.getElementById('qrcode').appendChild(qr.image)
