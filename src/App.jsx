
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Authentikasi/Login";
import Register from "./pages/Authentikasi/Register";
import PageKuis from "./pages/MiniKuis/PageKuis";
import Quiz from "./pages/MiniKuis/Quiz";
import FormConselor from "./pages/Conselor/FormConselor";
import ScheduleTable from "./pages/Conselor/ScheduleTable";



function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/quizpage" element={<PageKuis/>}/>
            <Route path="/quiz" element={<Quiz/>} />
            <Route path="/conselor" element={<FormConselor/>} />
            <Route path="/schedule" element={<ScheduleTable/>} />
        </Routes> 
    </Router>
  )
}

export default App;
