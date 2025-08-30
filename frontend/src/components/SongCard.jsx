import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const SongCard = ({ coverImage, artist, title, audioFile, duration, releaseDate }) => {

  const audioRef = useRef(null)
  const [isPlaying,setIsPlaying] = useState(false)


  function handlePlay(){
    setIsPlaying(!isPlaying)
    if(isPlaying){
      audioRef.current.pause()
    }
    else{
      audioRef.current.play()
    }
  }

  return (

    <div className="flex w-[380px] rounded-2xl bg-[#9032d8] shadow-[4px_4px_10px_rgba(0,0,0,0.5)] items-center gap-[10px] p-[20px] transform md:hover:scale-105 md:transition md:ease-in md:duration-300 2xl:w-[430px]">

      <img className="w-[120px] h-[120px] 2xl:w-[140px] 2xl:h-[140px] border-2 border-purple-800 rounded-2xl bg-cover" src={coverImage} alt={title} />
      

      <div className="flex flex-col">

        <div className="flex flex-col gap-[7px]">
          <span className="font-bold text-[20px] 2xl:text-[25px]">{title}</span>
          <span className="font-light text-gray-200 2xl:text-[18px]">{artist}</span>
        </div>
        
        <div className="flex mt-[10px] gap-[15px]">

          <button className="bg-white text-black rounded-3xl flex items-center justify-center p-[10px] lg:cursor-pointer" onClick={handlePlay}>
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