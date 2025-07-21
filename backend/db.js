import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connect = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Successfully connection to database.")
    }
    catch(error){
        console.log("Error in database connection: ",error)
    }
}