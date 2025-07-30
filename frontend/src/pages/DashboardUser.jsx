import { useState, useEffect } from "react"
import { UseAuth } from "../context/useAuth.js"

const DashboardUser = () => {

  const[userData,setUserData] = useState({})
  const[errorData,setErrorData] = useState(null)

  const {fetchUser} = UseAuth()

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
    <img 
      src={`http://localhost:3000/uploads/${userData?.profilePhoto}`} 
      alt="Foto de perfil" 
    />
  )
}

export default DashboardUser