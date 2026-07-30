// redress.mjs — THE REDRESS ENGINE safety spine (PURE, TOTAL, mutation-gated).
//
// The law is public; the interface is locked behind money and jargon. This is the
// interface: scenario -> the REAL statutory lever -> a calm cited action -> the
// deadline -> free human help. The load-bearing part is the SAFETY SPINE, and its
// core is the ACCURACY GATE: the engine only ever ASSERTS a legal lever that resolves
// to a VERIFIED statute in the table below. Anything else is flagged "uncertain — get
// human help", never bluffed. A confident-but-wrong tool loses a vulnerable person the
// outcome the law actually gave them, so honesty at the edge IS the product.
//
// NOT legal advice. UK law. High-stakes matters are routed to free human experts.

// ── STATUTES — the verified table. Every asserted lever must resolve here. ──────
// Each carries a plain-English right, the real citation, a source, and any caveat.
export const STATUTES = Object.freeze({
  'ukgdpr-15': { law: 'UK GDPR Article 15', plain: 'Right of access — you can get a copy of the personal data an organisation holds about you (a Subject Access Request / SAR).', deadlineDays: 30, source: 'UK GDPR Art.15; Data Protection Act 2018' },
  'ukgdpr-16': { law: 'UK GDPR Article 16', plain: 'Right to rectification — you can require an organisation to correct inaccurate personal data about you.', deadlineDays: 30, source: 'UK GDPR Art.16' },
  'ukgdpr-17': { law: 'UK GDPR Article 17', plain: 'Right to erasure — you can ask for your data to be deleted.', deadlineDays: 30, caveat: 'NOT absolute: Art.17(3) lets an organisation lawfully keep some data (legal obligation, establishing/defending legal claims, etc.). Expect partial, not total, deletion in many cases.', source: 'UK GDPR Art.17 & Art.17(3)' },
  'ukgdpr-5-1-d': { law: 'UK GDPR Article 5(1)(d)', plain: 'Accuracy principle — personal data must be accurate and, where necessary, kept up to date.', source: 'UK GDPR Art.5(1)(d)' },
  'ukgdpr-12-3': { law: 'UK GDPR Article 12(3)', plain: 'The organisation must respond without undue delay and within one month (extendable by up to two further months only for complex requests).', deadlineDays: 30, source: 'UK GDPR Art.12(3)' },
  'ea2010-20': { law: 'Equality Act 2010, ss.20–21', plain: 'Duty to make reasonable adjustments — service providers, employers and public bodies must adjust for disabled people; failing that duty is unlawful discrimination.', source: 'Equality Act 2010 ss.20–21' },
  'cra2015': { law: 'Consumer Rights Act 2015', plain: 'Goods must be as described, fit for purpose and of satisfactory quality; services carried out with reasonable care and skill; you have rights to repair, replacement or refund.', source: 'Consumer Rights Act 2015' },
  'dwp-mr': { law: 'Mandatory Reconsideration', plain: 'Before you can appeal most DWP benefit decisions you must first ask them to look again (a Mandatory Reconsideration), usually within one month of the decision date — a late request may be accepted with good reason.', deadlineDays: 30, caveat: 'Time limits vary by benefit and can be extended for good cause; check your decision letter.', source: 'Social Security Act 1998; DWP decision-making & appeals' },
});

// ── MECHANISMS — real but NOT statutory rights. Flagged honestly, never as law. ─
export const MECHANISMS = Object.freeze({
  chargeback: { name: 'Card chargeback', plain: 'A card-scheme process (Visa/Mastercard rules), NOT a statutory right, to reverse a payment via your bank. Separate from — and additional to — your legal rights. Time-limited (often ~120 days).', kind: 'scheme-rule', source: 'Visa / Mastercard scheme rules' },
  s75: { name: 'Section 75 (credit card)', plain: 'If you paid £100–£30,000 by CREDIT card, s.75 Consumer Credit Act can make the card provider jointly liable. This one IS statutory but only for qualifying credit-card purchases.', kind: 'statute-conditional', source: 'Consumer Credit Act 1974 s.75' },
});

// ── HUMAN HELP — free expert routes. Routing is non-skippable (safety spine). ───
export const HUMAN_HELP = Object.freeze({
  citizens_advice: { name: 'Citizens Advice', url: 'https://www.citizensadvice.org.uk', free: true },
  ico: { name: 'ICO — Information Commissioner’s Office', url: 'https://ico.org.uk/make-a-complaint/', free: true },
  fos: { name: 'Financial Ombudsman Service', url: 'https://www.financial-ombudsman.org.uk', free: true },
  shelter: { name: 'Shelter (housing)', url: 'https://www.shelter.org.uk/get_help', free: true },
  eass: { name: 'Equality Advisory & Support Service (EASS)', url: 'https://www.equalityadvisoryservice.com', free: true },
  welfare_rights: { name: 'A welfare-rights adviser (via your council or Citizens Advice)', free: true },
  tribunal: { name: 'First-tier Tribunal (benefit appeals)', url: 'https://www.gov.uk/appeal-benefit-decision', free: true },
});

// ── SCENARIOS — the "you're being screwed" map -> real levers + escalation. ─────
export const SCENARIOS = Object.freeze({
  benefits_lockout: {
    title: 'Benefits locked out / blamed on "IT" or "user error"',
    levers: ['ukgdpr-15', 'ukgdpr-12-3'], mechanisms: [],
    also: 'A maladministration complaint alongside the SAR (ask for the backend logs of what actually happened).',
    escalation: ['DWP formal complaint', 'Independent Case Examiner', 'ICO (for the data-handling side)'],
    human: ['welfare_rights', 'citizens_advice'], highStakes: true,
    evidence: ['dates & times of each failure', 'screenshots / error messages / reference numbers', 'names & dates of any calls', 'your claim reference'],
  },
  data_wont_delete: {
    title: 'They won’t delete your data',
    levers: ['ukgdpr-17', 'ukgdpr-12-3'], mechanisms: [],
    escalation: ['Complain to the ICO'],
    human: ['ico', 'citizens_advice'], highStakes: false,
    evidence: ['your deletion request + the date you sent it', 'their response (or silence)', 'exactly what data & why you want it removed'],
  },
  reasonable_adjustments: {
    title: 'Reasonable adjustments refused',
    levers: ['ea2010-20'], mechanisms: [],
    escalation: ['Formal complaint to the organisation', 'Equality Advisory & Support Service', 'County Court / Employment Tribunal'],
    human: ['eass', 'citizens_advice'], highStakes: true,
    evidence: ['the adjustment you asked for + date', 'their refusal (in writing if possible)', 'the barrier the refusal causes you'],
  },
  subscription_wont_cancel: {
    title: 'Subscription won’t cancel / refund',
    levers: ['cra2015'], mechanisms: ['chargeback', 's75'],
    escalation: ['Financial Ombudsman Service (about the payment)'],
    human: ['citizens_advice', 'fos'], highStakes: false,
    evidence: ['every cancellation attempt + date', 'the terms you actually agreed to', 'payments taken AFTER you tried to cancel'],
  },
  data_wont_hand_over: {
    title: 'They won’t give you your data (SAR ignored)',
    levers: ['ukgdpr-15', 'ukgdpr-12-3'], mechanisms: [],
    escalation: ['Complain to the ICO'],
    human: ['ico', 'citizens_advice'], highStakes: false,
    evidence: ['your SAR + the date you sent it', 'proof of ID if they asked', 'their (non-)response and any deadline passed'],
  },
});

// safe string coercion — a hostile input (e.g. a throwing toString) must never
// crash the engine; it degrades to '' and gets handled as unknown.
function S(x) { try { return typeof x === 'string' ? x : String(x); } catch (e) { return ''; } }
const scenarioOf = (id) => (typeof id === 'string' && Object.prototype.hasOwnProperty.call(SCENARIOS, id)) ? SCENARIOS[id] : undefined;

// ── THE ACCURACY GATE — the κ-gate on every legal claim. ────────────────────────
// Resolve a lever id to a CITED statement, or an honestly-flagged one. It NEVER
// invents law: an id not in STATUTES/MECHANISMS returns cited:false + a get-human flag.
export function resolveLever(id) {
  if (typeof id === 'string' && Object.prototype.hasOwnProperty.call(STATUTES, id)) {
    const s = STATUTES[id];
    return { id, cited: true, kind: 'statute', law: s.law, plain: s.plain, source: s.source, caveat: s.caveat || null, deadlineDays: (typeof s.deadlineDays === 'number') ? s.deadlineDays : null };
  }
  if (typeof id === 'string' && Object.prototype.hasOwnProperty.call(MECHANISMS, id)) {
    const m = MECHANISMS[id];
    return { id, cited: false, kind: m.kind, name: m.name, plain: m.plain, source: m.source, caveat: 'This is a mechanism, not a general statutory right — check it applies to you.' };
  }
  return { id: id == null ? null : id, cited: false, kind: 'unverified', plain: 'This lever is not in the verified table — do NOT rely on it. Get free human help before acting.', flag: 'UNVERIFIED', caveat: 'not confirmed against a statute' };
}

// ── deadline — the statutory clock, honestly. null (not a fake date) when unknown. ─
export function deadline(leverId, startISO) {
  const lv = resolveLever(leverId);
  const days = lv.deadlineDays;
  const start = Date.parse(S(startISO) + 'T00:00:00Z');
  if (!Number.isFinite(days) || !Number.isFinite(start)) return { known: false, note: 'No fixed statutory clock recorded — check your decision/response letter, or ask a human helper.' };
  const due = new Date(start + days * 86400000).toISOString().slice(0, 10);
  return { known: true, days, due, note: `Response due by ${due} (${days} days). Track it — the lapsed clock is your escalation trigger.` };
}

// ── human routing — ALWAYS returns at least one free route. Non-skippable. ──────
export function humanRoutes(scenarioId) {
  const sc = scenarioOf(scenarioId);
  const ids = (sc && Array.isArray(sc.human) && sc.human.length) ? sc.human : ['citizens_advice'];
  const routes = ids.map(k => HUMAN_HELP[k]).filter(Boolean);
  if (!routes.length) routes.push(HUMAN_HELP.citizens_advice);   // guarantee ≥1 free route
  const highStakes = !!(sc && sc.highStakes);
  return { routes, highStakes, advise: highStakes ? 'High stakes (benefits / health / housing / time-critical): get a free human adviser in your corner too — do not let this ride on a tool alone.' : 'Free human help is available if you want a person alongside you.' };
}

// ── calm-tone gate — flags aggressive/threatening wording so letters stay CALM. ─
const AGGRESSIVE = ['sue you', 'lawsuit', 'immediately or', 'or else', 'demand you', 'unacceptable', 'outrageous', 'incompetent', 'threat', 'compensation now', 'take you to court', 'furious', 'disgraceful', '!!'];
export function toneCheck(text) {
  const t = S(text).toLowerCase();
  const flagged = AGGRESSIVE.filter(w => t.includes(w));
  return { calm: flagged.length === 0, flagged, note: flagged.length ? 'Aggressive tone can get a request bounced or escalate the dispute. Calm, clear and firm gets the outcome faster.' : 'Tone reads calm and firm — good.' };
}

// ── guidance — assemble the full HONEST package for a scenario. TOTAL. ──────────
// Unknown scenario => NOT a guess: an honest "not recognised, here is a human".
export function guidance(scenarioId, startISO) {
  const sc = scenarioOf(scenarioId);
  const disclaimers = [
    'This is a plain-language navigator, NOT legal advice, and not a substitute for a lawyer or adviser.',
    'UK law only. It cannot guarantee any outcome; it states your rights and the correct calm steps.',
  ];
  if (!sc) {
    return { recognised: false, title: 'Scenario not recognised',
      message: 'This exact situation is not mapped yet — that is not a reason to guess. Start with free human help, who can point you to the right lever.',
      human: humanRoutes(undefined), disclaimers };
  }
  const rights = [...sc.levers, ...(sc.mechanisms || [])].map(resolveLever);
  const primaryClock = sc.levers.map(l => deadline(l, startISO)).find(d => d.known) || deadline(sc.levers[0], startISO);
  return {
    recognised: true, id: scenarioId, title: sc.title,
    rights,                                    // each carries cited:true/false — the accuracy gate
    also: sc.also || null,
    deadline: primaryClock,
    evidence: sc.evidence || [],
    escalation: sc.escalation || [],
    human: humanRoutes(scenarioId),            // always present
    highStakes: !!sc.highStakes,
    disclaimers,
  };
}
