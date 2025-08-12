import { UseAuth } from "../context/useAuth.js";
import { Navigate } from "react-router-dom";
import Loader from "./Loader.jsx";

const SecurityRoutes = ({children}) => {

    const {user, loading} = UseAuth()

    // Si todavía está verificando, no redirigir
    if(loading) {
        return <Loader/>
    }

    // Una vez que terminó de verificar, si no hay usuario, redirigir al login
    if(!user){
        return <Navigate to="/loginUsuario"/>
    }

    // Si hay usuario, mostrar el contenido
    return (
        children
    )
}

export default SecurityRoutes