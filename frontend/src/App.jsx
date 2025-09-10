import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LoginOptionPage from "./pages/LoginOptionPage";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import DashboardUser from "./pages/DashboardUser";
import SecurityRoutesUser from "./components/SecurityRoutesUser";
import LoginArtist from "./pages/LoginArtist";
import RegisterArtist from "./pages/RegisterArtist";
import DashboardArtist from "./pages/DashboardArtist";
import SecurityRoutesArtist from "./components/SecurityRoutesArtist";
import UploadSong from "./pages/UploadSong";
import About from "./pages/About";
import MySongs from "./pages/MySongs";
import CreatePlaylist from "./pages/CreatePlaylist";
import MyPlaylists from "./pages/MyPlaylists";
import VerifyArtist from "./pages/VerifyArtist";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/nosotros" element={<About/>}/>
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
