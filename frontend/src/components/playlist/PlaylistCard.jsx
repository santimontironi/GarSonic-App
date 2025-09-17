import { useState } from "react";
import { UseContextUser } from "../../context/user/UseContextUser";
import Swal from "sweetalert2";
import SongList from "../song/SongList";

const PlaylistCard = ({ id, name, description, coverImage, date, songs }) => {

  const [open, setOpen] = useState(false)

  const [openSongs, setOpenSongs] = useState(false)

  const { deletePlaylist } = UseContextUser();

  function handleClick() {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  function handleDeletePlaylist() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePlaylist(id)
          Swal.fire('¡Eliminado!', 'Playlist eliminada con éxito.', 'success').then(() => {
            window.location.reload()
          })
        }
        catch (error) {
          if (error.response?.data?.message) {
            console.log(error.response.data.message)
          }
        }
      }
    });
  }

  return (
    <div className="relative flex flex-col w-[380px] rounded-2xl bg-[#9032d8] shadow-[4px_4px_10px_rgba(0,0,0,0.5)] items-center gap-[10px] p-[20px] hover:outline-2 hover:outline-white 2xl:w-[430px] text-white">

      <img className="w-[280px] shadow-[8px_8px_15px_rgba(0,0,0,0.7)]" src={coverImage} alt={name} />

      <div>
        <i onClick={handleClick} className="absolute top-[10px] right-[10px] text-[30px] bi bi-three-dots-vertical cursor-pointer"></i>
      </div>

      <div className={`flex gap-[10px] ${open ? "flex flex-col absolute top-[50px] right-[10px] bg-[#101010] text-white w-[200px] rounded-2xl p-[5px]" : "hidden"}`}>
        <button className="hover:bg-green-400 rounded-2xl hover:text-black">Agregar canción</button>
        <button onClick={handleDeletePlaylist} className="hover:bg-red-400 rounded-2xl hover:text-black">Eliminar playlist</button>
      </div>

      <div className="flex flex-col gap-[7px] text-center">
        <h3 className="font-bold text-[15px] xl:text-[17px]">Nombre: <span className="font-light">{name}</span></h3>
        <p className="font-bold text-[15px] xl:text-[17px]">Descripcion: <span className="font-light">{description}</span></p>
        <span className="font-bold text-[15px] xl:text-[17px]">Fecha de creación: <span className="font-light">{date}</span></span>
      </div>

      {songs.length == 0 ? (
        <div>
          <span className="text-red-600 font-bold bg-white p-[6px]">Aún no tienes canciones agregadas</span>
        </div>
      ) : (
        <button onClick={() => setOpenSongs(true)} className="cursor-pointer bg-white text-black rounded-2xl p-[10px]">Ver canciones ({(songs.length)})</button>
      )}

      {openSongs && (
        <div className="fixed inset-0 z-50 flex justify-center items-center m-auto bg-black/50 backdrop-blur-md">
          <div className="bg-[#101010] p-6 rounded-2xl 2xl:w-[1000px] m-auto max-h-[80vh] overflow-y-auto flex justify-center items-center flex-col gap-6">
            {songs.map((song) => (
              <SongList
                key={song._id} 
                coverImage={`http://localhost:3000/uploads/${song.coverImage}`}
                artist={song.artist.artistName}
                title={song.title}
                audioFile={`http://localhost:3000/uploads/${song.audioFile}`}
                duration={song.duration}
                releaseDate={song.releaseDate}
                genre={song.genre}
              />
            ))}

            <button onClick={() => setOpenSongs(false)}className="mt-4 self-center bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition cursor-pointer">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaylistCard;