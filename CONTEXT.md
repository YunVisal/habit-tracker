# Personal Habit Tracker

A web app where a user creates daily habits, checks them off each day, and tracks consecutive-day streaks. Learning project (React + Supabase).

## Language

**Day**:
A calendar day (midnight-to-midnight) in the *user's local timezone*, computed client-side from the browser clock. All "today" and "consecutive day" reasoning is relative to this, not UTC or the server clock.
_Avoid_: 24-hour period, UTC day

**User**:
An authenticated owner of habits, identified by Supabase Auth (`auth.uid()`). Every [[Habit]] and [[Check-in]] belongs to exactly one User, enforced by Row Level Security. Sign-up logs the User straight in (no email confirmation).
_Avoid_: Account, member, profile

**Habit**:
A recurring daily activity a user wants to perform, with a name (non-empty; duplicates allowed) and optional description. Deleting a Habit hard-deletes it and cascades its [[Check-in]]s — irreversible, no archive.
_Avoid_: Task, goal, todo

**Check-in**:
A record that a habit was completed on a specific [[Day]]. Modeled as a single row per (habit, day); its *presence* means "done", its *absence* means "not done". "Undo" hard-deletes the row. Only ever created for the current day — no backfilling past days.
_Avoid_: Log, entry, completion mark, tick

**Streak** (current streak):
The length of the unbroken run of consecutive completed [[Day]]s ending at **either today or yesterday** (a "grace day": missing *today so far* does not break the streak — it breaks only once a whole day passes with no [[Check-in]]). If today is done, the run includes today. If neither today nor yesterday is done, the streak is 0. A habit created today with no check-in has streak 0 (no history to break).
_Avoid_: Run, chain, consecutive count
