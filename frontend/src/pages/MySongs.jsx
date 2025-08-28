import { useEffect, useState } from "react";
import SongCard from "../components/SongCard"
import { UseContextArtist } from "../context/UseContextArtist.js";

const MySongs = () => {

  const { mySongs } = UseContextArtist()
  const [songs, setSongs] = useState([])
  const [errorGetSongs, setErrorGetSongs] = useState("")

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await mySongs()
        console.log(res)
        setSongs(res)
      }
      catch (error) {
        if (error.response?.data?.message) {
          setErrorGetSongs(error.response.data.message);
        }
      }

    }
    fetchSongs()
  }, [])

  return (
    <div>
      {songs.map((song) => (
        <SongCard key={song._id}
          coverImage={`http://localhost:3000/uploads/${song.coverImage}`}
          artist={song.artist.artistName} 
          audioFile={`http://localhost:3000/uploads/${song.audioFile}`}
          title={song.title}
          duration={song.duration}
          releaseDate={song.releaseDate} />
      ))}
    </div>
  )
}

export default MySongs