import Home from "@pages/home";
import HotelDetails from "@pages/hotel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          {/*
        <Route path="/cities/:id" element={<CityDetails />} />
        <Route path="/countries/:id" element={<CountryDetails />} />
        <Route path="*" element={<NotFound />} />
 */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
