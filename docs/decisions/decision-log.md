# Decision Log

Each entry records what was decided, why, which options were rejected, and when to revisit.
Status: **Final** · **Provisional** (awaiting evidence) · **Superseded**.

| ID | Date | Decision | Context | Options considered | Rationale | Status | Revisit when |
|---|---|---|---|---|---|---|---|
| D-001 | 2026-09-29 | Initial positioning: hybrid athlete + Cuisine Engine | Idea: gym progress tracking + diet suggestions | Lifting log only; nutrition only | Combine two needs users currently spread across apps | Superseded by D-004 | — |
| D-002 | 2026-09-29 | Global scope; bilingual VI + EN testing; market-by-market launch | Long-term goal is a global public product | Vietnam only; global from day one | Design global, launch local, expand on data | Final | Gate 2 |
| D-003 | 2026-09-29 | Drop the name NOTCH | "Notch – Gym Workout Tracker" and "notch – calorie tracker" already exist | Keep Notch with a suffix | Direct conflict in the same category | Final | — |
| D-004 | 2026-09-29 | Pivot to "gym + racket sports, Asia first" | HYBRD, Edge, Strava/Runna cover Western hybrid training; racket sports ignored; pickleball boom in Vietnam | Generic hybrid; Vietnamese calorie app | Clearest gap, tied to a trend in the first market | Provisional (H1) | Phase 0 results |
| D-005 | 2026-09-29 | Codename Setpoint; fallbacks Gripset (trademark conflict) and Upweek (H1 rejected) | Four meanings across gym, court, nutrition and control loops | Gripset, RepRally, Upweek, Matchfit (taken), Offcourt (taken) | Strongest meaning and founder story | Provisional (trademark) | G0-04, G0-05, name test |
| D-006 | 2026-09-29 | No wearable dependency; wearables optional from R2.0 | Low smartwatch adoption in Asia | Wearable-first like HYBRD | Fits the persona; differentiates | Final | R2.0 |
| D-007 | 2026-09-29 | Lower retention targets: beta ≥ 25 % week 4; store ≥ 12 % day 30 | v1.0 targeted > 40 %, unrealistic vs industry | Keep 40 % | Top fitness apps reach ~25 % at day 30 | Final | After beta |
| D-008 | 2026-09-29 | Freeze Masterplan v2.0 until end of Phase 0 | Risk of endless planning instead of learning | Keep editing docs | Prioritise primary data | Final | G0-12 |
| D-009 | 2026-09-29 | Hybrid delivery: Go/No-go gates + 1-week sprints | Solo project, high market risk | Waterfall; pure Scrum | Gates control risk; sprints keep learning fast | Final | Gate 1 |
| D-010 | 2026-09-29 | Assumed capacity 5–5.5 h/week in fixed slots | Runs alongside a full-time job | Work when inspired | Consistency beats intensity | Provisional (PO to confirm) | Week 2 retro |
| D-011 | 2026-09-29 | Cloud backup from v0.1 (Claude account storage, monthly documents) instead of waiting for Supabase at R1.0 | Masterplan flagged iOS clearing local web data as a risk | Local-only + JSON export until R1.0 | Removes the data-loss risk at no cost; local-first still works offline and outside Claude | Final | R1.0 architecture review |
| D-012 | 2026-09-29 | Build R0.1 in parallel with Phase 0 and use the app as the interview prototype | PO chose to start coding before interviews | Strict validate-then-build order | A working prototype yields better interview feedback than paper wireframes; R0.1 is useful for self-tracking regardless | Provisional | Phase 0 results |
| D-013 | 2026-09-29 | Defer Jira setup; GitHub first as source of truth for code and docs | Jira not yet installed on the Atlassian site | Set up Jira first | Code and docs need a versioned home before more specs are written | Provisional | Before R0.2 planning |
