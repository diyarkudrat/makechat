module.exports = (io, socket) => {

    // New User Listener
    socket.on('new user', (username) => {
        console.log(`${username} has joined the chat!`);
        io.emit("new user", username);
    })
}