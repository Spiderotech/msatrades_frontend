import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const admin = useSelector((state) => state.admin.value);

  const isLoggedIn = admin?.jwt && admin?.jwt !== " ";
  console.log(isLoggedIn);
  

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
