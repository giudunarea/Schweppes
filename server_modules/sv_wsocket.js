let socket_server;

function init(server){
  const socket_io = require('socket.io')
  socket_server = new socket_io.Server(server)
}

function get(){
  return socket_server;
}

module.exports = {init , get}
