//chat.js
module.exports = (io, socket, onlineUsers, channels) => {
  socket.on('new user', (username) => {
    onlineUsers[username] = socket.id;
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  });

  //Listen for new messages
  socket.on('new message', (data) => {
    // Send that data back to ALL clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
    io.emit('new message', data);
  });

  socket.on('get online users', () => {
    socket.emit('get online users', onlineUsers);
  });

  socket.on('disconnect', () => {
    delete onlineUsers[socket.username]
    io.emit(`${socket.username} has left`, onlineUsers);
  });

  socket.on('new channel', (newChannel) => {
    channels[newChannel] = [];
    socket.join(newChannel);
    io.emit('new channel', newChannel);
    socket.emit('user changed channel', {
      channel : newChannel,
      messages: channels[newChannel]
    });
  });
};