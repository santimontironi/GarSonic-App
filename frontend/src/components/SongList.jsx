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
        <div>

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