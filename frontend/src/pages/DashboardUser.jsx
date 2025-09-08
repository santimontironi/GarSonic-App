import { useState, useEffect } from "react"
import { UseContextUser } from "../context/UseContextUser.js"
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';
import SongList from "../components/SongList.jsx";
import 'react-toastify/dist/ReactToastify.css';
const DashboardUser = () => {

  const [userData, setUserData] = useState({})
  const [errorData, setErrorData] = useState(null)

  const [inputSearch, setInputSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)

  const { fetchUser, search, logout } = UseContextUser()

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetchUser()
        setUserData(res.data.user)
        setErrorData('')
      }
      catch (error) {
        setErrorData(error.message)
      }
    }
    fetchUserData()
  }, [])


  useEffect(() => {
    async function handleSearch() {
      if(inputSearch.trim() == ''){
        setSearchResults([])
        return
      }
      try {
        setSearching(true)
        const res = await search(inputSearch)
        setSearchResults(res.data)
      }
      catch (error) {
        console.log(error)
      }
      finally{
        setSearching(false)
      }
    }
    handleSearch()
  }, [inputSearch])

  useEffect(() => {
    if (searchResults.length == 0 && inputSearch.trim() !== '') {
      toast.error("No se encontraron resultados en la busqueda.", { toastId: "no-results", autoClose: 1800, hideProgressBar:true })
    }
  }, [searchResults, inputSearch])

  return (
    <main className="w-full h-screen flex justify-center items-center bg-[#171717]">
      <motion.section
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative flex flex-col items-center h-[700px] justify-center gap-[15px] border-2 border-purple-600 rounded-[8px] p-[10px] w-[360px] mx-auto md:w-[90%]"
      >
        <form className="absolute top-10" method="post" onSubmit={(e) => e.preventDefault()}>
          <input className="bg-white p-2 w-[340px] md:w-[600px] md:p-3 text-purple-800 rounded-[8px] focus:outline-purple-900" type="text" placeholder="Buscar canciones..." onChange={(e) => setInputSearch(e.target.value)} />
        </form>

        {inputSearch.trim() !== '' && searchResults.length !== 0 ? (
          searchResults.map((result) => (
            <SongList coverImage={result.coverImage} artist={result.artist.artistName} title={result.title} audioFile={result.audioFile} duration={result.duration} releaseDate={result.releaseDate} key={result._id} />
          ))
        ) : (
          <>
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
              <a href="/usuario/misPlaylists" className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-purple-800">Mis Playlist</a>
              <a href="/usuario/nuevaPlaylist" className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-purple-800">Nueva playlist</a>
            </div>
            <button
              className="absolute bottom-5 right-5 w-[150px] p-[10px] text-white font-bold rounded-2xl bg-red-500 cursor-pointer hover:bg-purple-700 hover:text-white"
              onClick={logout}>
              Cerrar sesión
            </button>
          </>
        )}
      </motion.section>

      <ToastContainer />

    </main >

  )
}

export default DashboardUser