import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";

type AuthState = {
    session: Session | null;
    loading: boolean;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export { AuthContext };
export type { AuthState };
