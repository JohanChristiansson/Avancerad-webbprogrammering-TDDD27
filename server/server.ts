import { Socket } from "socket.io";

const io = require("socket.io")(5000, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket: Socket) => {
    console.log("A user has connected")
    socket.on("message", (message, roomName)=> {
        if (roomName.length){
            console.log("borde skicka privat meddelande här")
            io.to(roomName).emit("message", message + "private msg")
        } else{
            io.emit("message", "There was en error with the chatroom")
        }
    })
    socket.on("disconnect", () =>{
        console.log("User disconnected")
    })
    socket.on("joinRoom", (roomName) => {
        console.log("joining room: " + roomName)
        socket.join(roomName)
    })
})

console.log("hello")