import { ArtistContext } from "./ArtistContext"
import { useState } from "react"
import { loginArtistAxios, registerArtistAxios } from "../api/api"

const ArtistProvider = ({children}) => {

    const[artist,setArtist] = useState(null)

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
    async function logout(){
        const res = await logoutUser()
        setArtist(null)
        return res
    }

    return (
        <ArtistContext.Provider value={{artist,signInArtist,signUpArtist,logout}}>
            {children}
        </ArtistContext.Provider>
    )
}

export default ArtistProvider