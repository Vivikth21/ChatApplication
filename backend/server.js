import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from  './routes/user.routes.js';
import connectToDb from './db/connect.js';
import cors from 'cors';
import { app, server } from './socket/socket.js';
import path from 'path';


app.use(cors());
app.use(express.json());
dotenv.config();


const __dirname = path.resolve();
const PORT = process.env.PORT || 3001;

app.use('/user',authRoutes);
app.use('/message',messageRoutes);
app.use('/allUsers',userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT,() => {
    connectToDb();
    console.log(`App listening on port ${PORT}`)
});