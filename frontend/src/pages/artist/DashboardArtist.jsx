import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { UseContextArtist } from "../../context/artist/UseContextArtist"

const DashboardArtist = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const [artistData, setArtistData] = useState({})
  const [errorData, setErrorData] = useState(null)

  const { fetchArtist, logout } = UseContextArtist()

  useEffect(() => {
    async function fetchArtistData() {
      try {
        const res = await fetchArtist()
        setArtistData(res.data.artist)
      }
      catch (error) {
        setErrorData(error.message)
      }
    }
    fetchArtistData()
  }, [])

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage)
      navigate(location.pathname, { replace: true })
    }
  }, [location, navigate])


  return (
    <main className="w-full h-screen flex justify-center items-center bg-purple-950">

      <ToastContainer />

      {!artistData?.artistName ? (
        <p className="text-white">Cargando datos del artista...</p>
      ) : (

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative flex flex-col items-center h-auto bg-black shadow-[17px_10px_20px_#000] justify-center gap-[15px] border-1 border-white rounded-[8px] p-[20px] w-[360px] mx-auto md:w-[90%]"
        >
          <h1 className="text-white tituloDashboard text-[40px] border-b-2 border-purple-600 md:text-[60px]">Bienvenido <span>{artistData?.artistName}</span></h1>

          <p className="text-white text-[16px] md:text-[19px] w-[300px] md:w-[600px] text-center">Este es tu panel de artista, donde podrás gestionar tu música, crear nuevos lanzamientos y conectar con tus oyentes.</p>

          <figure className="w-[150px] md:w-[200px] md:h-[200px] h-[150px] bg-purple-600 rounded-full flex items-center justify-center">
            <img
              className="w-[145px] h-[145px] md:w-[185px] md:h-[185px] rounded-full object-cover"
              src={`http://localhost:3000/uploads/${artistData?.profilePhoto}`}
              alt={`foto de perfil de ${artistData?.artistName}`}
            />
          </figure>

          <p className="text-gray-300 italic text-[14px] md:text-[16px] w-[300px] md:w-[600px] text-center">
            "{artistData.description}"
          </p>

          <div className="flex gap-[15px]">
            <Link to="/artista/misCanciones" className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-white hover:text-black">Mis Canciones</Link>
            <Link to="/artista/subirCancion" className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-white hover:text-black">Agregar canción</Link>
          </div>

          <button
            className="w-[150px] p-[10px] text-white font-bold rounded-2xl bg-red-500 cursor-pointer hover:bg-purple-700 hover:text-white"
            onClick={logout}>
            Cerrar sesión
          </button>

        </motion.section>

      )} 
      
      {errorData && <p>{errorData}</p>}
      

    </main >
  )
}

export default DashboardArtist