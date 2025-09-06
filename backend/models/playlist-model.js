import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    playlistName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    coverImage: {
        type: String,
        required: true
    },
    owner: { // Usuario que creó la playlist
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    songs: [{ // Array de canciones
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }],
    active:{
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Playlist", playlistSchema);
