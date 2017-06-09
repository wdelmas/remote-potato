import { MESSAGE_FROM_CLIENT, MESSAGE_TO_EXTENSION, PORT } from '../communication/constants';
import * as http from 'http';
const fs = require('fs');
import * as SocketIO from 'socket.io';

let app = http.createServer(handler)
const io = SocketIO(app);

app.listen(PORT, () => {
    console.log('server running on: ' + PORT)
});

function handler(request: http.IncomingMessage, response: http.ServerResponse) {
    const filePath = request.url === '/client.js' ? '/../clients/index.js' : '../clients/index.html'
    console.log(__dirname + filePath)
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
    console.log('Connected to WS Client')
    socket.on(MESSAGE_FROM_CLIENT, function (data: any) {
        console.log(data);
        socket.broadcast.emit(MESSAGE_TO_EXTENSION, data);
    });
});
