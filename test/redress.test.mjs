// redress.test.mjs — the SAFETY SPINE, one test per invariant. This is the whole
// value: a vulnerable person's outcome rides on the engine being accurate, calm,
// and human-routed. These pin exactly that.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveLever, deadline, humanRoutes, toneCheck, guidance,
  STATUTES, SCENARIOS, HUMAN_HELP,
} from '../kernel/redress.mjs';

// ── S1/S2 ACCURACY GATE — assert only verified statutes; never invent law ───────
test('S1 a verified statute resolves as CITED with a real source', () => {
  const r = resolveLever('ukgdpr-15');
  assert.equal(r.cited, true);
  assert.equal(r.law, 'UK GDPR Article 15');
  assert.match(r.source, /UK GDPR Art\.15/);
});
test('S2 an UNVERIFIED lever is flagged, never asserted as law', () => {
  const r = resolveLever('made-up-right-99');
  assert.equal(r.cited, false);
  assert.equal(r.flag, 'UNVERIFIED');
  assert.equal(r.id, 'made-up-right-99');           // the id is carried through for reference
  assert.match(r.plain, /do NOT rely|get free human help/i);
});
test('S2 a non-statutory MECHANISM (chargeback) is not passed off as a statute', () => {
  const r = resolveLever('chargeback');
  assert.equal(r.cited, false);
  assert.equal(r.kind, 'scheme-rule');
  assert.match(r.plain, /NOT a statutory right/);
});
test('S1 resolveLever is total on garbage (null/number/object) — flags, never throws', () => {
  for (const g of [null, undefined, 42, {}, []]) {
    const r = resolveLever(g);
    assert.equal(r.cited, false);
    assert.equal(r.kind, 'unverified');
  }
});

// ── S7 the erasure caveat must travel with the claim (Art.17 is not absolute) ───
test('S7 right to erasure carries its non-absolute caveat', () => {
  const r = resolveLever('ukgdpr-17');
  assert.equal(r.cited, true);
  assert.match(r.caveat, /NOT absolute|Art\.17\(3\)|keep some data/i);
});

// ── S3 HUMAN ROUTING is non-skippable — always ≥1 free route ────────────────────
test('S3 humanRoutes always returns at least one free route, even for an unknown scenario', () => {
  const known = humanRoutes('benefits_lockout');
  assert.ok(known.routes.length >= 1);
  assert.ok(known.routes.every(r => r.free === true));
  const unknown = humanRoutes('no_such_scenario');
  assert.ok(unknown.routes.length >= 1);           // guaranteed fallback
  assert.equal(unknown.routes[0].name, HUMAN_HELP.citizens_advice.name);
});

// ── S4 HIGH STAKES escalates the human advice ───────────────────────────────────
test('S4 a high-stakes scenario advises getting a human in your corner', () => {
  const hr = humanRoutes('benefits_lockout');           // highStakes: true
  assert.equal(hr.highStakes, true);
  assert.match(hr.advise, /human adviser|do not let this ride on a tool alone/i);
  const low = humanRoutes('subscription_wont_cancel');  // highStakes: false
  assert.equal(low.highStakes, false);
});

// ── S5 DEADLINE is honest — real clock, or an explicit "unknown", never a fake date ─
test('S5 a known statutory clock computes the correct due date', () => {
  const d = deadline('ukgdpr-15', '2026-08-01');
  assert.equal(d.known, true);
  assert.equal(d.days, 30);
  assert.equal(d.due, '2026-08-31');
});
test('S5 an unknown clock returns known:false and NO fabricated date', () => {
  assert.equal(deadline('ea2010-20', '2026-08-01').known, false);   // no fixed statutory clock
  assert.equal(deadline('ukgdpr-15', 'not-a-date').known, false);   // bad input => honest unknown
  assert.equal(deadline('made-up', '2026-08-01').known, false);
});

// ── S6 CALM TONE gate — flags aggression, passes calm+firm ──────────────────────
test('S6 toneCheck flags aggressive wording and passes calm wording', () => {
  assert.equal(toneCheck('I will sue you immediately or else!!').calm, false);
  assert.ok(toneCheck('I will sue you').flagged.length >= 1);
  assert.equal(toneCheck('Please correct my records under UK GDPR Article 16 within one month.').calm, true);
  assert.equal(toneCheck(null).calm, true);         // total
});

// ── S8 unrecognised scenario => an honest human hand-off, NOT a guess ───────────
test('S8 an unrecognised scenario returns recognised:false + a human route (no guessing)', () => {
  const g = guidance('my_weird_situation', '2026-08-01');
  assert.equal(g.recognised, false);
  assert.ok(g.human.routes.length >= 1);
  assert.match(g.message, /not a reason to guess|human help/i);
});

// ── S9 DISCLAIMERS always present (not legal advice, no guarantee, UK-only) ──────
test('S9 guidance always carries the honest disclaimers', () => {
  for (const id of ['benefits_lockout', 'made_up']) {
    const g = guidance(id, '2026-08-01');
    assert.ok(g.disclaimers.some(d => /not legal advice/i.test(d)));
    assert.ok(g.disclaimers.some(d => /guarantee/i.test(d)));
  }
});

// ── the full package for a real scenario ────────────────────────────────────────
test('guidance for a benefits lockout assembles rights + clock + escalation + human', () => {
  const g = guidance('benefits_lockout', '2026-08-01');
  assert.equal(g.recognised, true);
  assert.ok(g.rights.some(r => r.cited && /Article 15/.test(r.law)));    // SAR
  assert.equal(g.deadline.due, '2026-08-31');
  assert.ok(g.escalation.length >= 1);
  assert.equal(g.highStakes, true);
  assert.ok(g.human.routes.length >= 1);
  assert.match(g.also, /maladministration/i);        // the "also" survives assembly
  assert.ok(g.evidence.length >= 1);                 // evidence list survives assembly
});
test('guidance surfaces a scenario’s non-statutory mechanisms too (chargeback/s75)', () => {
  const g = guidance('subscription_wont_cancel', '2026-08-01');
  assert.ok(g.rights.some(r => r.id === 'chargeback' && r.cited === false));   // mechanisms not dropped
  assert.ok(g.rights.some(r => r.id === 'cra2015' && r.cited === true));       // and the real statute
});
test('guidance gives an honest "no fixed clock" when the lever has none (not undefined)', () => {
  const g = guidance('reasonable_adjustments', '2026-08-01');   // ea2010-20 has no statutory clock
  assert.equal(g.deadline.known, false);
  assert.match(g.deadline.note, /no fixed statutory clock|check your/i);
});
test('S10 guidance is total on garbage input (never throws)', () => {
  assert.doesNotThrow(() => guidance(null, null));
  assert.doesNotThrow(() => guidance(42, {}));
  assert.equal(guidance(null, null).recognised, false);
});
test('S10 a scenario is recognised only from a real string id, not a coerced object', () => {
  assert.doesNotThrow(() => guidance({ toString() { throw new Error('toxic'); } }, '2026-08-01'));
  assert.equal(guidance({ toString: () => 'benefits_lockout' }, '2026-08-01').recognised, false);
});

// every scenario’s levers all resolve through the gate (no dangling ids)
test('every scenario lever + mechanism resolves through the accuracy gate', () => {
  for (const [id, sc] of Object.entries(SCENARIOS)) {
    for (const l of [...sc.levers, ...(sc.mechanisms || [])]) {
      const r = resolveLever(l);
      assert.ok(r.kind !== 'unverified', `${id}: lever ${l} must be a known statute/mechanism, not unverified`);
    }
    assert.ok(sc.human.length >= 1, `${id} must have a human route`);
  }
});
