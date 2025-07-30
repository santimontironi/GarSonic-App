import { UseAuth } from "../context/useAuth.js";
import { Navigate } from "react-router-dom";

const SecurityRoutes = ({children}) => {

    const {user} = UseAuth()

    if(!user){
        return <Navigate to="/loginUsuario"/>
    }

    return (
        children
    )
}

export default SecurityRoutes