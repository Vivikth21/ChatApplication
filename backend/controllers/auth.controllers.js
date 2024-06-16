import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req,res)=>{
    const {username,password} = req.body;
    const user= await User.findOne({username});
    
    if(user){
        res.status(403).json({message: 'Admin already exists'});
    }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(password,salt);

        const obj = {username: username,password: hashedPw};
        const newUser = new User(obj);
        newUser.save();

        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn: '1h'});
        res.json({message:'User successfully created',token});
    }
    // res.json({username,password});
}

export const login = async (req,res)=>{
    const {username,password} = req.headers;
    const findUser = await User.findOne({username});
    const id = findUser._id;
    if(!findUser){
        return res.status(403).json({message: "User does not exist"});
    }
    const match = await bcrypt.compare(password,findUser.password);
    if(!match){
        return res.status(403).json({message:"Invalid user credentials"})
    }
    const token =  jwt.sign({username},process.env.JWT_SECRET,{expiresIn: '1h'});
    res.status(200).json({message:'Login successful',token,id});

}
