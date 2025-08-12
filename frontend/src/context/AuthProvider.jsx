import { registerUserAxios, loginUserAxios, logoutUser, dashboardUser } from "../api/api.js";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";


export const AuthProvider = ({children}) => {

    const[user,setUser] = useState(null)
    const[loading, setLoading] = useState(true)

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
        try {
            const res = await dashboardUser();
            setUser(res.data.user);
            return res;
        } catch (error) {
            setUser(null);
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    //se pone en un useffect para que se ejecute cuando se monte el componente
    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <AuthContext.Provider value={{
            signUpUser,
            signInUser,
            fetchUser,
            logout,
            user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
