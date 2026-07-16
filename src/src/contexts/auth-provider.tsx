import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { AuthContext } from "./auth-context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => data.subscription.unsubscribe();
    }, []);

    const value = useMemo(() => ({ session, loading }), [session, loading]);

    return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;
