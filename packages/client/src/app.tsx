import Home from "@pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*
               <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/cities/:id" element={<CityDetails />} />
        <Route path="/countries/:id" element={<CountryDetails />} />
        <Route path="*" element={<NotFound />} />
 */}
      </Routes>
    </Router>
  );
}

export default App;
