import { MESSAGE_FROM_CLIENT, MESSAGE_TO_EXTENSION, PORT, HOST } from '../communication/constants';
import * as http from 'http';
const fs = require('fs');
import * as SocketIO from 'socket.io';
import { Debugger } from "../communication/Debugger";

let app = http.createServer(handler)
const io = SocketIO(app);

app.listen(PORT, () => {
    Debugger.log('server running on: ' + HOST + ':' + PORT)
});

export const rooter = (url: string) => {
    switch (url) {
        case '/client.js':
            return '/../clients/index.js';
        case '/styles.css':
            return '/../clients/dist/styles/font-awesome.min.css';
        default:
            return '/../clients/index.html';
    }
}

function handler(request: http.IncomingMessage, response: http.ServerResponse) {

    const filePath = rooter(request.url)
    Debugger.log(request.url + ' => ' + __dirname + filePath)

    fs.readFile(__dirname + filePath,
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
    socket.on(MESSAGE_FROM_CLIENT, function (data: any) {
        Debugger.log(data);
        socket.broadcast.emit(MESSAGE_TO_EXTENSION, data);
    });
});
