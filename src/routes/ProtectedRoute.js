import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Layout from "../component/utils/Layout";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
