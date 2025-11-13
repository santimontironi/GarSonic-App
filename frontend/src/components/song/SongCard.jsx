import { UseContextArtist } from "../../context/artist/UseContextArtist";
import Swal from "sweetalert2";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const SongCard = ({ idSong, coverImage, artist, title, audioFile, duration, releaseDate }) => {

  const { deleteSong } = UseContextArtist()

  function handleDeleteSong() {
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
          await deleteSong(idSong)
          Swal.fire('¡Eliminado!', 'Canción eliminada con éxito.', 'success').then(() => {
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
    <div className="relative flex flex-col w-[380px] 2xl:w-[430px] bg-[#9032d8] rounded-2xl shadow-[4px_4px_10px_rgba(0,0,0,0.5)] p-[20px] gap-[15px] md:hover:scale-105 md:transition md:ease-in md:duration-300">

      <img
        className="w-full h-[200px] 2xl:h-[230px] object-cover border-2 border-purple-800 rounded-2xl"
        src={coverImage}
        alt={title}
      />

      <button
        onClick={handleDeleteSong}
        className="absolute right-[10px] top-[10px] bg-red-500 hover:bg-red-700 text-white rounded-3xl p-[6px]"
      >
        <i className="bi bi-trash text-[20px]"></i>
      </button>

      <div className="flex flex-col">
        <span className="font-bold text-[20px] 2xl:text-[24px] text-white">{title}</span>
        <span className="font-light text-gray-200 2xl:text-[18px]">{artist}</span>
        <span className="text-[13px] text-gray-300 mt-[5px]">Duración: {duration}</span>
        <span className="text-[13px] text-gray-300">Lanzamiento: {releaseDate}</span>
      </div>

      <AudioPlayer
        src={audioFile}
        showSkipControls={false}
        showJumpControls={false}
        layout="horizontal"
        autoPlayAfterSrcChange={false}
        style={{
          borderRadius: "12px",
          backgroundColor: "#6a1bb9"
        }}
        className="custom-audio-player"
      />

    </div>
  );
}

export default SongCard