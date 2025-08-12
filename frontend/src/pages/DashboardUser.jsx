import { useState, useEffect } from "react"
import { UseAuth } from "../context/useAuth.js"
import logo from '../static/img/logo.png'

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
    <main className="w-full h-screen bg-[#171717]">
       
      <header className="lg:flex lg:flex-col lg:text-white lg:gap-[50px] lg:h-screen lg:w-[300px] lg:p-[25px] lg:justify-center lg:items-center lg:bg-gradient-to-b lg:from-purple-900 lg:to-black lg:shadow-[10px_25px_25px_rgba(0,0,0,0.50)] lg:relative">

        <div>
          <img className="w-[200px]" src={logo} alt="logo app" />
        </div>

        <div className="lg:flex lg:flex-col lg:items-center">
          <nav>
            <ul>
              <li>
                <a className="lg:w-[150px] lg:p-[10px] lg:text-purple-500 lg:font-bold lg:rounded-2xl lg:bg-white lg:cursor-pointer lg:hover:bg-purple-700 lg:hover:text-white" href="/mis-listas">
                  Mis listas
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-center">
          <form className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-[15px]" method="post">
            <input className="lg:w-[200px] lg:p-[10px] lg:text-white lg:border-2 lg:border-white" type="text" placeholder="Ingrese el artista" />
            <button className="lg:w-[150px] lg:p-[10px] lg:text-white lg:bg-purple-500 lg:cursor-pointer lg:hover:bg-purple-700 lg:rounded-2xl" type="submit">Buscar</button>
          </form>
        </div>

        <div className="lg:flex lg:flex-col lg:items-center lg:gap-[10px]">
          <img className="lg:w-[100px] lg:h-[100px] lg:rounded-full lg:object-cover lg:border-2 lg:border-white" src={`http://localhost:3000/uploads/${userData?.profilePhoto}`}  alt={`foto de perfil de ${userData?.username} `} />
          <span className="lg:font-bold">{userData?.username}</span>
          <button className="lg:w-[150px] lg:p-[10px] lg:text-white lg:font-bold lg:rounded-2xl lg:bg-red-500 lg:cursor-pointer lg:hover:bg-purple-700 lg:hover:text-white" onClick={logout}>Cerrar sesión</button>
        </div>

      </header>

      

      {errorData && <p>{errorData}</p>}

    </main>
    
  )
}

export default DashboardUser