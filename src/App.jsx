import Community from "./page/Community";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import PemesananPage from "./pages/PemesananPage/PemesananPage";
import DetailConselor from "./pages/PemesananPage/DetailConselor";
import CheckoutPage from "./pages/PemesananPage/CheckoutPage";
import Faq from "./pages/Faq/Faq";
import LandingPage from "./pages/LandingPage/LandingPage";
import PrivateRoute from "./pages/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:kodeBooking" element={<HistoryPage />} />
          <Route path="/booking" element={<PemesananPage />} />
          <Route path="/booking/:idKonselor" element={<DetailConselor />} />
          <Route path="/payment/:idbooking" element={<CheckoutPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/faq" element={<Faq />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
