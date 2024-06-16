import mongoose from "mongoose";

const connectToDb = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI,{dbName:"ChatApp"});
    console.log("Connected to MongoDb")
}

export default connectToDb;