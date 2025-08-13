import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    duration: { 
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default mongoose.model("Song", songSchema);