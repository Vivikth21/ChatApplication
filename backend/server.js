import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from  './routes/user.routes.js';
import connectToDb from './db/connect.js';
import cors from 'cors';
import { app, server } from './socket/socket.js';


app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 3001;

app.get('/',(req,res)=>{
    res.send('Hello World!!')
})

app.use('/user',authRoutes);
app.use('/message',messageRoutes);
app.use('/allUsers',userRoutes);

server.listen(PORT,() => {
    connectToDb();
    console.log(`App listening on port ${PORT}`)
});