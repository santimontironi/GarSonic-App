import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import LoginOptionPage from "./pages/templates/LoginOptionPage";
import LoginUser from "./pages/user/LoginUser";
import RegisterUser from "./pages/user/RegisterUser";
import DashboardUser from "./pages/user/DashboardUser";
import SecurityRoutesUser from "./components/auth/SecurityRoutesUser";
import LoginArtist from "./pages/artist/LoginArtist";
import RegisterArtist from "./pages/artist/RegisterArtist";
import DashboardArtist from "./pages/artist/DashboardArtist";
import SecurityRoutesArtist from "./components/auth/SecurityRoutesArtist";
import UploadSong from "./pages/artist/UploadSong";
import MySongs from "./pages/artist/MySongs";
import CreatePlaylist from "./pages/user/CreatePlaylist";
import MyPlaylists from "./pages/user/MyPlaylists";
import VerifyArtist from "./pages/artist/VerifyArtist";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/ingresar" element={<LoginOptionPage/>} />
        <Route path="/loginUsuario" element={<LoginUser/>} />
        <Route path="/registroUsuario" element={<RegisterUser/>} />
        <Route path="/loginArtista" element={<LoginArtist/>} />
        <Route path="/registroArtista" element={<RegisterArtist/>} />
        <Route path="/verify/:token" element={<VerifyArtist />} />
        <Route path="/usuario" element={
          <SecurityRoutesUser>
            <DashboardUser/>
          </SecurityRoutesUser>
        } />
        <Route path="/artista" element={
          <SecurityRoutesArtist>
            <DashboardArtist/>
          </SecurityRoutesArtist>
        } />
        <Route path="/artista/subirCancion" element={
          <SecurityRoutesArtist>
            <UploadSong/>
          </SecurityRoutesArtist>
        } />
        <Route path="/artista/misCanciones" element={
          <SecurityRoutesArtist>
            <MySongs/>
          </SecurityRoutesArtist>
        } />
        <Route path="/usuario/nuevaPlaylist" element={
          <SecurityRoutesUser>
            <CreatePlaylist/>
          </SecurityRoutesUser>
        } />
        <Route path="/usuario/misPlaylists" element={
          <SecurityRoutesUser>
            <MyPlaylists/>
          </SecurityRoutesUser>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
