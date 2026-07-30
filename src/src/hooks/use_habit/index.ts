import { useContext } from "react";
import { HabitContext } from "../../contexts/habit_context";

export const useHabit = () => {
    const context = useContext(HabitContext);
    return context;
}