"use strict";
/// <reference path="typings/tsd.d.ts" />
/// <reference path="typings/socket.io/socket.io.d.ts" />
var SocketIO = require('socket.io');
//using SocketIO
var port = 8080;
var events = {
    connection: 'connection',
    message: 'message',
    join: 'join',
    joined: 'joined'
};
var io = SocketIO({ origins: '*:*' });
io.listen(port);
console.log("Listening on port", port);
io.on(events.connection, function (socket) { return acceptConnection(socket); });
function acceptConnection(socket) {
    console.log('Client Connected', socket.id);
    socket.on(events.join, function (room) {
        socket.join(room);
        socket.emit(events.joined, room, socket.id);
        io.in(room).emit(events.joined, room, socket.id);
        console.log('Joined Room', room, socket.id);
    });
    socket.on(events.message, function (room, message) {
        io.in(room).emit(events.message, room, message, socket.id);
        console.log('Message', "RooM:" + room, message, socket.id);
    });
}
