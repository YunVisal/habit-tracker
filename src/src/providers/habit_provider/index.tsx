import { useEffect, useState } from "react"
import type { Habit } from "../../contexts/habit_context/type"
import { HabitContext } from "../../contexts/habit_context";
import { supabase } from "../../utils/supabase";

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('habits').select().order('created_at', { ascending: true });
        if (!error) {
            setHabits(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchHabits();
    }, []);

    return <HabitContext value={{ habits, loading, fetchHabits }}>
        {children}
    </HabitContext>
}

export default HabitProvider;