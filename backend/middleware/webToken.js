import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateJwt = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,async (err,decoded)=>{
            if (err) {
                return res.sendStatus(403); // Add return to prevent further execution
            }

            if (!decoded || !decoded.username) {
                return res.sendStatus(403); // Ensure decoded token is valid and has username
            }
            const username = decoded.username;
            const user = await User.findOne({username});
            req.user = user;
            next()
        })
    }else{
        res.sendStatus(401);
    }
}
export default authenticateJwt;
