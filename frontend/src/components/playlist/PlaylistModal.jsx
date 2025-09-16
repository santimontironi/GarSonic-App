import { useState, useEffect } from "react"
import { UseContextUser } from "../../context/user/UseContextUser"
import Swal from "sweetalert2";

const PlaylistModal = ({ closeModal, songId }) => {
  const [playlists, setPlaylists] = useState([])
  const [errorGetPlaylists, setErrorGetPlaylists] = useState(null)

  const { getAllPlaylists, addToPlaylist } = UseContextUser()


  useEffect(() => {
    async function getPlaylists() {
      try {
        const res = await getAllPlaylists()
        setPlaylists(res.data)
        setErrorGetPlaylists(null)
      } catch (error) {
        if (error.response?.data?.message) {
          setErrorGetPlaylists(error.response.data.message)
        }
      }
    }

    getPlaylists()
  }, [])

  async function handleAddToPlaylist(playlistId, songId) {
    const result = await Swal.fire({
      title: '¿Estás seguro de agregar esta canción a la playlist?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await addToPlaylist(playlistId, songId);
        closeModal();
        Swal.fire('¡Agregado!', 'La canción se ha agregado a la playlist.', 'success');
      } catch (error) {
        console.error("Error adding to playlist:", error);
        Swal.fire({ title: 'Error', text: error.response?.data?.message || 'Inténtalo de nuevo más tarde.', icon: 'error' });
      }
    }
  }

  return (
    <div className="fixed w-full h-screen inset-0 backdrop-blur-md z-50 flex justify-center items-center">
      <div className="xl:w-[850px] w-[400px] md:w-[650px] bg-gradient-to-br from-purple-800 to-purple-600 xl:p-[40px] md:p-[20px] p-[25px] rounded-2xl">

        <div className="mb-[20px] flex justify-between items-center">
          <h2 className="text-white text-[25px]">Tus playlists</h2>
          <button onClick={closeModal}><i className="bi bi-x-lg text-white cursor-pointer"></i></button>
        </div>

        <ul className="flex flex-col gap-[20px]">
          {playlists.map((pl) => (
            <li onClick={() => handleAddToPlaylist(pl._id, songId)} key={pl._id} className="flex items-center gap-[10px] md:gap-[20px] bg-purple-600 shadow-[4px_8px_10px_#000] cursor-pointer transform transition-all hover:scale-105">
              <img className="w-[120px] md:w-[170px]" src={`http://localhost:3000/uploads/${pl.coverImage}`} alt={pl.name} />
              <h3 className="text-white font-bold text-[14px] md:text-[17px]">{pl.playlistName}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PlaylistModal