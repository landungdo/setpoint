# Changelog

All notable changes to Setpoint are documented here. Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- `AGENTS.md`, `CLAUDE.md` and Cursor rules: instructions and guardrails for AI coding agents.

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
