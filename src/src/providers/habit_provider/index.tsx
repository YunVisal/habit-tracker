import { useEffect, useState } from "react"
import type { Habit } from "../../contexts/habit_context/type"
import { HabitContext } from "../../contexts/habit_context";
import { supabase } from "../../utils/supabase";
import { convertToYYYYMMDD } from "../../utils/date";

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('habits')
            .select(`
                id,
                user_id,
                name,
                description,
                created_at,
                check_ins(id, day)    
            `)
            .order('created_at', { ascending: true })
            .order('day', { referencedTable: 'check_ins', ascending: false })
            .limit(90, { referencedTable: 'check_ins' })
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