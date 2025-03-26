const io = require("socket.io")(3000, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("chatMessage", (data) => {
        console.log(data)
        io.emit("chatMessage", {
            "username" : data.username,
            "message": data.message
        });
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});
