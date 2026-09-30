# Technical README — Setpoint v0.3.0

## Architecture

Setpoint is a self-contained static web app:

- app/index.html contains markup, styles, translations and application logic.
- index.html redirects to app/.
- There is no runtime framework, build step or package dependency.
- package.json exists only to expose the automated test command.

The app targets mobile browsers first and can be opened directly from disk or hosted as static files.

## Runtime state

Browser state is stored under localStorage key setpoint.v1:

- settings: language, unit, theme, sports, body fields, rest default and backup time.
- templates: workout plans.
- custom: user-defined exercises.
- sessions: completed gym and court sessions.
- body: dated body measurements (v0.3, one per date, kg-based).
- active: an unfinished workout.
- meta: update timestamps for cloud conflict resolution.

migrate() applies defaults and normalizes top-level arrays when local data is loaded.

## Units

Weights are stored internally in kg. Display conversion uses 1 kg = 2.20462 lb.

Default increments are unit-aware when a plan/exercise is created. Existing plan increments represent a physical weight and therefore do not change merely because the display unit changes.

## Progression

suggest() reads the most recent session containing an exercise. It implements double progression:

1. Find the highest working weight from that session.
2. If all planned sets at that weight reached the rep ceiling, add one increment.
3. Otherwise keep weight and request one additional rep per set, capped at the ceiling.

## Persistence and cloud backup

Every state mutation is persisted locally first.

When the Claude db and user capabilities exist:

- data/users/{user-id}/state stores settings, templates, custom exercises and body measurements.
- data/users/{user-id}/m-YYYY-MM stores sessions for a month.
- Each document has an updatedAt timestamp.
- Newer remote documents replace older local partitions.
- Newer local partitions are scheduled for upload.
- Capability revocation returns the app to local-only mode.

## Backup validation

Exported files use:

- app: setpoint
- schema_version: 1
- exportedAt: ISO timestamp
- data: settings, templates, custom and sessions

validateBackupObject() rejects broken structure (shape, types, unsafe or duplicate IDs, unknown references, invalid start dates, collection limits) and returns a sanitized copy in which user-typed values are clamped, truncated or emptied (D-015). Validation finishes before the replacement confirmation is shown. Tests assert that app-made backups with edge-case values always import.

## Security and privacy

- Dynamic user-visible strings are HTML-escaped.
- Imported identifiers are restricted to a safe character set.
- Backup import is local and user initiated.
- Training data is not sent anywhere unless Claude private backup is available or the user exports it.
- Backup files and private interview notes are excluded by .gitignore.

## Tests

Requirements: Node.js 18 or newer.

Run:

    npm test

The built-in Node test runner checks documented quick-entry forms, unit-aware increments, one-tap timing, valid and malicious backup payloads, and absence of external font dependencies.

The test harness sets window.__SETPOINT_TEST__ before evaluating the inline app script. In this mode the app exposes pure logic through window.SetpointTest and skips normal boot/rendering.

## Publishing

Serve the repository root with any static host. GitHub Pages uses the root index redirect and .nojekyll. No generated assets are required.