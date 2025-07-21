import mongoose from "mongoose";

export const connect = async () => {
    try{
        await mongoose.connect("mongodb://localhost/garsonic")
        console.log("Successfully connection to database.")
    }
    catch(error){
        console.log("Error in database connection: ",error)
    }
}