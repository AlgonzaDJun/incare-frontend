import Community from "./page/Community";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import PemesananPage from "./pages/PemesananPage/PemesananPage";
import DetailConselor from "./pages/PemesananPage/DetailConselor";
import CheckoutPage from "./pages/PemesananPage/CheckoutPage";
import Faq from "./pages/Faq/Faq";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:kodeBooking" element={<HistoryPage />} />
        <Route path="/booking" element={<PemesananPage />} />
        <Route path="/booking/:idKonselor" element={<DetailConselor />} />
        <Route path="/payment/:idbooking" element={<CheckoutPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
