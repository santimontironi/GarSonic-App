import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const SongCard = ({ coverImage, artist, title, audioFile, duration, releaseDate }) => {

  const audioRef = useRef(null)
  const [isPlaying,setIsPlaying] = useState(false)


  function handlePlay(){
    if(isPlaying){
      audioRef.current.pause()
    }
    else{
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (

    <div className="flex w-[380px] rounded-2xl bg-[#1e0333] items-center gap-[10px] p-[20px]">

      <div>
        <img className="w-[120px] h-[120px] border-2 border-purple-800 rounded-2xl" src={coverImage} alt={title} />
      </div>

      <div className="flex flex-col">

        <div className="flex flex-col gap-[7px]">
          <span className="font-bold text-[20px]">{title}</span>
          <span className="font-light text-gray-200">{artist}</span>
        </div>
        
        <div className="flex mt-[10px] gap-[15px]">

          <button className="bg-purple-500 text-white rounded-3xl flex items-center justify-center p-[10px]" onClick={handlePlay}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <div className="flex flex-col">
            <audio src={audioFile} ref={audioRef} onEnded={() => setIsPlaying(false)}></audio>
            <span className="text-[13px]">Duración: {duration}</span>
            <span className="text-[13px]">Lanzamiento: {releaseDate}</span>
          </div>

        </div>

      </div>

    </div>

  )
}

export default SongCard