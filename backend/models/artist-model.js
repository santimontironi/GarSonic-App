import mongoose from "mongoose";

const artistModel = new mongoose.Schema({
    name: {
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
    bio: {
        type: String,
        required: true
    }
})

export default mongoose.model("Artist", artistModel);