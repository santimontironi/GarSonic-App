import { useState } from "react";

const PlaylistCard = ({name,description,coverImage,date,songs}) => {

  const[open, setOpen] = useState(false)

  function handleClick() {
    if(open){
      setOpen(false)
    }else{
      setOpen(true)
    }
  }

  return (
    <div className="relative flex flex-col w-[380px] rounded-2xl bg-[#9032d8] shadow-[4px_4px_10px_rgba(0,0,0,0.5)] items-center gap-[10px] p-[20px] transform md:hover:scale-105 md:transition md:ease-in md:duration-300 2xl:w-[430px] text-white">

      <img className="w-[300px]" src={coverImage} alt={name} />

      <div>
        <i onClick={handleClick} class="absolute top-[10px] right-[10px] text-[30px] bi bi-three-dots-vertical cursor-pointer"></i>
      </div>

      <div className={`flex gap-[10px] ${open ? "flex flex-col absolute top-[50px] right-[10px] bg-[#101010] text-white w-[200px] rounded-2xl p-[5px]" : "hidden"}`}>
        <button className="hover:bg-green-400 rounded-2xl hover:text-black">Agregar canción</button>
        <button className="hover:bg-red-400 rounded-2xl hover:text-black">Eliminar playlist</button>
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
        <button>Ver canciones {(songs.length)}</button>
      )}
    </div>
  )
}

export default PlaylistCard;