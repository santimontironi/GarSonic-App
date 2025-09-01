import { useState } from "react"
import { useForm } from "react-hook-form"
import BackButton from "../components/BackButton"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { UseContextUser } from '../context/UseContextUser.js'

const CreatePlaylist = () => {

  const [file, setFile] = useState(null)
  const [errorCreate, setErrorCreate] = useState(null)

  const { createPlaylist } = UseContextUser()

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  async function submitForm(values) {
    try {
      const formData = new FormData();
      formData.append("playlistName", values.playlistName);
      formData.append("description", values.description);
      formData.append("coverImage", values.coverImage);
  
      if (file) {
        formData.append("coverImage", file);
      }

      const res = await createPlaylist(formData);
      console.log("ESTO ES RES DESDE CREATEPLAYLIST ", res)

      Swal.fire('¡Subido!', 'Playlist creada con éxito.', 'success').then(() => {
        navigate('/usuario')
      })

      setErrorCreate("");
      setFile(null);
      reset();
    }
    catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        setErrorCreate(error.response.data.message);
      }
    }
  }

  return (
    <main className="containerCreatePlaylist min-h-screen w-full">

      <BackButton to="/usuario" />

      <div className="titleCreatePlaylist h-[160px] flex justify-center items-center">
        <h1 className="bg-[#662d91] w-[320px] text-white text-[27px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px] md:text-[40px] md:w-[600px] text-center">Crear Playlist</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <form className="flex flex-col w-[350px] m-auto h-auto p-[20px] rounded-[10px] shadow-[5px_7px_10px_#000] md:w-[450px] border-2 border-white formCreatePlaylist" method="post" onSubmit={handleSubmit(submitForm)}>

          <div className="mt-5 flex flex-col gap-[6px]">
            <label className="text-white" htmlFor="coverImage">Portada</label>
            <input
              className="w-full p-[7px] bg-white text-black cursor-pointer"
              name="coverImage"
              type="file"
              accept="image/*"
              {...register("coverImage", { required: true })}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {errors.coverImage && (
              <p className="text-white">La imagen de portada es requerida</p>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-[6px]">
            <label className="text-white" htmlFor="playlistName">Nombre</label>
            <input className="w-full p-[7px] bg-white text-black" type="text" {...register("playlistName", { required: true })} />
            {errors.playlistName && (
              <p className="text-white">El nombre de la playlist es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-[6px]">
            <label className="text-white" htmlFor="description">Descripción</label>
            <textarea className="w-full p-[7px] bg-white text-black" {...register("description", { required: true })}></textarea>
            {errors.description && (
              <p className="text-white">La descripción es requerida</p>
            )}
          </div>

          <button className="m-auto mt-5 text-[#662d91] bg-white font-bold border-none cursor-pointer p-[10px] hover:text-white hover:bg-black" type="submit">Agregar playlist</button>
        </form>

      </motion.div>

      {errorCreate && (
        <p className="errorAuth text-center text-white bg-[#d81630] p-[8px] mt-[30px] shadow-[5px_10px_15px_#101010] w-[400px] lg:p-[10px] font-[900] m-auto lg:mt-[20px] lg:w-[700px]">Error al crear playlist: {errorCreate}</p>
      )}
    </main>
  )
}

export default CreatePlaylist