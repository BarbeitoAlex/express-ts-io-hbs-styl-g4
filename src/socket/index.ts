const setSockets = (io: SocketIO.Server | undefined): SocketIO.Server | undefined => {

  if (io == undefined) return undefined;

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
}

export default setSockets;