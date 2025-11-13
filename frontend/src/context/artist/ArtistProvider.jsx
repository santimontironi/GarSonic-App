import { ArtistContext } from "./ArtistContext"
import { useEffect, useState } from "react"
import { loginArtistAxios, registerArtistAxios, dashboardArtistAxios, uploadSongAxios, mySongsAxios, deleteSongAxios, logoutArtist, verifyArtistAxios } from "../../api/api.js"

const ArtistProvider = ({ children }) => {

    const [artist, setArtist] = useState(null)

    const [songs, setSongs] = useState([])

    const [loadingDashboardArtist, setLoadingDashboardArtist] = useState(true)

    const [loadingSongs, setLoadingSongs] = useState(true)

    const [loadingAddSong, setLoadingAddSong] = useState(false)

    async function signUpArtist(artist) {
        const res = await registerArtistAxios(artist)
        setArtist(res.data.artist)
        return res.data
    }

    async function verifyArtist(token) {
        const res = await verifyArtistAxios(token)
        setArtist(res.data)
        return res.data
    }

    async function signInArtist(artist) {
        const res = await loginArtistAxios(artist)
        setArtist(res.data.artist)
        return res.data
    }

    useEffect(() => {
        async function fetchArtist() {
            setLoadingDashboardArtist(true)
            try {
                const res = await dashboardArtistAxios();
                if (res.data.authenticated === false) {
                    setArtist(null)
                } else {
                    setArtist(res.data.artist);
                }
                return res
            } catch (error) {
                setArtist(null);
            }
            finally {
                setTimeout(function () {
                    setLoadingDashboardArtist(false)
                }, 1500)
            }
        }

        fetchArtist()
    }, [])


    async function uploadSong(song) {
        setLoadingAddSong(true)
        try {
            const res = await uploadSongAxios(song)
            const newSong = res.data.newSong
            setSongs((prev) => [...prev, newSong])
            return res.data
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setLoadingAddSong(false)
            }, 1500)
        }
    }

    useEffect(() => {

        async function mySongs() {
            setLoadingSongs(true)
            try {
                const res = await mySongsAxios()
                setSongs(res.data.songs)
                return res.data
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setTimeout(() => {
                    setLoadingSongs(false)
                }, 2000)
            }
        }

        mySongs()
    }, [])


    async function deleteSong(idSong) {
        setLoadingSongs(true)
        try {
            const res = await deleteSongAxios(idSong)
            return res
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setLoadingSongs(false)
            }, 1500)
        }
    }

    async function logout() {
        const res = await logoutArtist()
        setArtist(null)
        return res
    }

    return (
        <ArtistContext.Provider value={{ artist, signInArtist, signUpArtist, logout, loadingDashboardArtist, uploadSong, deleteSong, songs, loadingSongs, verifyArtist, loadingAddSong }}>
            {children}
        </ArtistContext.Provider>
    )
}

export default ArtistProvider