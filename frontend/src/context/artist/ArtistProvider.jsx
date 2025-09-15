import { ArtistContext } from "./ArtistContext"
import { useEffect, useState } from "react"
import { loginArtistAxios, registerArtistAxios, dashboardArtistAxios, uploadSongAxios, mySongsAxios, deleteSongAxios, logoutArtist, verifyArtistAxios} from "../api/api.js"

const ArtistProvider = ({children}) => {

    const[artist,setArtist] = useState(null)

    const[loading,setLoading] = useState(true)

    async function signUpArtist(artist){
        const res = await registerArtistAxios(artist)
        setArtist(res.data.artist)
        return res.data
    }

    async function verifyArtist(token){
        const res = await verifyArtistAxios(token)
        setArtist(res.data)
        return res.data
    }
    
    async function signInArtist(artist){
        const res = await loginArtistAxios(artist)
        setArtist(res.data.artist)
        return res.data
    }

    async function fetchArtist(){
        try {
            const res = await dashboardArtistAxios();
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

    async function uploadSong(song){
        const res = await uploadSongAxios(song)
        return res.data
    }

    async function mySongs(){
        const res = await mySongsAxios()
        return res.data
    }

    async function deleteSong(idSong){
        const res = await deleteSongAxios(idSong)
        return res
    }

    async function logout(){
        const res = await logoutArtist()
        setArtist(null)
        return res
    }

    return (
        <ArtistContext.Provider value={{artist,signInArtist,signUpArtist,fetchArtist,logout,loading,uploadSong,deleteSong,mySongs, verifyArtist}}>
            {children}
        </ArtistContext.Provider>
    )
}

export default ArtistProvider