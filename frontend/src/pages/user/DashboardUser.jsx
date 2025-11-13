import { useState, useEffect } from "react";
import { UseContextUser } from "../../context/user/UseContextUser.js";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import SongSearch from "../../components/song/SongSearch.jsx";
import "react-toastify/dist/ReactToastify.css";

const DashboardUser = () => {
  const [userData, setUserData] = useState({});
  const [errorData, setErrorData] = useState(null);

  const [searched, setSearched] = useState(false);

  const { fetchUser, search, logout } = UseContextUser();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetchUser();
        setUserData(res.data.user);
        setErrorData("");
      } catch (error) {
        setErrorData(error.message);
      }
    }
    fetchUserData();
  }, []);

  return (
    <main className="w-full h-screen flex justify-center items-center bg-[#171717]">
      <motion.section
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative flex flex-col items-center h-[700px] gap-[15px] border-2 border-purple-600 rounded-[8px] p-[10px] w-[360px] mx-auto md:w-[90%]"
      >
     
        <SongSearch
          setSearched={setSearched}
          search={search}
        />

        {!searched && (
          <div className="mt-8 text-center">
            <h1 className="text-white tituloDashboard text-[40px] border-b-2 border-purple-600 md:text-[60px]">
              Bienvenido <span>{userData.name}</span>
            </h1>
            <p className="text-white text-[16px] md:text-[19px] w-[300px] md:w-[600px] text-center">
              Aquí puedes encontrar tus canciones favoritas y hacer tus playlist a tu gusto.
            </p>
            <figure className="w-[150px] md:w-[200px] md:h-[200px] h-[150px] bg-purple-600 rounded-full flex items-center justify-center mx-auto mt-4">
              <img
                className="w-[145px] h-[145px] md:w-[185px] md:h-[185px] rounded-full object-cover"
                src={userData.profilePhoto}
                alt={`foto de perfil de ${userData.username}`}
              />
            </figure>
            <div className="flex gap-[15px] justify-center mt-4">
              <Link
                to="/usuario/misPlaylists"
                className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-purple-800"
              >
                Mis Playlist
              </Link>
              <Link
                to="/usuario/nuevaPlaylist"
                className="text-white p-[10px] bg-purple-600 rounded-[8px] hover:bg-purple-800"
              >
                Nueva playlist
              </Link>
            </div>
          </div>
        )}

        
        <button
          className="absolute bottom-5 right-5 w-[150px] p-[10px] text-white font-bold rounded-2xl bg-red-500 cursor-pointer hover:bg-purple-700 hover:text-white"
          onClick={logout}
        >
          Cerrar sesión
        </button>
 
        {errorData && <p className="text-red-500">{errorData}</p>}
      </motion.section>

      <ToastContainer />
    </main>
  );
};

export default DashboardUser;