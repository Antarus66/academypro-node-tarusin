var io = require('socket.io')();

io.on('connection', function (socket) {
    console.log('User is connected');
    socket.emit('news', { hello: 'world' });
});

module.exports = io;