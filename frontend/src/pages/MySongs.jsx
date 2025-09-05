import { useEffect, useState } from "react";
import SongCard from "../components/SongCard"
import { UseContextArtist } from "../context/UseContextArtist.js";
import BackButton from "../components/BackButton.jsx";
import { ToastContainer } from "react-toastify";

const MySongs = () => {

  const { mySongs } = UseContextArtist()
  const [songs, setSongs] = useState([])
  const [errorGetSongs, setErrorGetSongs] = useState("")

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await mySongs()
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
    <section className="w-full min-h-screen bg-gradient-to-b from-[#1e0333] to-[#1e0333] text-white pb-[50px]">

      <BackButton to={"/artista"} />

      <div className="title h-[200px] flex justify-center items-center">
        <h1 className="bg-[#662d91] w-[320px] text-white text-[28px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px] md:text-[40px] 2xl:text-[50px] md:w-[600px] text-center">Mis canciones</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-[20px] md:grid md:grid-cols-2 md:w-[750px] md:items-center md:justify-items-center md:gap-[40px] xl:grid xl:grid-cols-3 xl:w-[1200px] xl:gap-[40px] 2xl:grid 2xl:grid-cols-3 2xl:w-[1350px] mx-auto 2xl:gap-[50px]">
        {songs.map((formattedSongs) => (
          <SongCard key={formattedSongs._id}
            idSong={formattedSongs._id}
            coverImage={`http://localhost:3000/uploads/${formattedSongs.coverImage}`}
            artist={formattedSongs.artist.artistName}
            audioFile={`http://localhost:3000/uploads/${formattedSongs.audioFile}`}
            title={formattedSongs.title}
            duration={formattedSongs.duration}
            releaseDate={formattedSongs.releaseDate} />
        ))}

        {errorGetSongs && <p>{errorGetSongs}</p>}

        <ToastContainer />
      </div>
      {songs.length === 0 && (
        <div className="flex justify-center items-center mt-[30px] mx-auto text-center">
          <p className="text-gray-300 w-[400px] md:w-[640px] bg-purple-900/50 border border-purple-700 rounded-lg p-6 m-4 md:p-8 md:m-6 text-base md:text-lg lg:text-xl font-medium shadow-lg">
            No tienes canciones subidas. Sube tu primera canción en el panel de artista.
          </p>
        </div>
      )}
    </section>
  )
}

export default MySongs