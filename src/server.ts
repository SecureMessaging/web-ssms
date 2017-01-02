import * as SocketIO from 'socket.io';
//using SocketIO
const port = 8080;
const events = {
    connection : 'connection',
    message : 'message',
    join : 'join',
    joined: 'joined',
    whatsMyIp: 'whats-my-ip'
};
const io: SocketIO.Server = SocketIO({ origins: '*:*'});
io.listen(port);
console.log("Listening on port", port);

io.on(events.connection, (socket: SocketIO.Socket)  => acceptConnection(socket));

function acceptConnection(socket: SocketIO.Socket){
    console.log('Client Connected', socket.id);
    socket.on(events.join, room => {
        socket.join(room);
        socket.emit(events.joined, room, socket.id);
        io.in(room).emit(events.joined, room, socket.id);
        console.log('Joined Room', room, socket.id);
    });

    socket.on(events.message, (room: string, message:any) => {
        io.in(room).emit(events.message, room, message, socket.id);
        console.log('Message', "Room:"+ room, message, socket.id);
    });

    // Return client's ip address
    socket.on(events.whatsMyIp, function () {
        socket.emit(events.whatsMyIp, socket.handshake.address);
    });
}
