import { useState, useEffect } from "react"
import { UseContextUser } from "../context/UseContextUser.js"
import HeaderDashboardUser from "../components/HeaderDashboardUser.jsx"

const DashboardUser = () => {

  const[userData,setUserData] = useState({})
  const[errorData,setErrorData] = useState(null)

  const {fetchUser} = UseContextUser()

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
       
      <HeaderDashboardUser />

      <section className="flex flex-col items-center h-screen w-full justify-center">
        <h1 className="text-white tituloDashboard text-[32px]">Bienvenido <span>{userData.name}</span></h1>
        <p className="text-white text-[16px] w-[300px] text-center">Aqui puedes encontrar tus canciones favoritas y hacer tus playlist a tu gusto.</p>
      </section>

      {errorData && <p>{errorData}</p>}

    </main>
    
  )
}

export default DashboardUser