import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginOptionPage from "./pages/LoginOptionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/ingresar" element={<LoginOptionPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
