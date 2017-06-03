import * as http from 'http'
const fs = require('fs');
import * as SocketIO from 'socket.io'


const PORT = 3002


let app = http.createServer(handler)
const io = SocketIO(app);

app.listen(PORT, () => {
    console.log('server running on: ' + PORT)
});
function handler(request: http.IncomingMessage, response: http.ServerResponse) {
    fs.readFile(__dirname + '/index.html',
        function (err: Error, data: any) {
            console.log(data)
            if (err) {
                response.writeHead(500);
                return response.end('Error loading index.html');
            }
            response.writeHead(200);
            response.end(data);
        });
}

io.on('connection', function (socket) {
    console.log('Connected to WS Client')
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data: any) {
        console.log(data);
    });
});