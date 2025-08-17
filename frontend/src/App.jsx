import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginOptionPage from "./pages/LoginOptionPage";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import DashboardUser from "./pages/DashboardUser";
import SecurityRoutesUser from "./components/SecurityRoutesUser";
import LoginArtist from "./pages/LoginArtist";
import RegisterArtist from "./pages/RegisterArtist";
import About from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/sobreNosotros" element={<About/>}/>
        <Route path="/ingresar" element={<LoginOptionPage/>} />
        <Route path="/loginUsuario" element={<LoginUser/>} />
        <Route path="/registroUsuario" element={<RegisterUser/>} />
        <Route path="/loginArtista" element={<LoginArtist/>} />
        <Route path="/registroArtista" element={<RegisterArtist/>} />
        <Route path="/usuario" element={
          <SecurityRoutesUser>
            <DashboardUser/>
          </SecurityRoutesUser>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
