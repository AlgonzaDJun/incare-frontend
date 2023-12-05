import Login from "./pages/Authentikasi/Login";
import Register from "./pages/Authentikasi/Register";
import PageKuis from "./pages/MiniKuis/PageKuis";
import Quiz from "./pages/MiniKuis/Quiz";
import FormConselor from "./pages/Conselor/FormConselor";
import ScheduleTable from "./pages/Conselor/ScheduleTable";
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
import ChatPage from "./pages/ChatPage/ChatPage";
import ChatKonseling from "./pages_konselor/ChatPage/ChatKonseling";
import HistoryKonselorPage from "./pages_konselor/HistoryPage/HistoryKonselorPage";

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
          <Route path="/quizpage" element={<PageKuis />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/conselor" element={<FormConselor />} />
        <Route path="/schedule" element={<ScheduleTable />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:idKonselor" element={<ChatPage />} />

        {/* KONSELOR PAGE */}
        <Route path="/chat-konseling" element={<ChatKonseling />} />
        <Route path="/chat-konseling/:idUser" element={<ChatKonseling />} />
        <Route path="/history-konselor" element={<HistoryKonselorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
