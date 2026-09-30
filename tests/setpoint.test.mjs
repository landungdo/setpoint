import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const html = fs.readFileSync(path.join(root, 'app', 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.ok(scripts.length, 'app/index.html must contain an inline script');

const window = { __SETPOINT_TEST__: true };
const sandbox = {
  window,
  navigator: { language: 'en-US' },
  document: { querySelector: () => null, addEventListener: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout, clearTimeout, setInterval, clearInterval,
  URL, Blob, FileReader: class {}
};
window.window = window;
vm.createContext(sandbox);
vm.runInContext(scripts.at(-1)[1], sandbox, { filename: 'app/index.html' });
const api = window.SetpointTest;
assert.ok(api, 'test API should be exposed when __SETPOINT_TEST__ is enabled');

const plain = value => JSON.parse(JSON.stringify(value));

test('quick entry parses every documented syntax', () => {
  assert.deepEqual(plain(api.parseQuick('80x10x3')), [
    { w: 80, r: 10 }, { w: 80, r: 10 }, { w: 80, r: 10 }
  ]);
  assert.deepEqual(plain(api.parseQuick('80 10 10 9')), [
    { w: 80, r: 10 }, { w: 80, r: 10 }, { w: 80, r: 9 }
  ]);
  assert.deepEqual(plain(api.parseQuick('20x10 / 25x8')), [
    { w: 20, r: 10 }, { w: 25, r: 8 }
  ]);
  assert.deepEqual(plain(api.parseQuick('20,5x8')), [{ w: 20.5, r: 8 }]);
  assert.equal(api.parseQuick('not a set'), null);
});

test('default increments match the selected unit', () => {
  assert.equal(api.defaultIncrement('bench', 'kg'), 2.5);
  assert.equal(api.defaultIncrement('squat', 'kg'), 5);
  assert.ok(Math.abs(api.defaultIncrement('bench', 'lb') - 5) < 0.01);
  assert.ok(Math.abs(api.defaultIncrement('squat', 'lb') - 10) < 0.01);
  assert.ok(Math.abs(api.defaultIncrement('lateral', 'lb') - 2.5) < 0.01);
});

test('one-tap sets receive a measurable duration', () => {
  assert.equal(api.logDuration(null, 1000), 0.1);
  assert.equal(api.logDuration(1000, 2234), 1.2);
});

function validBackup(){
  return {
    app: 'setpoint',
    schema_version: 1,
    exportedAt: '2026-09-30T00:00:00.000Z',
    data: {
      settings: {
        lang: 'vi', unit: 'kg', theme: 'system', onboarded: true,
        sports: ['badminton'], bodyweight: 70, height: 175, birthYear: 1995,
        restDefault: 90, lastBackupAt: null
      },
      custom: [],
      templates: [{
        id: 'tpl-1', name: 'Push', days: [1],
        exercises: [{ exId: 'bench', sets: 3, repMin: 8, repMax: 12, inc: 2.5, rest: 90 }]
      }],
      sessions: [{
        id: 'session-1', type: 'gym', templateId: 'tpl-1', name: 'Push',
        start: '2026-09-30T01:00:00.000Z', end: '2026-09-30T02:00:00.000Z',
        tz: 'Asia/Bangkok', durationMin: 60, rpe: 7, notes: '',
        exercises: [{
          exId: 'bench', cfg: { sets: 3, repMin: 8, repMax: 12, inc: 2.5, rest: 90 },
          sets: [{ kg: 80, reps: 10, pr: false, logSec: 0.1, taps: 1, accepted: true, t: '2026-09-30T01:10:00.000Z' }]
        }]
      }]
    }
  };
}

test('backup validation accepts an exported schema-v1 payload', () => {
  const result = api.validateBackupObject(validBackup());
  assert.ok(result);
  assert.equal(result.sessions.length, 1);
  assert.equal(result.settings.onboarded, true);
});

test('backup validation rejects malformed and attribute-injection data', () => {
  const wrongSchema = validBackup();
  wrongSchema.schema_version = 2;
  assert.equal(api.validateBackupObject(wrongSchema), null);

  const malicious = validBackup();
  malicious.data.templates[0].id = 'x" onclick="alert(1)';
  assert.equal(api.validateBackupObject(malicious), null);

  const malformedSet = validBackup();
  malformedSet.data.sessions[0].exercises[0].sets[0].kg = '80';
  assert.equal(api.validateBackupObject(malformedSet), null);
});

test('offline shell has no external font dependency', () => {
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
});
test('backups made from real user input always import (sanitized, not rejected)', () => {
  const b = validBackup();
  b.data.settings.birthYear = 95;            // typed two digits
  b.data.settings.height = 5;                // typed feet
  b.data.settings.bodyweight = 0;            // cleared field
  b.data.sessions[0].durationMin = 1500;     // workout finished the next day
  b.data.sessions[0].notes = 'a'.repeat(2500);
  b.data.sessions[0].exercises[0].sets[0].kg = -5;
  b.data.custom.push({ id: 'c_ab12cd34', vi: 'x'.repeat(120), en: 'x'.repeat(120), m: 'unknown' });
  b.data.sessions.push({ id: 'court-1', type: 'court', sport: 'pickleball', start: '2026-09-29T11:00:00.000Z',
    tz: 'Asia/Bangkok', durationMin: 90, rpe: 7, load: 1 });
  const r = api.validateBackupObject(b);
  assert.ok(r, 'an app-made backup must never be rejected for user-typed values');
  assert.equal(r.settings.birthYear, null);
  assert.equal(r.settings.height, null);
  assert.equal(r.settings.bodyweight, null);
  assert.equal(r.sessions[0].durationMin, 1440);
  assert.equal(r.sessions[0].notes.length, 2000);
  assert.equal(r.sessions[0].exercises[0].sets[0].kg, 0);
  assert.equal(r.custom[0].vi.length, 100);
  assert.equal(r.custom[0].m, 'other');
  assert.equal(r.sessions[1].load, 630, 'court load is recomputed as minutes × RPE');
});

test('structural errors are still rejected', () => {
  const unknownExercise = validBackup();
  unknownExercise.data.sessions[0].exercises[0].exId = 'does_not_exist';
  assert.equal(api.validateBackupObject(unknownExercise), null);

  const duplicateSession = validBackup();
  duplicateSession.data.sessions.push(JSON.parse(JSON.stringify(duplicateSession.data.sessions[0])));
  assert.equal(api.validateBackupObject(duplicateSession), null);

  const badStart = validBackup();
  badStart.data.sessions[0].start = 'yesterday';
  assert.equal(api.validateBackupObject(badStart), null);
});
