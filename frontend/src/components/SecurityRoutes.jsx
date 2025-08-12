import { UseAuth } from "../context/useAuth.js";
import { Navigate } from "react-router-dom";

const SecurityRoutes = ({children}) => {

    const {user, loading} = UseAuth()

    // Si todavía está verificando, no redirigir
    if(loading) {
        return null; // No mostrar nada mientras verifica
    }

    // Una vez que terminó de verificar, si no hay usuario, redirigir al login
    if(!user){
        return <Navigate to="/loginUsuario"/>
    }

    return (
        children
    )
}

export default SecurityRoutes