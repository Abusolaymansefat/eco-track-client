import { Navigate, useLocation } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import useAdmin from "../../../hooks/useAdmin";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
