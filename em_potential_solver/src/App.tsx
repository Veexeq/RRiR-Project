import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Theory from "./components/theory/Theory";
import TopScroller from "./components/util/TopScroller";

function App() {

  return (
    <BrowserRouter>
      {/* TopScroller is an util that scrolls to the top of
      the page after changing pages */}
      <TopScroller />
      <Navbar />

      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/theory" element={<Theory />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App;
