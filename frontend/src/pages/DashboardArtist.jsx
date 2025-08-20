import { useState, useEffect } from "react"
import UseContextArtist from "../context/UseContextArtist.js"

const DashboardArtist = () => {

  const [artistData, setArtistData] = useState({})
  const [errorData, setErrorData] = useState(null)

  const { fetchArtist, logout } = UseContextArtist()

  useEffect(() => {
    async function fetchArtistData() {
      try {
        const res = await fetchArtist()
        setArtistData(res.data.user)
      }
      catch (error) {
        setErrorData(error.message)
      }
    }
    fetchArtistData()
  }, [])


  return (
    <main className="w-full h-screen flex justify-center items-center bg-[#171717]">

      <section className="relative flex flex-col items-center h-[700px] justify-center gap-[15px] border-2 border-purple-600 rounded-[8px] p-[10px] w-[450px] mx-auto md:w-[90%]">
        <form className="absolute top-10" method="post">
          <input className="bg-white p-2 w-[400px] md:w-[600px] md:p-3 text-purple-800 rounded-[8px] focus:outline-purple-900" type="text" placeholder="Buscar canciones..." />
        </form>
        <h1 className="text-white tituloDashboard text-[40px] border-b-2 border-purple-600 md:text-[60px]">Bienvenido <span>{userData.name}</span></h1>
        <p className="text-white text-[16px] md:text-[19px] w-[300px] md:w-[600px] text-center">Aqui puedes encontrar tus canciones favoritas y hacer tus playlist a tu gusto.</p>
        <figure className="w-[150px] md:w-[200px] md:h-[200px] h-[150px] bg-purple-600 rounded-full flex items-center justify-center">
          <img
            className="w-[145px] h-[145px] md:w-[185px] md:h-[185px] rounded-full object-cover"
            src={`http://localhost:3000/uploads/${userData?.profilePhoto}`}
            alt={`foto de perfil de ${userData?.username}`}
          />
        </figure>
        <div className="flex gap-[15px]">
          <a href="/playlist" className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-purple-800">Mis Playlist</a>
          <a href="/nuevaPlaylist" className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-purple-800">Nueva playlist</a>
        </div>
        <button
          className="absolute bottom-5 right-5 w-[150px] p-[10px] text-white font-bold rounded-2xl bg-red-500 cursor-pointer hover:bg-purple-700 hover:text-white"
          onClick={logout}>
          Cerrar sesión
        </button>
      </section>

      {errorData && <p>{errorData}</p>}

    </main>
  )
}

export default DashboardArtist