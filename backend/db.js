import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set('bufferCommands', false);

export const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Successfully connection to database.")
    }
    catch(error){
        console.log("Error in database connection: ",error.message)
    }
}