# Changelog

All notable changes to Setpoint are documented here. Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed
- Workout set rows can remove the selected unconfirmed set instead of only removing the last set; confirmed sets must be undone first and every exercise keeps at least one set.

## [0.3.0] – 2026-09-30 — Plan, library & body

### Added
- Scheduling by date from the week view: an existing plan, a recent session, a new plan, or a rest day; date plans take priority over the weekly schedule.
- "Same as last time" court logging in one tap, guarded against double taps.
- Exercise library screen (Plans tab): search, muscle and type filters, create/edit/delete custom exercises, hide built-in ones.
- Library expanded from 34 to 109 exercises, including court-prep moves; all existing IDs unchanged.
- Exercise types: weighted, bodyweight (added load, rep PRs) and timed (seconds, +5 s suggestions, longest-hold PRs), with type-aware quick entry, charts and summaries.
- Body stats log (Progress tab): weight and InBody metrics by measurement date, trend chart, change vs previous and first measurement, BMI.
- Visual refresh: court-line backdrop, glass cards, floating tab bar, champagne gold accent, light and dark themes.

### Fixed
- List icons (play, check) were invisible.
- Weekly streak label squeezed to one word per line; sample-plan button overflowed; workout action links wrapped mid-label; rest-timer "Skip" wrapped; quick-entry placeholder was cut off.
- Importing a backup navigated to a tab that no longer exists.
- Plank history stored seconds as reps; converted automatically.

### Tests
- 10 new logic tests (31 total).

## [0.2.0] – 2026-09-30 — Progress & habits

### Added
- Warm-up sets: generator (50/70/85 %), toggle by tapping the set number; excluded from suggestions, PRs and stats.
- Progress bar to the next weight, delta vs last time under each set, rep PRs, per-exercise finish summary.
- Pain flag per exercise: holds progression, silences insights, lists alternatives.
- Rotation scheduling ("next in rotation") alongside weekday scheduling; plan reordering.
- This week: day labels, planned-vs-done rings, tap a day for details or to start a plan, sets per muscle group, weekly session plan.
- Progress tab (replaces History): weekly streak with planned rest weeks, weekly insight (stall/drop, max one per week), 16-week load heatmap, exercise list with trends, exercise detail with e1RM chart, target and forecast.
- Training goal (strength / muscle growth / maintain) for default rep ranges and rest.
- Milestones (sessions, tonnes, one year), shown once.
- CI: GitHub Actions runs `npm test` on every PR and push to main. `.gitattributes` normalizes line endings.

### Fixed
- Warm-up sets no longer prevent weight increases or misalign rep suggestions.
- e1RM for a single rep equals the weight.

### Tests
- 13 new logic tests (21 total).

## [0.1.1] – 2026-09-30 — R0.1 hardening

### Fixed
- One-tap confirmations now contribute to the seconds-per-set metric instead of being excluded.
- Default increments in lb mode are 5 lb for standard lifts, 10 lb for heavy/lower-body lifts and 2.5 lb for small isolation exercises.
- Removed the Google Fonts runtime dependency so the complete logging interface remains available offline.
- Backup import rejects broken structure or unsafe data (schema version, types, identifiers, references, duplicates, collection limits) and sanitizes user-typed values instead of rejecting the whole file, so a backup exported by the app always imports (D-015).
- Input guards: notes limited to 2,000 characters, custom exercise names to 100, out-of-range body stats are ignored with a message, negative weights are not accepted, a workout finished the next day is capped at 24 hours.

### Added
- Dependency-free automated logic tests using the built-in Node.js test runner.
- As-built functional specification and technical README.
- AGENTS.md v2: Pull Request workflow, protected files, test requirement, PR handoff template.

## [0.1.0] – 2026-09-29 — R0.1 "Sổ tập" (MVP)

### Added
- Bilingual interface (Vietnamese / English), kg / lb units, light / dark / system theme.
- 3-step onboarding: language & unit, sports played, optional body stats.
- Plans (workout templates): create, edit, delete, assign weekdays; Push / Pull / Legs sample.
- Workout mode: last-session values, prefilled suggestions (double progression), one-tap set confirmation, PR detection.
- Rest timer with ±15 s, sound alert, timestamp-based so it stays correct after the screen locks.
- Quick entry: `80x10x3`, `80 10 10 9`, `20x10 / 25x8`, decimal comma supported, with preview.
- Court session logging (sport, minutes, RPE) with session load = minutes × RPE.
- History grouped by day with details and deletion.
- JSON backup export / import; reminder after 7 days without backup.
- Automatic backup to the user's private Claude account storage when opened inside Claude.
- Product metrics screen: seconds per set, taps per set, suggestion acceptance rate, weeks with 3+ sessions.

### Known limitations
- iOS web pages cannot vibrate; the rest timer alerts with sound only (muted in silent mode).
- The alert sound cannot play while the screen is locked.
- Outside Claude (e.g. GitHub Pages) data is stored on the device only; use JSON export.
