import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return context;
}

export { useAuth };
