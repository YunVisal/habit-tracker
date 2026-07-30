import type { Habit } from "./type";
import { createContext } from "react";

type HabitContextState = {
    habits: Habit[] | undefined,
    loading: boolean,
    fetchHabits: () => Promise<void>
}

export const HabitContext = createContext<HabitContextState>({ habits: [], loading: true, fetchHabits: async () => { } });