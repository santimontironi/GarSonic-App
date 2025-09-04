import PlaylistCard from "../components/PlaylistCard";
import { UseContextUser } from "../context/UseContextUser";
import { useState, useEffect } from "react";

const MyPlaylists = () => {

  const [playlists, setPlaylists] = useState([])

  const { getAllPlaylists } = UseContextUser()

  const [errorGetPlaylists, setErrorGetPlaylists] = useState(null)

  useEffect(() => {
    async function getPlaylists() {
      try {
        const res = await getAllPlaylists()
        setPlaylists(res.data)
        console.log("esto es res:",res)
        console.log("esto es res.data",res.data)
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
    <main>
      <h1>Mis Playlists</h1>

      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          coverImage={`http://localhost:3000/uploads/${playlist.coverImage}`}
          name={playlist.playlistName}
          description={playlist.description}
          date={playlist.createdAt}
          songs={playlist.songs}
        />
      ))}

      {playlists.length === 0 && <p>No tienes playlists creadas.</p>}

    </main>
  )
}

export default MyPlaylists