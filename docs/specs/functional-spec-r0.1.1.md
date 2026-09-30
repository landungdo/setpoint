# Functional Specification — Setpoint R0.1.1

Status: As built
Date: 30/09/2026
Source of truth: app/index.html
Supported languages: Vietnamese and English
Supported units: kg and lb

## 1. Scope

R0.1.1 is a local-first training log for people who lift and play racket sports. It supports:

- Three-step onboarding.
- Workout templates and weekday schedules.
- Free workouts.
- One-tap set confirmation with double-progression suggestions.
- Quick set entry.
- Rest timer.
- PR detection by estimated 1RM.
- Court-session logging using minutes × RPE.
- History and deletion.
- JSON backup and restore.
- Optional private Claude account backup.
- Product metrics for dogfooding.

The release does not yet include progress charts, weekly review, CSV export, bodyweight history, fixed court schedules, court-to-gym warnings, nutrition, gym profiles, PWA installation, accounts, wearables or payments.

## 2. Onboarding

1. Choose Vietnamese or English and kg or lb.
2. Choose sports played outside the gym, or select gym only.
3. Optionally enter bodyweight, height and birth year.
4. Completing step 3 sets onboarding as complete and opens Today.

All onboarding values persist immediately.

## 3. Plans

A plan contains a name, zero or more weekdays and one or more exercises. Each exercise contains:

- Planned sets: 1–10.
- Minimum and maximum reps.
- Weight increment stored internally in kg.
- Rest time: 15–600 seconds.

Users may create, edit, reorder and delete plans. Deleting a plan does not delete session history.

The Push/Pull/Legs sample creates three plans. Default increments are:

| Exercise category | kg | lb |
|---|---:|---:|
| Standard upper-body | 2.5 | 5 |
| Heavy/lower-body | 5 | 10 |
| Small isolation | 1 | 2.5 |

## 4. Workout flow

Starting a plan creates an active workout containing its exercise configuration and suggestions. Starting a free workout creates an empty active workout.

For each exercise:

- The latest historical working weight is shown.
- If every planned set at that weight reached the top of the target range, the next suggestion adds one increment and resets reps to the minimum.
- Otherwise the weight stays the same and each planned set targets one additional rep, capped at the maximum.
- A set can be edited with steppers or direct numeric input.
- Confirming a set stores weight, reps, time-to-log, taps, suggestion acceptance and PR status.
- The rest timer starts after confirmation and supports minus/plus 15 seconds and skip.
- The active workout persists locally and can be minimized and resumed.

Finishing requires at least one confirmed set. The user may optionally record session RPE and notes.

## 5. Quick entry

Accepted forms:

- 80x10x3
- 80 10 10 9
- 20x10 / 25x8
- Decimal comma, such as 20,5x8

A preview appears before application. Invalid syntax does not modify data. A maximum of 30 sets can be added at once.

## 6. Personal records

PR is based on the Epley estimate:

    e1RM = kg × (1 + reps / 30)

A set is a PR only when it exceeds the best historical estimate. The first recorded performance establishes a baseline and is not labelled as a PR.

## 7. Court sessions

A court session requires sport, duration and RPE. Duration is limited to 600 minutes and RPE to 1–10.

    session load = duration in minutes × RPE

The session can be logged for today or yesterday and appears in History and the current-week strip.

## 8. History

Sessions are grouped by local calendar day and sorted newest first. Gym details show exercises and sets; court details show duration, RPE and session load. Deletion requires confirmation.

## 9. Data and backup

Primary storage is browser localStorage under key setpoint.v1. The schema version is 1.

Export produces setpoint-backup-YYYY-MM-DD.json. Import accepts only a Setpoint schema-v1 payload.

Import policy (D-015):

- Rejected: wrong app or schema version, wrong types or shapes, unsafe or duplicate identifiers, references to unknown exercises, invalid session start dates, collections over their limits.
- Sanitized: out-of-range bodyweight, height or birth year become empty; unknown sports become "other"; gym duration is clamped to 1–1440 minutes and court duration to 1–600; notes are cut to 2,000 characters and custom names to 100; negative weights become 0; court load is recomputed as minutes × RPE.
- A backup exported by the app always imports.

When the Claude database capability is available, settings/templates/custom exercises are stored in one state document and sessions are partitioned by month. The newest updatedAt value wins per document/month.

## 10. Product metrics

The settings screen reports:

- Average seconds to log a set, including one-tap confirmations.
- Average taps per set.
- Percentage of suggestions accepted unchanged.
- Number of weeks with at least three sessions.
- Total sessions.

A one-tap confirmation records a minimum measurable duration of 0.1 seconds.

## 11. Offline and accessibility

All core logging functions work without network access. The app uses local system fonts and has no runtime font dependency.

Interactive targets are designed around a 44-pixel minimum. Visible focus, reduced-motion preference, light/dark themes and accessible button labels are supported.

## 12. Error handling

- Storage failure shows a warning to export immediately.
- Invalid quick entry shows an inline error.
- Structurally invalid backup files are rejected without changing current data; user-typed out-of-range values are sanitized.
- Out-of-range body stats are ignored with a message; notes and custom names have length limits at entry.
- Cloud failure falls back to local data.
- Destructive actions require confirmation.
