import axios from 'axios'

const URL_BACKEND = 'http://localhost:3000'

export function registerUserAxios(user){
    return axios.post(`${URL_BACKEND}/register`,user,{
        withCredentials:true
    })
}

export function loginUserAxios(user){
    return axios.post(`${URL_BACKEND}/login`,user,{
        withCredentials:true
    })
}

export function dashboardUser(){
    return axios.get(`${URL_BACKEND}/dashboardUser`,{
        withCredentials: true
    })
}