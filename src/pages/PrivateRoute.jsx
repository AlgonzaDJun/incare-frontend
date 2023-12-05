import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  return userId || token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
