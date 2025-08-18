import { useForm } from "react-hook-form";
import { UseContextArtist } from "../context/UseContextArtist.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

const RegisterArtist = () => {

  const navigate = useNavigate()

  const [correctRegister, setCorrectRegister] = useState(false)

  const [errorRegister, setErrorRegister] = useState("")

  const [file, setFile] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const { signUpArtist } = UseContextArtist()

  async function submitForm(values) {
    try {
      const formData = new FormData();
      formData.append("artistName", values.artistName);
      formData.append("email", values.email);
      formData.append("bio", values.bio);
      formData.append("genre", values.genre);
      formData.append("password", values.password);
      if (file) {
        formData.append("profilePhoto", file);
      }

      await signUpArtist(formData);

      setCorrectRegister(true);
      setErrorRegister("");
      reset();
      setFile(null);
    }
    catch (error) {
      console.log(error)
      if (error.response?.data?.message) {
        setErrorRegister(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (correctRegister) {
      navigate('/loginArtista',{state:{successMessage:"Artista registrado con éxito, inicia sesión."}})
    }
  }, [correctRegister, navigate])


  return (
    <main className="containerRegisterArtist min-h-screen w-full">

      <div className="titleRegisterArtist h-[140px] flex justify-center items-center">
        <h1 className="bg-[#662d91] w-[350px] text-white tex text-[29px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[8px] md:p-[12px] md:text-[40px] md:w-[600px] text-center">Registro de Artista</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <form className="flex flex-col w-[350px] m-auto h-auto p-[20px] rounded-[10px] shadow-[5px_7px_10px_#000] md:w-[450px]" method="post" onSubmit={handleSubmit(submitForm)}>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="profilePhoto">Foto de perfil</label>
            <input
              className="w-full p-[7px] bg-white text-black cursor-pointer"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="artistName">Nombre artístico</label>
            <input className="w-full p-[7px] bg-white text-black" type="text" {...register("artistName", { required: true })} />
            {errors.artistName && (
              <p className="text-white">El nombre es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="bio">Biografía</label>
            <textarea name="bio" id="bio" className="bg-white text-black p-[7px]" {...register("bio", { required: true })}></textarea>
            {errors.bio && (
              <p className="text-white">La biografía es requerida</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="genre">Género</label>
            <select
              className="w-full p-[7px] bg-white text-black"
              {...register("genre", { required: true })}
            >
              <option value="">Selecciona un género</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="rap">Rap</option>
              <option value="cumbia">Cumbia</option>
              <option value="reggae">Reggae</option>
              <option value="reggaeton">Reggaeton</option>
              <option value="electrónica">Electrónica</option>
              <option value="otro">Otro</option>
            </select>
            {errors.genre && (
              <p className="text-white">El género es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="email">Correo electrónico</label>
            <input className="w-full p-[7px] bg-white text-black" type="email" {...register("email", { required: true })} />
            {errors.email && (
              <p className="text-white">El correo electrónico es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="password">Contraseña</label>
            <input className="w-full p-[7px] bg-white text-black" type="password" {...register("password", { required: true })} />
            {errors.password && (
              <p className="text-white">La contraseña es requerida</p>
            )}
          </div>

          <button className="m-auto mt-5 text-[#662d91] bg-white font-bold border-none cursor-pointer p-[10px] hover:text-white hover:bg-black" type="submit">Crear cuenta</button>
        </form>

      </motion.div>


      <a href="/loginArtista" className="text-white mt-[16px] underline text-center flex items-center justify-center">Ya tengo cuenta</a>

      {errorRegister && (
        <p className="errorAuth text-center text-white bg-[#d81630] p-[8px] mt-[30px] shadow-[5px_10px_15px_#101010] w-[400px] lg:p-[10px] font-[900] m-auto lg:mt-[20px] lg:w-[700px]">Error al registrarse: {errorRegister}</p>
      )}
    </main>
  )
}

export default RegisterArtist