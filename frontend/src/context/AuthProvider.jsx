import { registerUserAxios } from "../api/api.js";
import { useState } from "react";
import { authContext } from "./AuthContext.jsx";

export const AuthProvider = ({children}) => {

    const[user,setUser] = useState(null)

    async function signUpUser(user){
        const res = await registerUserAxios(user)
        setUser(res.data)
        return res.data
    }

    return(
        <authContext.Provider value={{
            signUpUser,
            user
        }}>
            {children}
        </authContext.Provider>
    )
}
