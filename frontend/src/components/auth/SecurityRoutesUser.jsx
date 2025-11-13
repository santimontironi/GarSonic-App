import { UseContextUser } from "../../context/user/UseContextUser.js"
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader.jsx";

const SecurityRoutesUser = ({children}) => {

    const {user, loadingDashboardUser} = UseContextUser()

    // Si todavía está verificando, no redirigir
    if(loadingDashboardUser) {
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

export default SecurityRoutesUser