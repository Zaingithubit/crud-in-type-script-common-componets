import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import Listing from "./pages/Listing";
import Navbar from "./components/NaveBar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addvehicle" element={<AddVehicle />} />
        <Route path="/addvehicle/:id" element={<AddVehicle />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
