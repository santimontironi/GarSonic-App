import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const SongList = ({ songId, coverImage, artist, title, audioFile, duration, releaseDate, btnAddPlaylist, genre, btnVisible, btnDelete }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    function handlePlay() {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-purple-900 via-purple-800 to-black text-white rounded-2xl p-5 shadow-lg w-[280px] md:w-[500px] lg:w-[600px] 2xl:w-[700px] transition transform hover:scale-[1.02] hover:shadow-purple-900/50">

            <img
                className="w-[180px] h-[140px] object-cover rounded-xl shadow-md"
                src={coverImage}
                alt={title}
            />


            <div className="flex flex-col justify-between w-full">

                <div className="flex flex-col mb-3">
                    <span className="text-lg font-bold">{title}</span>
                    <span className="text-sm text-gray-300">{artist}</span>
                </div>

                <div className="flex items-center gap-4">

                    <button
                        onClick={handlePlay}
                        className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition"
                    >
                        {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                    </button>

                    <div className="flex flex-col text-sm text-gray-300">
                        <audio src={audioFile} ref={audioRef} onEnded={() => setIsPlaying(false)} />
                        <span className="font-medium">Duración: {duration}</span>
                        <span>Lanzamiento: {new Date(releaseDate).toLocaleDateString()}</span>
                        <span>Género: {genre}</span>
                    </div>

                </div>

                {btnVisible && (
                    <div className="mt-3">
                        <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-purple-900 transition-transform transform hover:scale-105 cursor-pointer" onClick={() => btnAddPlaylist(songId)}> Agregar a playlist</button>
                    </div>
                )}

                {btnDelete && (
                    <div className="mt-3">
                        <button className="bi bi-trash float-right self-center bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition cursor-pointer"></button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SongList;