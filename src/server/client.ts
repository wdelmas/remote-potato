import * as SocketIOClient from 'socket.io-client'

var socket = SocketIOClient.connect('http://localhost:3002');
socket.on('news', function (data: any) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
