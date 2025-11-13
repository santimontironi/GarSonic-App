import Loader from "../layout/Loader.jsx";
import { UseContextArtist } from "../../context/artist/UseContextArtist.js"
import { Navigate } from "react-router-dom"

const SecurityRoutesArtist = ({children}) => {

    const {artist, loadingDashboardArtist} = UseContextArtist()

    if(loadingDashboardArtist){
        return <Loader/>
    }

    if(!artist){
        return <Navigate to='/loginArtista'/>
    }

    return (
        children
    )
}

export default SecurityRoutesArtist