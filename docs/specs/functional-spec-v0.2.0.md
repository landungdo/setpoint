# Functional Specification — Setpoint v0.2.0 (additions to R0.1.1)

Status: As built · Date: 30/09/2026 · Base: `functional-spec-r0.1.1.md` (still valid unless changed here)

## 1. Warm-up sets
- Each exercise in a workout has **"Warm-up sets"**: generates 50 % × 8, 70 % × 5, 85 % × 2 of the first working weight, rounded to 2.5 kg (5 lb). Not offered below 20 kg.
- Tapping a set number toggles warm-up ↔ working. Warm-ups show **K** (vi) / **W** (en) and use at most 60 s rest.
- Warm-ups are **excluded** from suggestions, PRs, "last time", set counts, volume, muscle totals and product metrics.

## 2. Progression and records
- e1RM (Epley): `kg × (1 + reps/30)`; **a single rep equals the weight**.
- Double progression now uses **working sets at the working weight only** (fixes warm-ups blocking increases).
- **Progress bar to next weight**: `need = planned sets × rep max`, `have = Σ min(reps, rep max)` of working sets at the target weight (live during the workout, otherwise from last session). Text: "N more reps across sets to earn X".
- **Delta vs last time** under each confirmed working set (same working-set index): weight change, else rep change, else "same".
- **Rep PR**: more reps than ever at the exact same weight (requires previous history at that weight). Shown as "PR rep"; e1RM PR still shown as "PR".
- **Finish summary**: per exercise improved (>+1 % best e1RM vs last session), held, dropped (<−1 %), or first time.

## 3. Pain flag
- Exercise detail → "Painful or uncomfortable". While flagged: suggestions hold weight and reps (no increase), no insights for that exercise, alternatives of the same muscle group are listed. Stored in `settings.pain`.

## 4. Scheduling
- Plans tab → **By weekday** (default, existing) or **Rotation**. Rotation suggests the plan after the most recently done one, in list order (reorder with ↑). Skipping a day never shifts anything.

## 5. This week (Today tab)
- Each day shows a short label: first gym session name, else court sport, else planned plan (weekday mode).
- Dots: gym (filled amber), court (blue), planned but not done (amber ring).
- Tap a day → **day sheet**: sessions with exercises and working sets. Today additionally lists plans to start (scheduled/next first). Future days show the scheduled plan.
- Working sets per muscle group for the week.
- **Weekly plan**: "Sessions planned this week" (2–7). Progress "n/p planned sessions". Stored per week (last 52 kept).

## 6. Progress tab (replaces History)
- **Weekly streak**: consecutive weeks with ≥ 3 sessions (gym + court). The current week counts only once complete. **Planned rest weeks** (toggle for the current week) do not break the streak.
- **Insight card** (at most one per week, dismiss with "Got it"; 21-day cooldown per exercise):
  - Drop: last 2 exposures both < 90 % of the previous best.
  - Stall: last 3 exposures ≤ previous best, previous best ≥ 21 days ago, and the working weight did not change between the last two exposures.
  - Silent for painful exercises.
- **16-week heatmap**: daily load = court `minutes × RPE`; gym `duration × (RPE or 6)`. Levels: 0, < 300, < 600, < 900, ≥ 900.
- **Exercise list**: best e1RM, session count, trend vs previous exposure (↑ > +1 %, ↓ < −1 %).
- **Exercise detail**: best e1RM, best set, sessions, e1RM chart (last 24 sessions, SVG), target e1RM with forecast, pain flag, recent sessions.
- **Forecast**: least-squares trend of e1RM over the last 8 weeks (≥ 3 points, upward slope); weeks = ⌈(target − current) ÷ slope ÷ 7⌉; hidden beyond 104 weeks; "reached" if current ≥ target.
- History list follows.

## 7. Goal
- Onboarding step 3 and Settings: Strength (4–6 reps, 150 s rest), Muscle growth (8–12, 90 s), Maintain (8–12, 90 s). Applies to exercises added afterwards; existing plans unchanged.

## 8. Milestones
- Sessions: 10, 25, 50, 100, 200, 300, 500, 1000. Working volume: 10, 50, 100, 250, 500, 1000 tonnes. One year since the first session. Each fires once (stored in `settings.milestones`), shown in the save toast.

## 9. Data (additive, schema version unchanged = 1)
- Sets: optional `w: true` (warm-up), `prRep: true`.
- Settings: `goal`, `scheduleMode`, `pain[]`, `targets{exId: kg}`, `weekPlans{weekMonday: n}`, `restWeeks[]`, `insightSeen{exId: ms}`, `insightWeek`, `milestones[]`.
- Backups from v0.1.x import unchanged; new fields are validated and sanitized on import (D-015).

## 10. Not changed
- Metric "seconds per set" definition (open PO decision).
- Court-to-gym load rules, fixed court schedule, nutrition (later releases).
