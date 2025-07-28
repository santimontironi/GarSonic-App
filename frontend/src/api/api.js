import axios from 'axios'

const URL_BACKEND = 'http://localhost:3000'

export function registerUserAxios(user){
    return axios.post(`${URL_BACKEND}/register`,user)
}

export function loginUserAxios(user){
    return axios.post(`${URL_BACKEND}/login`,user)
}
