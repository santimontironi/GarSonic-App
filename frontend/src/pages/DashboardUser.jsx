import { useState, useEffect } from "react"
import { UseAuth } from "../context/useAuth.js"

const DashboardUser = () => {

  const[userData,setUserData] = useState({})
  const[errorData,setErrorData] = useState(null)

  const {fetchUser, logout} = UseAuth()

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
    </main>
    
  )
}

export default DashboardUser