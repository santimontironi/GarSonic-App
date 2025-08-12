import { useState, useEffect } from "react"
import { UseAuth } from "../context/useAuth.js"
import HeaderDashboard from "../components/HeaderDashboard.jsx"


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
       
      <HeaderDashboard />

      {errorData && <p>{errorData}</p>}

    </main>
    
  )
}

export default DashboardUser