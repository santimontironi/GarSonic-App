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
      {songs.map((formattedSongs) => (
        <SongCard key={formattedSongs._id}
          coverImage={`http://localhost:3000/uploads/${formattedSongs.coverImage}`}
          artist={formattedSongs.artist.artistName} 
          audioFile={`http://localhost:3000/uploads/${formattedSongs.audioFile}`}
          title={formattedSongs.title}
          duration={formattedSongs.duration}
          releaseDate={formattedSongs.releaseDate} />
      ))}

      {errorGetSongs && <p>{errorGetSongs}</p>}
    </div>
  )
}

export default MySongs