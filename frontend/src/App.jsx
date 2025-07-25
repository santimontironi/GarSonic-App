import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StartPage from "./pages/StartPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/comenzar" element={<StartPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
