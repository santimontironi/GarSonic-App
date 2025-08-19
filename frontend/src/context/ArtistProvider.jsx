import { ArtistContext } from "./ArtistContext"
import { useState } from "react"
import { loginArtistAxios, registerArtistAxios, dashboardArtist} from "../api/api.js"

const ArtistProvider = ({children}) => {

    const[artist,setArtist] = useState(null)

    const[loading,setLoading] = useState(true)

    async function signUpArtist(artist){
        const res = await registerArtistAxios(artist)
        setArtist(res.data.artist)
        return res.data
    }
    
    async function signInArtist(artist){
        const res = await loginArtistAxios(artist)
        setArtist(res.data.artist)
        return res.data
    }

    async function dashboardArtist(){
        try {
            const res = await dashboardArtist();
            if(res.data.authenticated === false){
                setArtist(null)
            }else{
                setArtist(res.data.artist);
            }
            return res
        } catch (error) {
            setArtist(null);
        }
        finally{
            setTimeout(function() {
                setLoading(false)
            }, 1500)
        }
    }

    async function logout(){
        const res = await logoutUser()
        setArtist(null)
        return res
    }

    return (
        <ArtistContext.Provider value={{artist,signInArtist,signUpArtist,dashboardArtist,logout}}>
            {children}
        </ArtistContext.Provider>
    )
}

export default ArtistProvider