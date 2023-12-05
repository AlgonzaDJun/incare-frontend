import { Navigate, Outlet } from "react-router-dom";

const KonselorRoute = () => {
  let role = localStorage.getItem("role");
  return role === "konselor" ? <Outlet /> : <Navigate to="/login" />;
};

export default KonselorRoute;
