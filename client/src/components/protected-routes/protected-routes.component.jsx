import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  // LOGIN TO VERIFY USER
  const token = useSelector((store) => store.user.token);
  const access_token = useSelector((store) => store.user.access_token)
  if (!token || !access_token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
