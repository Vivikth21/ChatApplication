import User from "../models/user.js";

export const getAllUsers = async(req,res)=>{
    try {

        const currentUser = req.user._id;
        const allUsers = await User.find({_id: {$ne: currentUser}}).select("-password");

        res.status(200).json(allUsers);

    } catch (error) {
        console.log("Error in fetching users: ",error);
        res.status(500).json({error: "Internal server error"});
    }
}