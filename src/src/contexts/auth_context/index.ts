import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

type AuthContextState = {
    user: User | undefined,
    loading: boolean
}

export const AuthContext = createContext<AuthContextState>({ user: undefined, loading: true });