import type { Habit } from "../contexts/habit_context/type";
import { convertToYYYYMMDD } from "./date";

// check_ins.day arrives from Supabase as a "YYYY-MM-DD" string, so accept both shapes.
const toDayKey = (day: Date | string) =>
    typeof day === "string" ? day : convertToYYYYMMDD(day);

const parseDayKey = (dayKey: string) => {
    const [year, month, day] = dayKey.split("-").map(Number);
    return new Date(year, month - 1, day);
}

const addDays = (date: Date, days: number) => {
    const shifted = new Date(date);
    shifted.setDate(shifted.getDate() + days);
    return shifted;
}

/**
 * Walks backwards one day at a time from the anchor day and stops at the first
 * day without a check-in. The anchor is today when it is already checked in,
 * otherwise yesterday (so a streak is not broken before the day is over).
 */
const computeStreak = (habit: Habit, today: Date) => {
    const checkedInDays = new Set(habit.check_ins.map(checkIn => toDayKey(checkIn.day)));

    const yesterday = addDays(today, -1);
    let cursor: Date;
    if (checkedInDays.has(convertToYYYYMMDD(today))) {
        cursor = today;
    }
    else if (checkedInDays.has(convertToYYYYMMDD(yesterday))) {
        cursor = yesterday;
    }
    else {
        return 0;
    }

    let streakCount = 0;
    while (checkedInDays.has(convertToYYYYMMDD(cursor))) {
        streakCount += 1;
        cursor = addDays(cursor, -1);

        if (streakCount == 90) {
            break; // the habit can have only 3 months record of recent check in, due to perfermance improvment
        }
    }

    return streakCount;
}

/**
 * Same result as computeStreak, reached the other way around: sort the check-in
 * days newest first and count how many of them match the expected consecutive
 * run. Scans the check-ins once instead of probing a set day by day.
 */
const computeStreakFromSortedDays = (habit: Habit, today: Date) => {
    const days = Array.from(new Set(habit.check_ins.map(checkIn => toDayKey(checkIn.day))))
        .sort()
        .reverse();

    const todayKey = convertToYYYYMMDD(today);
    const yesterdayKey = convertToYYYYMMDD(addDays(today, -1));

    // Skip check-ins dated in the future, then require the run to start today or yesterday.
    const startIndex = days.findIndex(day => day <= todayKey);
    if (startIndex === -1) {
        return 0;
    }
    if (days[startIndex] !== todayKey && days[startIndex] !== yesterdayKey) {
        return 0;
    }

    let streakCount = 0;
    let expectedKey = days[startIndex];
    for (const day of days.slice(startIndex)) {
        if (day !== expectedKey) {
            break;
        }
        streakCount += 1;
        expectedKey = convertToYYYYMMDD(addDays(parseDayKey(day), -1));
    }

    return streakCount;
}

const isCompleteToday = (habit: Habit) => {
    const todayInYYYYMMDDFormat = convertToYYYYMMDD(new Date());
    return habit.check_ins.some(checkIn => toDayKey(checkIn.day) === todayInYYYYMMDDFormat);
}

export { computeStreak, computeStreakFromSortedDays, isCompleteToday }
