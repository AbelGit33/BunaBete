const Game = require('../models/Game');

exports.handleSocketConnection = (io, socket) => {
  console.log(`User ${socket.userId} connected`);

  socket.on('join-game', (gameId) => {
    socket.join(`game-${gameId}`);
    console.log(`User ${socket.userId} joined game ${gameId}`);
  });

  socket.on('leave-game', (gameId) => {
    socket.leave(`game-${gameId}`);
  });

  socket.on('place-bet-live', async (data) => {
    io.to(`game-${data.gameId}`).emit('bet-placed', {
      userId: socket.userId,
      gameId: data.gameId,
      amount: data.amount
    });
  });

  socket.on('game-update', async (data) => {
    await Game.findByIdAndUpdate(data.gameId, {
      'liveData.score': data.score,
      'liveData.time': data.time,
      'liveData.status': data.status
    });
    io.to(`game-${data.gameId}`).emit('game-updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.userId} disconnected`);
  });
};
