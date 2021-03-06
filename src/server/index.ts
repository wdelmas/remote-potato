import { MESSAGE_FROM_CLIENT, MESSAGE_TO_EXTENSION, LOCAL_PORT, MESSAGE_FROM_EXTENSION, IO_SERVER } from '../communication/constants';
import * as http from 'http';
const fs = require('fs');
const path = require('path');
import * as SocketIO from 'socket.io';
import { Debugger } from "../communication/Debugger";
import { message } from "../communication/actions";

let app = http.createServer(handler)
const io = SocketIO(app);
let hubs: string[] = []
const serverPort = DEBUG ? LOCAL_PORT : `${HEROKU_PORT}`

app.listen(serverPort, () => {
    Debugger.log('server running on: ' + IO_SERVER)
});

export const rooter = (url: string) => {
    if (url.startsWith('/?id')) url = 'index.html';
    return path.join('../clients/', url);
}

function handler(request: http.IncomingMessage, response: http.ServerResponse) {

    const filePath = rooter(request.url)
    Debugger.log(request.url + ' => ' + __dirname + filePath)

    fs.readFile(path.join(__dirname, filePath),
        function (err: Error, data: any) {
            if (err) {
                response.writeHead(500);
                return response.end('Error loading index.html');
            }
            response.writeHead(200);
            response.end(data);
        });
}

io.on('connection', (socket) => {
    Debugger.log('Connected to WS Client')
    socket.on('room', function (hubId: string) {
        Debugger.log('Server Join hub: ' + hubId)
        if (hubs.indexOf(hubId) === -1) {
            hubs.push(hubId)
        }
        socket.join(hubId);
    })

    socket.on(MESSAGE_FROM_CLIENT, function (data: message) {
        Debugger.log('--' + MESSAGE_FROM_CLIENT + '--');
        Debugger.log(data);
        Debugger.log('--' + MESSAGE_FROM_CLIENT + '--');
        socket.in(data.roomId).broadcast.emit(MESSAGE_TO_EXTENSION, data);
        // socket.broadcast.emit(MESSAGE_TO_EXTENSION, data);
    });
    socket.on(MESSAGE_FROM_EXTENSION, function (data: message) {
        Debugger.log('--' + MESSAGE_FROM_EXTENSION + '--');
        Debugger.log(data);
        Debugger.log('--' + MESSAGE_FROM_EXTENSION + '--');
        socket.in(data.roomId).broadcast.emit(MESSAGE_FROM_EXTENSION, data);
        // socket.broadcast.emit(MESSAGE_TO_EXTENSION, data);
    });
});

