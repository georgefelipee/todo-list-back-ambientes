import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectMongoAtlas(){
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB connected");
        
        return mongoose.connection;
    } catch (error){
        console.log(error);
    }
}

export default connectMongoAtlas;