import User from "../models/user.js";

export const validateMe = async(req,res)=>{
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    // console.log("The id of this user is: ",user._id);
    res.json({
        username: user.username,
        id: user._id
    })
}