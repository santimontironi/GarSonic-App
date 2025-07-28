import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginOptionPage from "./pages/LoginOptionPage";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import DashboardUser from "./pages/DashboardUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/ingresar" element={<LoginOptionPage/>} />
        <Route path="/loginUsuario" element={<LoginUser/>} />
        <Route path="/registroUsuario" element={<RegisterUser/>} />
        <Route path="/usuario" element={<DashboardUser/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
