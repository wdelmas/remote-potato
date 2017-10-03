import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SocketIOClient from 'socket.io-client';

import { Remote } from "./remote";
import { Debugger } from "../../communication/Debugger";
import { IO_SERVER, MESSAGE_FROM_EXTENSION } from "../../communication/constants";
import { message } from "../../communication/actions";



 const getRoomId = () => {
    const url = new URL(location.href);
    return url.searchParams.get("id");
}
const ROOM_ID = getRoomId()

var socket = SocketIOClient.connect(IO_SERVER);
socket.on('connect', () => {
    Debugger.log('Connected to WS Server: ' + IO_SERVER)
    socket.emit('room', ROOM_ID);
})

socket.on(MESSAGE_FROM_EXTENSION, function (data: message) {
    switch (data.type) {
        case 'PLAYER_VOLUME_UP':
        case 'PLAYER_VOLUME_DOWN':
            break
    }
});

export const BASE_MESSAGE = {
    extensionId: ROOM_ID,
    from: 'webapp'
}

removeDoubleTapZoom('button');

function removeDoubleTapZoom(tagName: string) {
    let tags = document.getElementsByTagName(tagName)
    for (let i = tags.length; i--;) {
        tags[i].addEventListener('touchstart', preventZoom)
    }
}

function preventZoom(e: any) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

    e.preventDefault();
    e.target.click();
}

ReactDOM.render(
    <Remote socket={socket} />,
    document.getElementById("app")
);