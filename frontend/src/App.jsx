import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages"
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
