import { registerUserAxios, loginUserAxios, logoutUser, dashboardUser } from "../api/api.js";
import { useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const AuthProvider = ({children}) => {

    const[user,setUser] = useState(null)

    async function signUpUser(user){
        const res = await registerUserAxios(user)
        setUser(res.data)
        return res.data
    }

    async function signInUser(user){
        const res = await loginUserAxios(user)
        setUser(res.data)
        return res.data
    }

    async function fetchUser(){
        const res = await dashboardUser()
        setUser(res.data)
        return res
    }

    async function logout(){
        const res = await logoutUser()
        setUser(null)
        return res
    }

    return(
        <AuthContext.Provider value={{
            signUpUser,
            signInUser,
            fetchUser,
            logout,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
