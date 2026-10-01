# Functional Specification — Setpoint v0.3.0 (additions to v0.2.0)

Status: As built · Date: 01/10/2026 · Base: `functional-spec-v0.2.0.md` and `functional-spec-r0.1.1.md` (still valid unless changed here)

## 1. Scheduling by date (P1)
- Tap any day in **This week** (today or later) → **Plan for this day**. The current plan is shown with its source: *Set for this date* or *From your weekly schedule*.
- Three sources: **Plans** (an existing plan), **Recent** (repeat one of the last 8 distinct gym sessions), **New** (opens the plan editor; on save the plan is created and scheduled on that date).
- **Rest on this day** marks a planned rest day (week strip shows a dashed dot and "Rest"). **Clear** removes the date entry.
- **Priority**: date entry > weekday plans (weekday mode). Rotation mode still suggests the next plan for today only, unless today has a date entry.
- A date entry pointing to a deleted plan or session is ignored and the day falls back to the weekday schedule. Deleting a plan or session also removes entries that point to it.
- Starting a scheduled **session** repeats it: same exercises, configs and number of working sets; suggestions still come from the latest history.
- Entries older than 60 days are pruned when a new one is saved.

## 2. Court session "Same as last time" (P1)
- Today tab, under **Log court session**: a card with the last court session (sport, minutes, RPE). **Log** saves a copy as of now.
- Disabled for 3 minutes after the last court session to prevent double logging.

## 3. Exercise library (P2)
- Plans tab → segmented control **Plans | Exercise library**.
- Search (accent-insensitive, both languages), filter by muscle group and by type. Muscle/type badges are shown only when the corresponding filter is *All*.
- **New exercise**: name (in the interface language), optional name in the other language, muscle group, type. Duplicate names (either language) are refused.
- **Custom exercises**: edit name, muscle, type. Type is locked once the exercise has history. **Delete**: removed if unused; if it appears in history, a plan or the active workout it is **hidden** instead.
- **Built-in exercises**: read-only; can be hidden from the picker and shown again. **View progress** opens the exercise detail.
- Hidden exercises are excluded from the picker and pain alternatives but stay in history, plans and progress. "Show N hidden exercises" reveals them in the library.
- Library grows from 34 to **109** exercises; all v0.2 IDs are unchanged. New IDs are permanent.

## 4. Exercise types (P2)
| Type | Logged | Suggestion | Records | Display |
|---|---|---|---|---|
| Weighted (default) | kg × reps | unchanged double progression | e1RM PR + rep PR | unchanged |
| Bodyweight | added kg (0 allowed) × reps | double progression on reps; at the top of the range suggests adding one load step | **rep PRs only** (also at 0 kg) | "12, 10" or "+10×8"; chart = reps of best set |
| Timed | kg (optional) × **seconds** | +5 s per set vs last time (hold when painful); first time 30 s | longest hold = PR | "60s, 45s"; chart = seconds |
- Comparable score used for insights, finish summary and trends: weighted e1RM; bodyweight e1RM of (bodyweight + added load), using 70 kg when bodyweight is unknown; timed seconds.
- Warm-up sets, the progress-to-next-weight bar (timed) and target/forecast (bodyweight, timed) are not offered.
- Quick entry: bodyweight/timed accept `12 12 10`, `12x3`, `+10x8x3`, `+10 8 8 7`; a trailing `s` on seconds is ignored.
- Plan editor: timed exercises show sets and rest only.
- **Migration**: timed sets store `sec`. Older plank sets that stored seconds in `reps` are converted on load, on import and on cloud merge (idempotent).

## 5. Body measurements (P3, included in v0.3)
- Progress tab → **Body stats**. **Add measurement** with a **measurement date** (any date up to today, so older InBody results can be entered).
- Metrics (all optional, at least one): weight, body fat %, skeletal muscle mass, body fat mass, visceral fat level, waist, total body water, basal metabolic rate, InBody score. Weight-type values are stored in kg and shown in the user's unit. Out-of-range values are refused at entry.
- One entry per date: saving on a date that already has an entry merges into it.
- View: metric chips (only metrics with data), latest value and date, change vs previous measurement and since the first (green = improvement, orange = worse, neutral for weight and water), time-scaled chart, BMI when weight and height exist, latest 5 entries with "Show all".
- Onboarding weight becomes the first entry. Changing weight in Settings records today's measurement. The latest weight entry updates `settings.bodyweight`.

## 6. Interface
- Visual refresh: deep court-blue theme with champagne gold accent, court-line backdrop fading down the page with light grain, glass cards, floating tab bar, sheet handle and slide-up, gold-tinted selected chips. Light and dark themes. System fonts only, no external requests.
- UI fixes: list icons (▶, ✓) were invisible; weekly streak label squeezed to one word per line; sample-plan button overflowed; workout action links wrapped mid-label; import navigated to a removed tab; quick-entry placeholder was cut off; rest-timer "Skip" wrapped.
- Each workout set row has its own remove action. It removes that exact unconfirmed set, confirmed sets must be undone first, and an exercise always keeps at least one set.

## 7. Edit saved sessions
- An expanded History item offers **Edit** beside **Delete**. Editing is unavailable while a workout is in progress, so a saved session cannot conflict with the active workout.
- Gym sessions: edit the session name, local date/time, duration, RPE, notes, exercises, set values and warm-up status; exercises and sets may be added or removed. A gym session must keep a name, at least one exercise and at least one valid set per exercise.
- Court sessions: edit the sport, local date/time, duration and RPE. Session load is always recalculated as `durationMin × rpe`.
- **Cancel** closes the editor without changing saved data. **Save changes** preserves the session ID, template reference and existing per-set logging metrics (`logSec`, `taps`, `accepted`); newly added sets use neutral zero/false metrics.
- A saved session cannot be moved into the future. Gym duration is limited to 1–1440 minutes, court duration to 1–600 minutes, and notes to 2,000 characters.
- After a gym edit or deletion, PR and rep-PR flags are rebuilt chronologically. Warm-up sets remain excluded; the first historical performance is a baseline, not a PR. Derived e1RM charts, weekly load, insights, forecasts and next-session suggestions then read the corrected history automatically.
- Moving a session between months marks both the old and new cloud month documents dirty. Any later month whose stored PR flags change is also marked dirty.
- No stored fields are added and backup schema version remains 1.

## 8. Data (additive, schema version unchanged = 1)
- Top level: `body: [{ id, date: 'YYYY-MM-DD', kg?, pbf?, smm?, bfm?, vfl?, waist?, tbw?, bmr?, score? }]` — synced inside the `state` cloud document.
- Settings: `dayPlans: { 'YYYY-MM-DD': { k: 'tpl'|'sess', id } | { k: 'rest' } }`, `hiddenEx: [exId]`.
- Custom exercises: `type: 'weighted'|'bodyweight'|'timed'`.
- Sets of timed exercises: `sec` instead of `reps`.
- Backup import (D-015): body entries with a broken id/date reject the file; out-of-range values are dropped; duplicate dates keep the first. Date entries that reference unknown plans/sessions and unknown hidden IDs are dropped. v0.2 backups import unchanged.

## 9. Not changed
- Metric "seconds per set" definition (open PO decision). Court-to-gym load rules. Sign-in (deferred to R1.0). Nutrition.
