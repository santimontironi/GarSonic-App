import axios from 'axios'

const URL_BACKEND = 'http://localhost:3000'

export function registerUserAxios(formData){
    return axios.post(`${URL_BACKEND}/register`,formData,{
        withCredentials:true,
        "Content-Type": "multipart/form-data"
    })
}

export function loginUserAxios(formData){
    return axios.post(`${URL_BACKEND}/login`,formData,{
        withCredentials:true
    })
}

export function logoutUser(){
    return axios.post(`${URL_BACKEND}/logout`,{
        withCredentials:true
    })
}

export function dashboardUser(){
    return axios.get(`${URL_BACKEND}/dashboardUser`,{
        withCredentials: true
    })
}