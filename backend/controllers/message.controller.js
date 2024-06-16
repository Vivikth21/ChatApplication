import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        // console.log(message);
        // console.log(receiverId);
        // console.log(senderId);

        let conversation = await Conversation.findOne({
            participants:{$all: [senderId,receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage);

    }catch(error){
        console.log("Error in sending message: ",error.message)
        res.status(500).json({error: "internal server error"});
    }
}

export const getMessage = async(req,res)=>{
    try {
        const {id:otherId} = req.params;
        const senderId = req.user._id;
        // console.log("This is",otherId);
        // console.log("That is",senderId);

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId,otherId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in sending message: ",error.message)
        res.status(500).json({error: "internal server error"});
    }
}