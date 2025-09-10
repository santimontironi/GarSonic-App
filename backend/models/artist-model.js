import mongoose from "mongoose";

const artistModel = new mongoose.Schema({
    profilePhoto:{
        type: String
    },
    artistName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: { type: String }
    
})

export default mongoose.model("Artist", artistModel);