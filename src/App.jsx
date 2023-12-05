import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import PemesananPage from "./pages/PemesananPage/PemesananPage";
import DetailConselor from "./pages/PemesananPage/DetailConselor";
import CheckoutPage from "./pages/PemesananPage/CheckoutPage";

import LandingPage from "./pages/LandingPage/LandingPage";
import PrivateRoute from "./pages/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import PertemuanKonselor from "./pages/PertemuanKonselor/PertemuanKonselor";
import Community from "./pages/Community/community";
import Profile from "./pages/Profile/Profile";

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
          <Route path="/meet-conselor" element={<PertemuanKonselor />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
