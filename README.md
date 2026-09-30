# Setpoint

**The training log for people who lift and play racket sports.**
*Sổ tập cho người vừa tập gym vừa chơi thể thao dùng vợt.*

Setpoint connects the gym, the court and the plate in one weekly rhythm: one-tap set logging with progression suggestions, court sessions (pickleball, badminton, tennis, padel) counted as training load, and — in upcoming releases — nutrition based on the food people actually eat.

> **Status:** `v0.3.0` — date scheduling, exercise library, body stats, dogfooding and Phase 0 user interviews in progress.
> **Name:** "Setpoint" is a working name pending trademark checks.

---

## Try it

- **Live app:** `https://<your-github-username>.github.io/setpoint/app/` *(after GitHub Pages is enabled)*
- **Locally:** download the repo and open `app/index.html` in a browser. No build step or runtime dependencies.

On iPhone, open the link in Safari → Share → *Add to Home Screen* for an app-like experience.

## What v0.3.0 does

| Area | Features |
|---|---|
| Plans | Workout templates with target rep ranges, weekday or rotation schedule, scheduling by date from the week view, Push/Pull/Legs sample |
| Library | 109 exercises plus your own; weighted, bodyweight and timed types; search, filters, hide unused |
| Workout | Last-session values, prefilled suggestions (double progression), one-tap confirm, PR detection, rest timer |
| Quick entry | `80x10x3` · `80 10 10 9` · `20x10 / 25x8` |
| Court | Log a racket or other sport session in seconds, or repeat the last one in one tap; session load = minutes × RPE |
| Progress | Body stats log (weight + InBody by date) with trends, weekly streak, 16-week heatmap, exercise charts with targets and forecasts, weekly insight, history |
| Habits | Warm-up sets, progress bar to next weight, delta vs last time, rep PRs, pain flag, rotation scheduling, weekly plan, milestones |
| Data | JSON backup export/import; automatic private backup when opened inside Claude |
| Metrics | Seconds per set, taps per set, suggestion acceptance, weeks with 3+ sessions |

Full release notes: [`CHANGELOG.md`](CHANGELOG.md).

## Why

People who combine lifting with racket sports juggle two or three apps, and none of them connects last night's court session to today's gym session. Western hybrid-training apps focus on endurance sports, rely on wearables and charge premium prices; international nutrition apps don't understand Asian street food. Setpoint targets that gap, starting in Vietnam.

## Product documentation

| Document | Purpose |
|---|---|
| [PO Masterplan v2.0](docs/masterplan/Setpoint_PO_Masterplan_v2.0.md) | Vision, research, positioning, scope, roadmap, risks (Vietnamese) |
| [Decision Log](docs/decisions/decision-log.md) | Every product decision with rationale |
| [Specs](docs/specs/) | Functional and technical specifications |
| [AGENTS.md](AGENTS.md) | Operating manual for AI coding agents |
| [Masterplan v1.0 (archive)](docs/masterplan/archive/PO_Masterplan_v1.0.md) | Pre-pivot baseline |

## Roadmap

| Release | Scope |
|---|---|
| **R0.1 Sổ tập** ✅ | Logging core (this version) |
| R0.2 Progression | Suggestion refinements, charts per exercise, weekly review, bodyweight, CSV export |
| R0.3 Cuisine Engine | Portion-based meal logging, curated Vietnamese dishes, adaptive calorie targets |
| R0.4 Court & Gym | Fixed court schedule, court-to-gym load rules, gym profiles |
| R1.0 Beta | Accounts & sync, bilingual beta with users in Vietnam and Australia |

## Tech

- Single self-contained runtime HTML file, vanilla JavaScript, no framework and no build.
- Local-first storage (`localStorage`); core logging and system fonts work without a network.
- Optional private cloud backup through the Claude artifact runtime when available; falls back to local-only elsewhere.
- Automated logic tests use the built-in Node.js test runner: `npm test` (Node 18+).

## Data & privacy

- Training data stays on your device unless you export it or use the in-Claude backup.
- **Never commit backup files** (`setpoint-backup-*.json`) or interview notes to this repository — `.gitignore` blocks the common patterns.

## Author

Darren (Đỗ Lân Dũng) — Product Owner.

## License

© 2026 Đỗ Lân Dũng. All rights reserved. The source is visible for portfolio purposes; no permission is granted to copy, modify or distribute it.
