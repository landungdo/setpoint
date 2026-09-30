import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'app', 'index.html'), 'utf8');
const src = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const window = { __SETPOINT_TEST__: true }; window.window = window;
const sandbox = { window, navigator: { language: 'vi-VN' }, document: { querySelector: () => null, addEventListener: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} }, setTimeout, clearTimeout, setInterval, clearInterval, URL, Blob, FileReader: class {} };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const api = window.SetpointTest;
const DAY = 86400000;
const iso = daysAgo => new Date(Date.now() - daysAgo * DAY).toISOString();
const cfg = { sets: 3, repMin: 8, repMax: 12, inc: 2.5, rest: 90 };
let n = 0;
const gym = (daysAgo, exId, sets, extra = {}) => ({ id: 'g' + (++n), type: 'gym', templateId: extra.tpl || null, name: 'X', start: iso(daysAgo), tz: 'UTC',
  end: iso(daysAgo), durationMin: 60, rpe: 7, notes: '', exercises: [{ exId, cfg, sets: sets.map(([kg, reps, w]) => ({ kg, reps, pr: false, logSec: 1, taps: 1, accepted: false, t: iso(daysAgo), ...(w ? { w: true } : {}) })) }] });
const state = (sessions, settings = {}, templates = []) => api.setState({ settings: { onboarded: true, ...settings }, templates, custom: [], sessions });

test('Epley: one rep equals the weight; 80x2 and 80x4 as documented', () => {
  assert.equal(api.e1rm(80, 1), 80);
  assert.ok(Math.abs(api.e1rm(80, 2) - 85.333) < 0.01);
  assert.ok(Math.abs(api.e1rm(85, 2) - api.e1rm(80, 4)) < 0.01);
});

test('warm-up sets never block a weight increase', () => {
  state([gym(3, 'bench', [[40, 8, true], [50, 5, true], [60, 12], [60, 12], [60, 12]])]);
  const sg = api.suggest(cfg, 'bench');
  assert.equal(sg.sets[0].kg, 62.5);
  assert.equal(sg.sets[0].reps, 8);
});

test('hold suggestion aligns reps with working sets only', () => {
  state([gym(3, 'bench', [[40, 8, true], [60, 10], [60, 9], [60, 8]])]);
  const sg = api.suggest(cfg, 'bench');
  assert.deepEqual(JSON.parse(JSON.stringify(sg.sets.map(x => [x.kg, x.reps]))), [[60, 11], [60, 10], [60, 9]]);
});

test('painful exercise holds weight and reps', () => {
  state([gym(3, 'bench', [[60, 12], [60, 12], [60, 12]])], { pain: ['bench'] });
  const sg = api.suggest(cfg, 'bench');
  assert.equal(sg.sets[0].kg, 60);
  assert.equal(sg.sets[0].reps, 12);
});

test('warm-up generator', () => {
  state([]);
  assert.deepEqual(JSON.parse(JSON.stringify(api.warmupSets(100))), [{ kg: 50, reps: 8 }, { kg: 70, reps: 5 }, { kg: 85, reps: 2 }]);
  assert.equal(api.warmupSets(15).length, 0);
});

test('goal sets default rep range and rest', () => {
  state([], { goal: 'strength' });
  const c = api.normCfg('bench', {});
  assert.equal(c.repMin, 4); assert.equal(c.repMax, 6); assert.equal(c.rest, 150);
});

test('rotation suggests the plan after the last one done', () => {
  const tpls = ['A', 'B', 'C'].map(id => ({ id, name: id, days: [], exercises: [{ exId: 'bench', ...cfg }] }));
  state([gym(2, 'bench', [[60, 10]], { tpl: 'B' })], { scheduleMode: 'rotation' }, tpls);
  assert.equal(api.nextRotation().id, 'C');
  state([gym(1, 'bench', [[60, 10]], { tpl: 'C' })], { scheduleMode: 'rotation' }, tpls);
  assert.equal(api.nextRotation().id, 'A');
});

test('rep PR at the same weight', () => {
  state([gym(5, 'bench', [[80, 6]])]);
  const ex = { exId: 'bench', sets: [{ kg: 80, reps: 7, done: true }] };
  assert.equal(api.isRepPR(ex, 0), true);
  ex.sets[0].reps = 6;
  assert.equal(api.isRepPR(ex, 0), false);
});

test('projection: rising trend gives weeks, flat gives null, reached gives 0', () => {
  const rising = [0, 7, 14, 21, 28, 35].map((d, i) => ({ t: d * DAY, e1: 80 + i * 2.5 }));
  const w = api.projectWeeks(rising, 100);
  assert.ok(Number.isInteger(w) && w >= 2 && w <= 4, 'got ' + w);
  assert.equal(api.projectWeeks(rising.map(p => ({ ...p, e1: 90 })), 100), null);
  assert.equal(api.projectWeeks(rising, 90), 0);
});

test('insights: stall, drop, and silence rules', () => {
  const stall = [30, 23, 16, 9, 2].map((d, i) => gym(d, 'bench', [[80, [10, 12, 11, 12, 11][i]]]));
  state(stall);
  assert.equal(api.computeInsight()?.type, 'stall');
  state(stall, { pain: ['bench'] });
  assert.equal(api.computeInsight(), null, 'silent for painful exercises');
  const drop = [30, 20, 10, 2].map((d, i) => gym(d, 'squat', [[[100, 105, 90, 90][i], 5]]));
  state(drop);
  assert.equal(api.computeInsight()?.type, 'drop');
  const changed = [30, 23, 16, 9, 2].map((d, i) => gym(d, 'bench', [[[80, 80, 80, 80, 77.5][i], [10, 12, 11, 12, 12][i]]]));
  state(changed);
  assert.equal(api.computeInsight(), null, 'silent when the user already changed the weight');
});

test('weekly streak counts complete weeks and skips planned rest weeks', () => {
  const now = new Date();
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() + 6) % 7);
  const at = (weeksBack, day) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() - weeksBack * 7 + day, 12).toISOString();
  const three = w => [0, 2, 4].map(d => ({ ...gym(0, 'bench', [[60, 10]]), start: at(w, d) }));
  state([...three(1), ...three(2)]);
  assert.equal(api.weekStreak(), 2);
  const wk3 = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() - 21);
  const key = wk3.getFullYear() + '-' + String(wk3.getMonth() + 1).padStart(2, '0') + '-' + String(wk3.getDate()).padStart(2, '0');
  state([...three(1), ...three(2), ...three(4)], { restWeeks: [key] });
  assert.equal(api.weekStreak(), 3);
});

test('milestones fire once', () => {
  state(Array.from({ length: 10 }, (_, i) => gym(i + 1, 'bench', [[60, 10]])));
  assert.match(api.checkMilestones(), /10/);
  assert.equal(api.checkMilestones(), null);
});

test('backup keeps v0.2 fields and drops invalid ones', () => {
  const b = { app: 'setpoint', schema_version: 1, exportedAt: iso(0), data: {
    settings: { lang: 'vi', unit: 'kg', theme: 'system', sports: [], restDefault: 90, goal: 'strength', scheduleMode: 'rotation',
      pain: ['bench', 'nope'], targets: { bench: 100, squat: -5, nope: 50 }, weekPlans: { '2026-09-28': 4, bad: 3 },
      restWeeks: ['2026-09-21', 'x'], insightSeen: { bench: 1 }, insightWeek: '2026-09-28', milestones: ['s10', '<b>'] },
    templates: [], custom: [], sessions: [gym(1, 'bench', [[40, 8, true], [60, 10]])] } };
  b.data.sessions[0].exercises[0].sets[1].prRep = true;
  const r = api.validateBackupObject(b);
  assert.ok(r);
  assert.equal(r.settings.goal, 'strength');
  assert.equal(r.settings.scheduleMode, 'rotation');
  assert.deepEqual([...r.settings.pain], ['bench']);
  assert.deepEqual({ ...r.settings.targets }, { bench: 100 });
  assert.deepEqual({ ...r.settings.weekPlans }, { '2026-09-28': 4 });
  assert.deepEqual([...r.settings.restWeeks], ['2026-09-21']);
  assert.deepEqual([...r.settings.milestones], ['s10']);
  assert.equal(r.sessions[0].exercises[0].sets[0].w, true);
  assert.equal(r.sessions[0].exercises[0].sets[1].prRep, true);
});
