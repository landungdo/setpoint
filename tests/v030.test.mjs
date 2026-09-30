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
const plain = x => x === undefined ? x : JSON.parse(JSON.stringify(x));
const eq = (a, b) => assert.deepEqual(plain(a), plain(b));
const DAY = 86400000;
const iso = daysAgo => new Date(Date.now() - daysAgo * DAY).toISOString();
const pad = n => String(n).padStart(2, '0');
const dkey = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const cfg = { sets: 3, repMin: 8, repMax: 12, inc: 2.5, rest: 90 };
let n = 0;
const set = (kg, v, key = 'reps') => ({ kg, [key]: v, pr: false, logSec: 1, taps: 1, accepted: false, t: iso(1) });
const gym = (daysAgo, exId, sets, extra = {}) => ({ id: 's' + (++n), type: 'gym', templateId: extra.tpl || null, name: extra.name || 'X', start: iso(daysAgo), tz: 'UTC',
  end: iso(daysAgo), durationMin: 60, rpe: 7, notes: '', exercises: [{ exId, cfg, sets }] });
const state = (sessions, settings = {}, templates = [], extra = {}) => api.setState({ settings: { onboarded: true, ...settings }, templates, custom: [], sessions, ...extra });
const backup = data => ({ app: 'setpoint', schema_version: 1, exportedAt: new Date().toISOString(),
  data: { settings: { onboarded: true }, templates: [], custom: [], sessions: [], ...data } });

test('library: about 100 unique exercises, every v0.2 id kept, valid fields', () => {
  const lib = api.lib;
  assert.ok(lib.length >= 100);
  assert.equal(new Set(lib.map(e => e.id)).size, lib.length);
  const v02 = 'bench incline_db chest_fly dips pushup pullup pulldown row cable_row db_row deadlift ohp db_shoulder lateral face_pull rear_delt curl hammer pushdown skull wrist_curl squat leg_press hack goblet rdl lunge leg_curl leg_ext hip_thrust calf plank cable_crunch hanging_raise'.split(' ');
  v02.forEach(id => assert.ok(lib.some(e => e.id === id), id));
  const muscles = ['chest','back','shoulders','arms','legs','core','other'];
  lib.forEach(e => { assert.ok(e.vi && e.en, e.id); assert.ok(muscles.includes(e.m), e.id); assert.ok(e.type == null || ['bodyweight','timed'].includes(e.type), e.id); });
});

test('migrate: plank sets stored as reps (v0.2) become seconds, idempotently', () => {
  state([gym(3, 'plank', [set(0, 45), set(0, 40)])]);
  const s1 = api.getState().sessions[0].exercises[0].sets;
  eq(s1.map(x => [x.sec, x.reps]), [[45, undefined], [40, undefined]]);
  api.setState(JSON.parse(JSON.stringify(api.getState())));
  eq(api.getState().sessions[0].exercises[0].sets.map(x => x.sec), [45, 40]);
});

test('timed suggestion: 30 s first time, +5 s per set after, hold when painful', () => {
  state([]);
  eq(api.suggest(cfg, 'plank').sets.map(x => x.sec), [30, 30, 30]);
  state([gym(2, 'plank', [set(0, 45, 'sec'), set(0, 40, 'sec')])]);
  eq(api.suggest({ ...cfg, sets: 2 }, 'plank').sets.map(x => x.sec), [50, 45]);
  state([gym(2, 'plank', [set(0, 45, 'sec'), set(0, 40, 'sec')])], { pain: ['plank'] });
  eq(api.suggest({ ...cfg, sets: 2 }, 'plank').sets.map(x => x.sec), [45, 40]);
});

test('records by type: timed PR = longest hold; bodyweight = rep PRs only, also at 0 kg', () => {
  state([gym(2, 'plank', [set(0, 45, 'sec')])]);
  const plank = { exId: 'plank', sets: [{ kg: 0, sec: 50, done: true }] };
  assert.equal(api.isPR(plank, 0), true);
  plank.sets[0].sec = 45; assert.equal(api.isPR(plank, 0), false);
  state([gym(2, 'pullup', [set(0, 8), set(0, 7)])]);
  const pu = { exId: 'pullup', sets: [{ kg: 0, reps: 10, done: true }] };
  assert.equal(api.isPR(pu, 0), false);
  assert.equal(api.isRepPR(pu, 0), true);
  pu.sets[0].reps = 8; assert.equal(api.isRepPR(pu, 0), false);
});

test('bodyweight score counts added load, so +10 kg × 8 beats 0 kg × 10', () => {
  state([], { bodyweight: 70 });
  assert.ok(api.setScore('pullup', { kg: 10, reps: 8 }) > api.setScore('pullup', { kg: 0, reps: 10 }));
  assert.equal(api.setScore('plank', { kg: 0, sec: 60 }), 60);
  assert.equal(api.fmtSets([{ kg: 0, reps: 12 }, { kg: 0, reps: 10 }], 'pushup'), '12, 10');
  assert.equal(api.fmtSets([{ kg: 10, reps: 8 }], 'pullup'), '+10×8');
  assert.equal(api.fmtSets([{ kg: 0, sec: 60 }, { kg: 0, sec: 45 }], 'plank'), '60s, 45s');
});

test('quick entry by type', () => {
  eq(api.parseQuickTyped('12 12 10', 'bodyweight'), [{ w: 0, v: 12 }, { w: 0, v: 12 }, { w: 0, v: 10 }]);
  assert.equal(api.parseQuickTyped('12x3', 'bodyweight').length, 3);
  eq(api.parseQuickTyped('+10x8x2', 'bodyweight'), [{ w: 10, v: 8 }, { w: 10, v: 8 }]);
  eq(api.parseQuickTyped('+5 8 7', 'bodyweight'), [{ w: 5, v: 8 }, { w: 5, v: 7 }]);
  eq(api.parseQuickTyped('60s 45s', 'timed'), [{ w: 0, v: 60 }, { w: 0, v: 45 }]);
  assert.equal(api.parseQuickTyped('60x3', 'timed').length, 3);
  assert.equal(api.parseQuickTyped('abc', 'timed'), null);
  assert.equal(api.parseQuickTyped('999', 'bodyweight'), null);
  eq(api.parseQuickTyped('80x10x2', 'weighted'), [{ w: 80, v: 10 }, { w: 80, v: 10 }]);
});

test('scheduling: a date plan beats the weekday plan; rest clears it; deleted refs fall back', () => {
  const d = new Date(); d.setDate(d.getDate() + 2);
  const tA = { id: 'tA', name: 'A', days: [d.getDay()], exercises: [{ exId: 'bench', ...cfg }] };
  const tB = { id: 'tB', name: 'B', days: [], exercises: [{ exId: 'squat', ...cfg }] };
  state([], {}, [tA, tB]);
  eq(api.plannedFor(d).map(x => x.name), ['A']);
  state([], { dayPlans: { [dkey(d)]: { k: 'tpl', id: 'tB' } } }, [tA, tB]);
  eq(api.plannedFor(d).map(x => [x.name, !!x.byDate]), [['B', true]]);
  state([], { dayPlans: { [dkey(d)]: { k: 'rest' } } }, [tA, tB]);
  eq(api.plannedFor(d), []);
  state([], { dayPlans: { [dkey(d)]: { k: 'tpl', id: 'gone' } } }, [tA, tB]);
  eq(api.plannedFor(d).map(x => x.name), ['A']);
  const past = gym(5, 'bench', [set(60, 10)], { name: 'Old push' });
  state([past], { scheduleMode: 'rotation', dayPlans: { [dkey(d)]: { k: 'sess', id: past.id } } }, [tA]);
  eq(api.plannedFor(d).map(x => [x.kind, x.name]), [['sess', 'Old push']]);
});

test('backup: body measurements are validated and sanitized; v0.2 files still import', () => {
  const d = backup({ body: [
    { id: 'b1', date: '2026-09-01', kg: 74.5, pbf: 19.2, smm: 999 },
    { id: 'b2', date: '2026-09-01', kg: 70 },
    { id: 'b3', date: '2026-09-20', vfl: 7 },
    { id: 'b4', date: '2026-09-21', smm: -1 }
  ] });
  const r = api.validateBackupObject(d);
  assert.ok(r);
  eq(r.body.map(e => e.id), ['b1', 'b3']);
  assert.equal(r.body[0].smm, undefined);
  assert.equal(r.body[0].kg, 74.5);
  assert.equal(api.validateBackupObject(backup({ body: [{ id: 'x', date: 'nope', kg: 70 }] })), null);
  eq(api.validateBackupObject(backup({})).body, []);
});

test('backup: date plans, hidden exercises, custom types and timed sets', () => {
  const tpl = { id: 't1', name: 'P', days: [], exercises: [{ exId: 'bench', ...cfg }] };
  const r = api.validateBackupObject(backup({
    settings: { onboarded: true, dayPlans: { '2026-10-02': { k: 'tpl', id: 't1', junk: 1 }, '2026-10-03': { k: 'tpl', id: 'missing' }, '2026-10-04': { k: 'rest' }, 'bad': { k: 'rest' } },
      hiddenEx: ['bench', 'nope', 'c_1'] },
    templates: [tpl],
    custom: [{ id: 'c_1', vi: 'Giữ xà', en: 'Dead hang', m: 'back', type: 'timed' }, { id: 'c_2', vi: 'X', en: 'X', m: 'arms', type: 'weird' }],
    sessions: [gym(1, 'c_1', [set(0, 40, 'sec')])]
  }));
  assert.ok(r);
  eq(r.settings.dayPlans, { '2026-10-02': { k: 'tpl', id: 't1' }, '2026-10-04': { k: 'rest' } });
  eq(r.settings.hiddenEx, ['bench', 'c_1']);
  eq(r.custom.map(c => c.type), ['timed', 'weighted']);
  assert.equal(r.sessions[0].exercises[0].sets[0].sec, 40);
  assert.equal(r.sessions[0].exercises[0].sets[0].reps, undefined);
});

test('an exported v0.3 state re-imports unchanged in its v0.3 fields', () => {
  const tpl = { id: 't1', name: 'P', days: [1], exercises: [{ exId: 'plank', ...cfg }] };
  state([gym(2, 'plank', [set(0, 50, 'sec')]), gym(1, 'pushup', [set(0, 15)])], { dayPlans: { '2026-10-05': { k: 'tpl', id: 't1' } }, hiddenEx: ['bench'] }, [tpl],
    { body: [{ id: 'b1', date: '2026-09-02', kg: 74.1, pbf: 18.9 }] });
  const S = api.getState();
  const r = api.validateBackupObject(JSON.parse(JSON.stringify(backup({ settings: S.settings, templates: S.templates, custom: S.custom, sessions: S.sessions, body: S.body }))));
  assert.ok(r);
  eq(r.body, S.body);
  eq(r.settings.dayPlans, S.settings.dayPlans);
  eq(r.settings.hiddenEx, ['bench']);
  assert.equal(r.sessions.find(s => s.exercises[0].exId === 'plank').exercises[0].sets[0].sec, 50);
});
