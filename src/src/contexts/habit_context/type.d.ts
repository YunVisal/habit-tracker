interface Habit {
    id: number,
    user_id: string,
    name: string,
    description: string,
    created_at: Date,
    check_ins: {
        id: number
        day: Date
    }[]
}

export {
    Habit
}