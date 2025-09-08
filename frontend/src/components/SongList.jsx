import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import { UseContextArtist } from "../context/UseContextArtist";

const SongList = ({ coverImage, artist, title, audioFile, duration, releaseDate }) => {

    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    function handlePlay() {
        if (audioRef.current.paused) {
            audioRef.current.play()
            setIsPlaying(true)
        } else {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-[15px] bg-white rounded-2xl p-[15px] shadow-[4px_4px_10px_rgba(0,0,0,0.5)] w-[300px] md:w-[500px] lg:w-[600px] 2xl:w-[700px]">

            <img src={coverImage} alt={title} />

            <div>

                <div>
                    <span>{title}</span>
                    <span>{artist}</span>
                </div>

                <div>

                    <button onClick={handlePlay}>
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <div>
                        <audio src={audioFile} ref={audioRef} onEnded={() => setIsPlaying(false)}></audio>
                        <span>Duración: {duration}</span>
                        <span>Lanzamiento: {releaseDate}</span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SongList