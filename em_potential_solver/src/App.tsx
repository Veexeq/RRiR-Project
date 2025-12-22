import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Theory from "./components/theory/Theory";

function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/theory" element={<Theory />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App;
