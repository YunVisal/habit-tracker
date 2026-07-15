# Project: Personal Habit Tracker

## Overview
A web app where a user can create daily habits, check them off each day, and track their streaks. Built as a learning project to refresh React skills and learn Supabase.

## Tech Stack
- **Frontend:** React (Vite), plain CSS or Tailwind — keep it simple
- **Backend:** Supabase (Auth + Postgres + Row Level Security)
- **No extra state management libraries** — use React hooks only (useState, useEffect, custom hooks)

## Core Features (MVP)
1. **Auth:** Email/password sign up, log in, log out using Supabase Auth
2. **Habit CRUD:** Logged-in users can create, rename, and delete habits (name + optional description)
3. **Daily check-in:** Each habit can be marked done/undone for today
4. **Streak counter:** Show current streak (consecutive days completed) for each habit
5. **Habit list view:** Dashboard showing all habits with today's status and streak


## Non-Goals (for now)
- No social features, reminders, or mobile app
- No calendar heatmap yet (planned for v2)