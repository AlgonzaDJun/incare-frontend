import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import PemesananPage from "./pages/PemesananPage/PemesananPage";
import DetailConselor from "./pages/PemesananPage/DetailConselor";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/booking" element={<PemesananPage />} />
        <Route path="/booking/:idKonselor" element={<DetailConselor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
