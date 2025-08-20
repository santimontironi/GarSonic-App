import { ArtistContext } from "./ArtistContext"
import { useEffect, useState } from "react"
import { loginArtistAxios, registerArtistAxios, dashboardArtist, logoutArtist} from "../api/api.js"

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

    async function fetchArtist(){
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

    useEffect(() => {
        fetchArtist()
    }, [])

    async function logout(){
        const res = await logoutArtist()
        setArtist(null)
        return res
    }

    return (
        <ArtistContext.Provider value={{artist,signInArtist,signUpArtist,fetchArtist,logout,loading}}>
            {children}
        </ArtistContext.Provider>
    )
}

export default ArtistProvider