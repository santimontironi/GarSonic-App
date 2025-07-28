import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginOptionPage from "./pages/LoginOptionPage";
import LoginUser from "./pages/LoginUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/ingresar" element={<LoginOptionPage/>} />
        <Route path="/loginUsuario" element={<LoginUser/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
