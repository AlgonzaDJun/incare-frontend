import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import PemesananPage from "./pages/PemesananPage/PemesananPage";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/booking" element={<PemesananPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
