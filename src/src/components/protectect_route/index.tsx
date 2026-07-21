import { Outlet } from "react-router";
import AuthProvider from "../../providers/auth_provider";
import { useAuth } from "../../hooks/use_auth";
import AppLayout from "../app_layout";

const ProtectedRoute = () => {
    return <AuthProvider>
        <ProtectedRouteContent />
    </AuthProvider>
}

const ProtectedRouteContent = () => {
    const { user, loading } = useAuth();

    return loading ? <p>Loading...</p> : user ? <AppLayout><Outlet /></AppLayout> : <p>Unauthorized</p>
}

export default ProtectedRoute;