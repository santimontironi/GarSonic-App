import { useState, useEffect } from "react"
import { UseAuth } from "../context/useAuth.js"
import { BounceLoader } from "react-spinners";

const DashboardUser = () => {

  const[userData,setUserData] = useState({})
  const[errorData,setErrorData] = useState(null)

  const {fetchUser, logout, loading} = UseAuth()

  useEffect(() => {
    async function fetchUserData(){
      try{
        const res = await fetchUser()
        setUserData(res.data.user)
      }
      catch(error){
        setErrorData(error.message)
      }
    }
    fetchUserData()
  },[])

  return (
    <main>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <BounceLoader color="#36d7b7" />
        </div>
      ) : (
        <header>

          <div className="header-left">
            <nav>
              <ul>
                <li><a href="">Mis listas</a></li>
                <li></li>
                <li></li>
              </ul>
            </nav>
          </div>

          <div className="header-center">

          </div>

          <div className="header-right">
            <img src={`http://localhost:3000/uploads/${userData?.profilePhoto}`}  alt="Foto de perfil" />
            <span>{userData?.username}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </div>

        </header>
      )}

      {errorData && <p>{errorData}</p>}

    </main>
    
  )
}

export default DashboardUser