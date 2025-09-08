import PlaylistCard from "../components/PlaylistCard";
import { UseContextUser } from "../context/UseContextUser";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

const MyPlaylists = () => {

  const [playlists, setPlaylists] = useState([])

  const { getAllPlaylists } = UseContextUser()

  const [errorGetPlaylists, setErrorGetPlaylists] = useState(null)

  useEffect(() => {
    async function getPlaylists() {
      try {
        const res = await getAllPlaylists()
        setPlaylists(res.data)
        console.log("esto es playlists",res.data)
      }
      catch (error) {
        if (error.response?.data?.message) {
          setErrorGetPlaylists(error.response.data.message);
        }
      }
    }

    getPlaylists()
  }, [])

  return (
    <main className="containerMyPlaylists w-full min-h-screen pb-[50px]">

      <BackButton to={"/usuario"} />
      
      <div className="title h-[200px] flex justify-center items-center">
        <h1 className="bg-[#662d91] w-[320px] text-white text-[28px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px] md:text-[40px] 2xl:text-[50px] md:w-[600px] text-center">Mis playlists</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-[20px] md:grid md:grid-cols-2 md:w-[750px] md:items-center md:justify-items-center md:gap-[40px] xl:grid xl:grid-cols-3 xl:w-[1200px] xl:gap-[40px] 2xl:grid 2xl:grid-cols-3 2xl:w-[1350px] mx-auto 2xl:gap-[50px]">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            coverImage={`http://localhost:3000/uploads/${playlist.coverImage}`}
            name={playlist.playlistName}
            description={playlist.description}
            date={playlist.createdAt}
            songs={playlist.songs}
            id={playlist._id}
          />
        ))}
      </div>


      {playlists.length === 0 && <p>No tienes playlists creadas.</p>}

    </main>
  )
}

export default MyPlaylists