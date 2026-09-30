# AGENTS.md — Setpoint

Instructions for any AI coding agent (Codex, Cursor, Grok, Qwen, Claude Code…) working in this repo.
**Read this whole file before changing anything.**

## 1. Product in one paragraph

Setpoint is a mobile-first training log for people who lift **and** play racket sports (pickleball, badminton, tennis, padel). Core loop: one-tap set logging with double-progression suggestions, court sessions counted as training load, weekly review. Asia first (Vietnam), global later. Bilingual Vietnamese / English. Current version: **v0.1.0 (R0.1 MVP)**.
Product intent: `docs/masterplan/Setpoint_PO_Masterplan_v2.0.md` · Decisions: `docs/decisions/decision-log.md` · Specs: `docs/specs/`.

## 2. Roles — who decides what

| Role | Who | Responsibility |
|---|---|---|
| Product Owner | Darren (human) | Priorities, acceptance, final decisions |
| PO advisor / architect | Claude (outside this repo) | Specs, architecture, review of danger-zone changes |
| Implementer | **You, the coding agent** | Implement specified stories, fix bugs, UI work |

**You implement; you do not redesign.** If a task requires a decision that is not in a spec, stop and ask.

## 3. Danger zones — STOP and ask the PO before changing

1. **Data schema** — the shape of `S` (see §6), the `localStorage` key, or any stored field. Any change needs a written migration in `migrate()` and PO approval.
2. **Sync** — `Cloud`, `initCloud()`, `touchState()`, `touchMonth()`, `retireMonths()`, document paths.
3. **Progression logic** — `suggest()`, `isPR()`, `e1rm()`, `bestE1()`, `normCfg()`.
4. **Backup format** — `doExport()` / `doImport()` and `schema_version`.
5. **Architecture** — adding a framework, build step, npm dependency, new external host, or splitting the single file.

Explain the proposed change and its risk, then wait. Never "fix" these as a side effect of another task.

## 4. Repo map

```
app/index.html        ← the entire app (HTML + CSS + JS in one file)
index.html            ← redirect to app/ (GitHub Pages)
.nojekyll             ← keep; disables Jekyll on Pages
docs/masterplan/      ← product strategy (do not edit unless asked)
docs/decisions/       ← decision log (append only, when asked)
docs/specs/           ← functional/technical specs (source of truth for behaviour)
CHANGELOG.md          ← update under "Unreleased" with every change
```

## 5. Technical constraints (non-negotiable)

- **One self-contained file**: `app/index.html`. Vanilla JavaScript inside a single IIFE. No framework, no bundler, no npm packages.
- **External resources**: only Google Fonts (Be Vietnam Pro, Barlow Condensed). No other network requests, no remote images, no CDN scripts unless the PO approves.
- **Two runtimes must both work**:
  - Inside Claude (published artifact): `window.claude.use('db' | 'user' | 'downloads')` may resolve to a namespace.
  - Anywhere else (GitHub Pages, local file): `window.claude` is `undefined`. Every capability must degrade gracefully.
- **Storage**: `localStorage` key `setpoint.v1`, always wrapped in try/catch. Weights are **always stored in kg**; convert only for display (`dispW`, `fromDisp`).
- **Time**: store ISO timestamps in UTC plus `tz`. Display with `Intl` in the user's locale.
- **Mobile first**: design at 375 px width, tap targets ≥ 44 px, respect `env(safe-area-inset-*)`, one-hand use during a workout.
- **Offline first**: logging must work with no network.

## 6. Data model (as built in v0.1.0)

```js
S = {
  v: 1,
  settings: { lang: 'vi'|'en', unit: 'kg'|'lb', theme: 'system'|'light'|'dark', onboarded, sports: [sportId],
              bodyweight /*kg*/, height, birthYear, restDefault /*s*/, lastBackupAt /*ms*/ },
  templates: [{ id, name, days: [0-6 /*0=Sun*/], exercises: [{ exId, sets, repMin, repMax, inc /*kg*/, rest /*s*/ }] }],
  custom:    [{ id: 'c_…', vi, en, m /*muscle*/ }],
  sessions: [
    { id, type: 'gym', templateId, name, start, tz, end, durationMin, rpe, notes,
      exercises: [{ exId, cfg, sets: [{ kg, reps, pr, logSec, taps, accepted, t }] }] },
    { id, type: 'court', sport, start, tz, durationMin, rpe, load /* = durationMin × rpe */ }
  ],
  active: null | { …in-progress workout, local only, never synced },
  meta: { stateAt /*ms*/, months: { 'm-YYYY-MM': ms } }
}
```

Cloud backup (inside Claude only): private docs `data/users/<uid>/state` and `data/users/<uid>/m-YYYY-MM`, last-writer-wins by `updatedAt`. Month key uses the UTC month of `start`.

## 7. Coding conventions

- **i18n**: every visible string goes through `t(key, vars)` / `tn(key, n, vars)`. Add the key to **both** `T.vi` and `T.en`. Vietnamese UI addresses the user as "bạn". Sentence case, plain verbs, no exclamation-heavy copy.
- **Escaping**: any user-provided text rendered into HTML must pass through `esc()`.
- **Events**: use `data-a="action"` + a handler in the `A` map (event delegation). No inline `onclick`.
- **State changes**: mutate `S`, then call `touchState()` (settings/templates/custom) or `touchMonth(session.start)` (sessions), or `persist()` for `active`. Never write storage inside render functions.
- **Styling**: use the CSS custom properties (`--bg`, `--surface`, `--ink`, `--accent`, `--court`, …). Both light and dark themes must stay legible.
- **Scope**: change only what the task needs. Do not reformat, rename or reorder unrelated code.

## 8. Workflow

1. Confirm the task maps to a story or bug with acceptance criteria. If not, ask.
2. Make small, reviewable diffs. One story per commit.
3. Commit messages: Conventional Commits — `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:` — and include the Jira key when one exists (e.g. `feat(SP-21): bodyweight logging`).
4. Add a line to `CHANGELOG.md` under `## [Unreleased]`.
5. Summarise what changed, what to test, and any risk.

## 9. Definition of Done

- [ ] Works on iPhone Safari at 375 px, portrait.
- [ ] Works offline and with `window.claude` undefined.
- [ ] Every new string exists in both Vietnamese and English.
- [ ] Existing data still loads (no schema change without approved migration).
- [ ] No console errors.
- [ ] CHANGELOG updated.
- [ ] Acceptance criteria of the story are met.

## 10. Manual smoke test (run before every commit)

1. Fresh start (clear `localStorage`) → onboarding → add sample plans.
2. Start a workout → confirm a set → rest timer appears → quick entry `40x10x3` logs 3 sets.
3. Finish with RPE → session appears in History.
4. Start the same plan again → "Last time" and suggestion are shown.
5. Log a court session → appears in History and in the week strip.
6. Switch language and unit → no missing strings, weights convert correctly.
7. Export backup → import it back → data identical.

## 11. Current status

- **Done**: R0.1 (see `CHANGELOG.md`).
- **Next**: R0.2 — progression charts, weekly review, bodyweight, CSV export. **Do not implement R0.2 features until their spec exists in `docs/specs/`.**

## 12. Session start prompt (for the human to paste)

```
Read AGENTS.md fully before doing anything. Constraints: single file app/index.html,
vanilla JS, no frameworks or new dependencies, every string in both vi and en,
weights stored in kg. Do not touch the danger zones in §3 without asking me.
Today's task: <story / bug + acceptance criteria>.
First, tell me your plan and which functions you will change. Wait for my OK.
```
