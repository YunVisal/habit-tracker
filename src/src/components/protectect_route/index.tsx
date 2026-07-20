import { Outlet } from "react-router";
import AuthProvider from "../providers/auth_provider";
import { useAuth } from "../../hooks/use_auth";

const ProtectedRoute = () => {
    return <AuthProvider>
        <ProtectedRouteContent />
    </AuthProvider>
}

const ProtectedRouteContent = () => {
    const { user, loading } = useAuth();

    return loading ? <p>Loading...</p> : user ? <Outlet /> : <p>Unauthorized</p>
}

export default ProtectedRoute;