import { registerUserAxios, loginUserAxios, logoutUser, dashboardUser, addPlaylist, getPlaylists, deletePlaylistAxios, searchSongs, addSongToPlaylist, deleteSongPlaylistAxios } from "../../api/api.js";
import { useState, useEffect } from "react";
import { ContextUser } from "./UserContext.jsx";


export const UserProvider = ({children}) => {

    const[user,setUser] = useState(null)
    const[loadingDashboardUser,setLoadingDashboardUser] = useState(true)

    async function signUpUser(user){
        const res = await registerUserAxios(user)
        setUser(res.data.user)
        return res.data
    }

    async function signInUser(user){
        const res = await loginUserAxios(user)
        setUser(res.data.user)
        return res.data
    }

    async function logout(){
        const res = await logoutUser()
        setUser(null)
        return res
    }

    async function fetchUser() {
        setLoadingDashboardUser(true)
        try {
            const res = await dashboardUser();
            if(res.data.authenticated === false){
                setUser(null)
            }else{
                setUser(res.data.user);
            }
            return res
        } catch (error) {
            setUser(null);
        }
        finally{
            setTimeout(function() {
                setLoadingDashboardUser(false)
            }, 1500)
        }
    }

    //se pone en un useffect para que se ejecute cuando se monte el componente
    useEffect(() => {
        fetchUser();
    }, []);

    async function createPlaylist(formData) {
        const res = await addPlaylist(formData);
        return res
    }

    async function getAllPlaylists() {
        const res = await getPlaylists();
        return res
    }

    async function deletePlaylist(playlistId) {
        const res = await deletePlaylistAxios(playlistId);
        return res;
    }

    async function search(q) {
        const res = await searchSongs(q);
        return res;
    }

    async function addToPlaylist(playlistId, songId) {
        const res = await addSongToPlaylist(playlistId, songId);
        return res;
    }

    async function deleteSongPlaylist(playlistId, songId) {
        const res = await deleteSongPlaylistAxios(playlistId, songId);
        return res;
    }

    return(
        <ContextUser.Provider value={{
            signUpUser,
            signInUser,
            fetchUser,
            logout,
            user,
            loadingDashboardUser,
            createPlaylist,
            getAllPlaylists,
            search,
            deletePlaylist,
            addToPlaylist,
            deleteSongPlaylist
        }}>
            {children}
        </ContextUser.Provider>
    )
}
