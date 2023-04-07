import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  // LOGIN TO VERIFY USER
  const token = useSelector((store) => store.user.token);
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
