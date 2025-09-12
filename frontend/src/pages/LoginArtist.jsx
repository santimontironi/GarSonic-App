import { useForm } from "react-hook-form";
import { UseContextArtist } from "../context/UseContextArtist.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import BackButton from "../components/BackButton.jsx";

const LoginArtist = () => {

  const navigate = useNavigate()

  const [correctLoginArtist, setCorrectLoginArtist] = useState(false)

  const [errorLoginArtist, setErrorLoginArtist] = useState("")

  const { signInArtist } = UseContextArtist()

  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  async function submitForm(values) {
    try {
      await signInArtist(values)
      setErrorLoginArtist("")
      reset()
      setCorrectLoginArtist(true)
    }
    catch (error) {
      if (error.response?.data?.message) {
        reset()
        setErrorLoginArtist(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    if (correctLoginArtist) {
      navigate('/artista')
    }
  }, [correctLoginArtist, navigate])

  return (
    <main className="containerLoginArtist w-full h-screen">

      <BackButton to="/ingresar" />

      <div className="title h-[200px] flex justify-center items-center">
        <h1 className="bg-black text-white text-[32px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px] md:text-[40px] md:w-[600px] text-center">Ingreso de artista</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="contentLogin flex justify-center items-center flex-col w-full h-[300px]">
          <form className="flex flex-col w-[350px] h-[300px] p-[20px] rounded-[10px] shadow-[5px_7px_10px_#000] md:w-[450px] md:h-[350px]" method="post" onSubmit={handleSubmit(submitForm)}>

            <div className="mt-5 flex flex-col">
              <label className="text-white text-[15px]" htmlFor="identifier">Correo electrónico o nombre de artista</label>
              <input className="w-full p-[7px] bg-white text-black" type="text" {...register("identifier", { required: true })} />
              {errors.identifier && (
                <p className="text-white">El correo electrónico o nombre de artista es requerido</p>
              )}
            </div>

            <div className="mt-5 flex flex-col">
              <label className="text-white text-[15px]" htmlFor="password">Contraseña</label>
              <input className="w-full p-[7px] bg-white text-black" type="password" {...register("password", { required: true })} />
              {errors.password && (
                <p className="text-white">La contraseña es requerida</p>
              )}
            </div>

            <button className="text-white bg-black p-[10px] mt-5 w-[160px] m-auto hover:text-black hover:bg-white cursor-pointer" type="submit">Iniciar sesión</button>
          </form>

          <a href="/registroArtista" className="text-white mt-[16px] underline">¿No tenés cuenta?</a>

        </div>

      </motion.div>


      {errorLoginArtist && (
        <p className="errorAuth text-center text-white bg-[#d81630] p-[8px] mt-[30px] shadow-[5px_10px_15px_#101010] w-[260px] lg:p-[10px] font-[900] m-auto lg:mt-[20px] lg:w-[700px]">Error al iniciar sesión: {errorLoginArtist}</p>
      )}


    </main>
  )
}

export default LoginArtist