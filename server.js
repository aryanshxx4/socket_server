const io = require("socket.io")(3000, {
    cors: { origin: "*" }
});

let connectedUsers = 0; // Count of connected users

io.on("connection", (socket) => {
    connectedUsers++; // Increment count
    io.emit("userCount", connectedUsers); // Send updated count to all users

    console.log(`✅ User connected: ${socket.id} | Total Users: ${connectedUsers}`);

     socket.on("chatMessage", (data) => {
        console.log(data)
        io.emit("chatMessage", {
            "username" : data.username,
            "message": data.message
        });
    });
    socket.on("disconnect", () => {
        connectedUsers--; // Decrement count
        io.emit("userCount", connectedUsers); // Send updated count to all users
        console.log(`❌ User disconnected: ${socket.id} | Total Users: ${connectedUsers}`);
    });
});
