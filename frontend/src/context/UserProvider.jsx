import { registerUserAxios, loginUserAxios, logoutUser, dashboardUser } from "../api/api.js";
import { useState, useEffect } from "react";
import { ContextUser } from "./UserContext.jsx";


export const UserProvider = ({children}) => {

    const[user,setUser] = useState(null)
    const[loading,setLoading] = useState(true)

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
            if(res.data.authenticated === false){
                setUser(null)
            }else{
                console.log(res.data)
                setUser(res.data.user);
            }
            return res
        } catch (error) {
            setUser(null);
        }
        finally{
            setTimeout(function() {
                setLoading(false)
            }, 1500)
        }
    }

    //se pone en un useffect para que se ejecute cuando se monte el componente
    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <ContextUser.Provider value={{
            signUpUser,
            signInUser,
            fetchUser,
            logout,
            user,
            loading
        }}>
            {children}
        </ContextUser.Provider>
    )
}
