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

export function dashboardArtist(){
    return axios.get(`${URL_BACKEND}/dashboardArtist`,{
        withCredentials: true
    })
}

export function logoutArtist(){
    return axios.post(`${URL_BACKEND}/logoutArtist`, {}, {
        withCredentials:true
    })
}