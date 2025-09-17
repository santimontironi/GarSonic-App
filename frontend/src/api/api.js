import axios from 'axios'

const URL_BACKEND = import.meta.env.VITE_BACKEND

export function registerUserAxios(formData){
    return axios.post(`${URL_BACKEND}/register`,formData,{
        withCredentials:true,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export function loginUserAxios(formData){
    return axios.post(`${URL_BACKEND}/login`,formData,{
        withCredentials:true
    })
}

export function uploadSongAxios(formData){
    return axios.post(`${URL_BACKEND}/uploadSong`,formData,{
        withCredentials:true,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export function logoutUser(){
    return axios.post(`${URL_BACKEND}/logout`, {}, {
        withCredentials:true
    })
}

export function dashboardUser(){
    return axios.get(`${URL_BACKEND}/dashboardUser`,{
        withCredentials: true
    })
}

export function addPlaylist(formData){
    return axios.post(`${URL_BACKEND}/createPlaylist`,formData,{
        withCredentials:true,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export function getPlaylists(){
    return axios.get(`${URL_BACKEND}/playlists`,{
        withCredentials: true
    })
}

export function searchSongs(q){
    return axios.get(`${URL_BACKEND}/searchSongs`,{
        withCredentials: true,
        params: { q }
    })
}

export function addSongToPlaylist(playlistId, songId){
    return axios.post(`${URL_BACKEND}/addSongToPlaylist/${playlistId}/${songId}`, {}, {
        withCredentials: true
    })
}

export function deleteSongPlaylistAxios(playlistId, songId){
    return axios.delete(`${URL_BACKEND}/deleteSongPlaylist/${playlistId}/${songId}`, {
        withCredentials: true
    })
}


export function loginArtistAxios(formData){
    return axios.post(`${URL_BACKEND}/loginArtist`,formData,{
        withCredentials:true
    })
}

export function registerArtistAxios(formData){
    return axios.post(`${URL_BACKEND}/registerArtist`,formData,{
        withCredentials:true,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export function verifyArtistAxios(token) {
    return axios.get(`${URL_BACKEND}/verify/${token}`);
}

export function dashboardArtistAxios(){
    return axios.get(`${URL_BACKEND}/dashboardArtist`,{
        withCredentials: true
    })
}

export function mySongsAxios(){
    return axios.get(`${URL_BACKEND}/mySongs`,{
        withCredentials: true
    })
}

export function deleteSongAxios(idSong){
    return axios.put(`${URL_BACKEND}/deleteSong/${idSong}`,{},{
        withCredentials: true
    })
}

export function deletePlaylistAxios(playlistId){
    return axios.delete(`${URL_BACKEND}/deletePlaylist/${playlistId}`,{
        withCredentials: true
    })
}

export function logoutArtist(){
    return axios.post(`${URL_BACKEND}/logoutArtist`, {}, {
        withCredentials:true
    })
}