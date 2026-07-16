import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { LOGIN_PATH } from "./route";

const ProtectedRoute = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <Navigate to={LOGIN_PATH} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
