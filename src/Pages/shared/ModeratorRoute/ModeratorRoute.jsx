import { Navigate, useLocation } from "react-router";
import useAuth from "../../../hooks/UseAuth";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const isModerator = user?.role === "moderator";
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (user && isModerator) return children;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ModeratorRoute;
