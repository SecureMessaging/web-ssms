"use strict";
const SocketIO = require("socket.io");
//using SocketIO
const port = 8080;
const events = {
    connection: 'connection',
    message: 'message',
    join: 'join',
    joined: 'joined',
    whatsMyIp: 'whats-my-ip'
};
const io = SocketIO({ origins: '*:*' });
io.listen(port);
console.log("Listening on port", port);
io.on(events.connection, (socket) => acceptConnection(socket));
function acceptConnection(socket) {
    console.log('Client Connected', socket.id);
    socket.on(events.join, room => {
        socket.join(room);
        socket.emit(events.joined, room, socket.id);
        io.in(room).emit(events.joined, room, socket.id);
        console.log('Joined Room', room, socket.id);
    });
    socket.on(events.message, (room, message) => {
        io.in(room).emit(events.message, room, message, socket.id);
        console.log('Message', "Room:" + room, message, socket.id);
    });
    // Return client's ip address
    socket.on(events.whatsMyIp, function () {
        socket.emit(events.whatsMyIp, socket.handshake.address);
    });
}
//# sourceMappingURL=server.js.map