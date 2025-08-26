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
    genre: {
        type: String,
        required: true
    },
    audioFile: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    duration : {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Song", songSchema);