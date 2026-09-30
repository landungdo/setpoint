# AGENTS.md — Setpoint

Operating manual for every AI coding agent (Codex, Cursor, Claude Code, Grok, Qwen, …) working in this repository.
**Read the whole file before doing anything.** If an instruction here conflicts with a request, stop and ask.

## 1. Product in one paragraph

Setpoint is a mobile-first training log for people who lift **and** play racket sports (pickleball, badminton, tennis, padel). Core loop: one-tap set logging with double-progression suggestions, court sessions counted as training load, weekly review. Asia first (Vietnam), global later. Bilingual Vietnamese / English. Current version: **v0.3.0**.
Intent: `docs/masterplan/` · Decisions: `docs/decisions/decision-log.md` · Shipped behaviour: `docs/specs/`.

## 2. Roles

| Role | Who | Does |
|---|---|---|
| Product Owner | Darren (human) | Priorities, acceptance, merges, final decisions |
| PO advisor / architect | Claude (outside the repo) | Specs, architecture, danger-zone reviews |
| Implementer | **You** | Implement specified stories and bugs, write tests, open PRs |

You implement; you do not redesign. You may **propose** decisions (record them as `Provisional`); only the PO makes them `Final`.

## 3. Stop and ask before touching

**Danger zones** — explain the change and the risk, then wait for the PO's explicit OK:
1. **Data schema**: the shape of `S`, the `localStorage` key, any stored field. Changes need a migration in `migrate()`.
2. **Sync**: `Cloud`, `initCloud()`, `touchState()`, `touchMonth()`, `retireMonths()`, document paths.
3. **Progression & insights**: `setScore()`, `exType()`, `normSessions()`, `suggest()`, `nextGate()`, `isPR()`, `isRepPR()`, `e1rm()`, `bestE1()`, `normCfg()`, `defaultInc()`, `warmupSets()`, `computeInsight()`, `projectWeeks()`, `weekStreak()`.
4. **Backup**: `doExport()`, `doImport()`, `validateBackupObject()`, `schema_version`.
5. **Architecture**: frameworks, build steps, runtime dependencies, external hosts, splitting the single file.
6. **Product metrics**: how `logSec`, `taps`, `accepted` are measured or reported.

**Protected files** — never delete, rename or empty: `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`. Do not edit `docs/masterplan/` or change the status of existing decisions unless asked.

Never "fix" a danger zone as a side effect of another task.

## 4. Repo map

```
app/index.html         the entire runtime app (HTML + CSS + JS)
index.html, .nojekyll  GitHub Pages entry (keep both)
tests/*.test.mjs       logic tests (Node built-in test runner)
package.json           dev-only: exposes `npm test`; must keep zero dependencies
docs/specs/            functional spec + technical README (update when behaviour changes)
docs/decisions/        decision log (append; new entries Provisional)
docs/masterplan/       product strategy (read-only for agents)
CHANGELOG.md           every change goes under ## [Unreleased]
```

## 5. Technical constraints

- **Runtime = one self-contained file**, vanilla JS in one IIFE. No framework, bundler or runtime package.
- **No external runtime requests**: system fonts only (brand fonts will be self-hosted at R1.0 — do not re-add Google Fonts), no CDNs, no remote images.
- **Two runtimes**: inside Claude, `window.claude.use('db'|'user'|'downloads')` may resolve; elsewhere `window.claude` is undefined. Everything must degrade gracefully.
- **Storage**: `localStorage` key `setpoint.v1`, always in try/catch. Weights stored in **kg**; convert only for display.
- **Time**: ISO UTC + `tz`; display with `Intl`.
- **Mobile first**: 375 px, tap targets ≥ 44 px, safe areas, one-hand use.
- **Offline first**: logging works with no network.
- **Test hook**: `window.__SETPOINT_TEST__` exposes `window.SetpointTest` and skips boot. Keep it working.

## 6. Data model (v0.3.0 — additive to v0.2.0)

```js
S = {
  v: 1,
  settings: { lang, unit, theme, onboarded, sports: [id], bodyweight /*kg*/, height, birthYear, restDefault /*s*/, lastBackupAt /*ms*/,
              goal, scheduleMode: 'weekday'|'rotation', pain: [exId], targets: {exId: kg}, weekPlans: {weekMonday: n},
              restWeeks: [weekMonday], insightSeen: {exId: ms}, insightWeek, milestones: [id],
              dayPlans: {'YYYY-MM-DD': {k:'tpl'|'sess', id} | {k:'rest'}}, hiddenEx: [exId] },
  templates: [{ id, name, days: [0-6], exercises: [{ exId, sets, repMin, repMax, inc /*kg*/, rest /*s*/ }] }],
  custom:    [{ id: 'c_…', vi, en, m, type: 'weighted'|'bodyweight'|'timed' }],
  sessions: [
    { id, type:'gym', templateId, name, start, tz, end, durationMin /*1–1440*/, rpe, notes /*≤2000*/,
      exercises: [{ exId, cfg, sets: [{ kg, reps | sec /*timed*/, pr, prRep?, w? /*warm-up*/, logSec, taps, accepted, t }] }] },
    { id, type:'court', sport, start, tz, durationMin /*1–600*/, rpe, load /* = durationMin × rpe */ }
  ],
  body:     [{ id, date:'YYYY-MM-DD', kg?, pbf?, smm?, bfm?, vfl?, waist?, tbw?, bmr?, score? }],  // one per date, kg-based
  active: null | { … }   // in-progress workout, local only
  meta: { stateAt, months: { 'm-YYYY-MM': ms } }
}
```

Exercise IDs in `LIB` are permanent. Types: absent = weighted; `bodyweight` (kg = added load); `timed` (sets store `sec`).
Cloud (inside Claude only): `data/users/<uid>/state` (settings, templates, custom, body) and `data/users/<uid>/m-YYYY-MM`, last-writer-wins by `updatedAt`.
**Backup policy (D-015)**: import rejects broken structure or unsafe data (wrong schema, types, IDs, references) but **sanitizes** values a user could have typed. A backup exported by the app must always import.

## 7. Coding conventions

- Every visible string via `t()` / `tn()`, with keys in **both** `T.vi` and `T.en`. Vietnamese addresses the user as "bạn". Sentence case.
- Escape user text with `esc()`. Validate inputs where they are entered, not only on import.
- Events: `data-a` + a handler in `A`. No inline handlers.
- After mutating `S`: `touchState()` (settings/templates/custom), `touchMonth(start)` (sessions), `persist()` (active). Never write storage during render.
- Use the CSS custom properties; keep light and dark themes legible.
- Change only what the task needs. No mass reformatting or renaming.

## 8. Git workflow

1. Start from the latest main: `git fetch && git checkout main && git pull`. Discard stale local work first.
2. Branch: `codex/<short-task>` (or `<agent>/<short-task>`). **Never commit or push to main.**
3. Small commits, Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`), Jira key when available.
4. Run `npm test` and the smoke test (§11) before pushing.
5. Push the branch and open a **Pull Request** using the template in §9. The PO reviews and merges.

## 9. Pull Request description (also add a short entry under `## [Unreleased]` in CHANGELOG.md)

```
## What changed (user-facing)
## Functions / files touched
## Danger zone touched: no | yes → which, and why
## How it was tested (npm test result + manual steps)
## Screenshots (UI changes, 375 px)
## Open questions for the PO
```

## 10. Definition of Done

- [ ] `npm test` passes; new logic has tests.
- [ ] Works on iPhone Safari at 375 px and with `window.claude` undefined.
- [ ] Every new string exists in Vietnamese and English.
- [ ] Existing data loads; an exported backup re-imports.
- [ ] No console errors. No protected file deleted.
- [ ] CHANGELOG and, if behaviour changed, `docs/specs/` updated.
- [ ] Acceptance criteria met; PR opened with the §9 template.

## 11. Manual smoke test

1. Clear `localStorage` → onboarding → add sample plans.
2. Start a workout → confirm a set → rest timer shows → quick entry `40x10x3` logs 3 sets.
3. Finish with RPE → appears in History.
4. Start the same plan → "Last time" and a suggestion appear.
5. Log a court session → History and week strip.
6. Switch language and unit → no missing strings; weights convert.
7. Export backup → import it → data identical.

## 12. Status and open questions

- **Shipped**: v0.3.0 (see CHANGELOG and `docs/specs/functional-spec-v0.3.0.md`). Warm-up sets (`w: true`) must stay excluded from progression, PRs and stats. Use `setScore()` / `valKey()` for anything type-dependent; never assume `reps` exists on a set.
- **Open (do not change until the PO decides)**: definition of the "seconds per set" metric — one-tap confirmations currently record 0.1 s.
- **Notifications (D-018)**: silent by default; do not add pop-ups or extra alerts without PO approval.
- **Next**: edit saved sessions, CSV export, weekly review, court-to-gym rules, sign-in (R1.0). Implement only after a spec exists in `docs/specs/`.

## 13. Session start prompt (for the PO to paste)

```
Read AGENTS.md fully. Start from the latest main on a new branch codex/<task>.
Constraints: single file app/index.html, no dependencies, vi + en strings, kg storage,
never delete AGENTS.md/CLAUDE.md/.cursor, never push to main.
Task: <story or bug + acceptance criteria>.
First reply with your plan: functions you will change and whether any danger zone (§3) is touched. Wait for my OK.
```
