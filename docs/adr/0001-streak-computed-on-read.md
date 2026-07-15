# Streak computed on read, not stored

A habit's current [[Streak]] is derived on the client from the habit's recent [[Check-in]] rows at read time, rather than kept in a `current_streak` column that is bumped on check-in and reset on undo/miss.

## Why

The streak uses a "grace day" rule: the run is considered alive if it ends at *today or yesterday*. This means a streak must silently reset when a full day passes with no check-in — an event triggered by *time*, not by any user action. A stored counter would therefore have to be recomputed on read anyway to stay correct across day boundaries, so storing it buys nothing but a second source of truth that can drift out of agreement with the check-in rows. Check-in rows are the single source of truth; the streak is a pure function of them.

## Consequences

- Dashboard load fetches a bounded window of recent check-ins per habit (~60–90 days is far more than any realistic current streak) and computes streaks in JS.
- No background job or midnight cron is needed for grace-day resets — they fall out of the read-time computation.
- If streaks ever grow past the fetch window, that window becomes a v2 concern; the model itself does not change.
