import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = ["https://chatapplication-8eox.onrender.com"];
const corsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true // If your requests include credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions))

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: allowedOrigins,
        // origin: ["http://localhost:5173","https://chatapplication-8eox.onrender.com"],
        methods: ["GET","POST"],
        credentials:true

    }
})
// app.use(cors());

export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on('connection',(socket)=>{
    console.log("A user connected ",socket.id)
    const userId = socket.handshake.query.userId;
    if(userId!=undefined) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export {app,io,server};