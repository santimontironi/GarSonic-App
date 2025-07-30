import { registerUserAxios, loginUserAxios } from "../api/api.js";
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

    async function logout(){
        return setUser(null)
    }

    return(
        <AuthContext.Provider value={{
            signUpUser,
            signInUser,
            logout,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
