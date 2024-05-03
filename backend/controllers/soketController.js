const http = require('http');
const socketIO = require('socket.io');



const soket = async (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('a user connected');
  
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  
      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
    });
  }

  module.exports = {soket}