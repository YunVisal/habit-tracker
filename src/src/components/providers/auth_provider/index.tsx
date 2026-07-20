import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase";
import type { User } from "@supabase/supabase-js";
import { AuthContext } from "../../../contexts/auth_context";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserSession = async () => {
            setLoading(true);
            const { data: { session }, error } = await supabase.auth.getSession();
            setUser(session?.user);
            setLoading(false);
        }

        getUserSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_OUT") {
                setUser(undefined);
            }
            else if (session) {
                setUser(session.user);
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, []);

    return <AuthContext value={{ user, loading }}>
        {children}
    </AuthContext>
}

export default AuthProvider;