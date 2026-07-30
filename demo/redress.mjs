// redress.mjs — the engine, walking two real scenarios. `npm run demo`.
import { guidance, resolveLever, toneCheck } from '../kernel/redress.mjs';

const B = (s) => `\x1b[1m${s}\x1b[0m`, D = (s) => `\x1b[2m${s}\x1b[0m`;
function show(scenarioId, startISO) {
  const g = guidance(scenarioId, startISO);
  console.log('\n' + B('◊ ' + g.title) + (g.highStakes ? '  \x1b[41m\x1b[97m HIGH STAKES \x1b[0m' : ''));
  console.log(B('  your rights (accuracy-gated):'));
  for (const r of g.rights) {
    const mark = r.cited ? '\x1b[32m✓ CITED\x1b[0m' : '\x1b[33m⚠ ' + (r.kind === 'unverified' ? 'UNVERIFIED' : 'not a statute') + '\x1b[0m';
    console.log(`   ${mark}  ${r.law || r.name}\n      ${D(r.plain)}`);
    if (r.caveat) console.log(`      \x1b[33m↳ ${r.caveat}\x1b[0m`);
    if (r.source) console.log(`      ${D('source: ' + r.source)}`);
  }
  if (g.also) console.log('  ' + B('also: ') + g.also);
  console.log('  ' + B('deadline: ') + (g.deadline.known ? g.deadline.note : D(g.deadline.note)));
  console.log('  ' + B('gather: ') + g.evidence.join(' · '));
  console.log('  ' + B('if ignored → ') + g.escalation.join(' → '));
  console.log('  ' + B('free human help: ') + g.human.routes.map(r => r.name).join(' · '));
  console.log('  \x1b[36m' + g.human.advise + '\x1b[0m');
  console.log(D('  ' + g.disclaimers.join('  ')));
}

console.log(B('\nTHE REDRESS ENGINE — the interface to rights you already have'));
show('benefits_lockout', '2026-08-01');
show('subscription_wont_cancel', '2026-08-01');

console.log('\n' + B('the accuracy gate never invents law:'));
const bad = resolveLever('right-to-instant-refund-because-i-said-so');
console.log(`  resolveLever('right-to-instant-refund…') → cited:${bad.cited}, flag:${bad.flag}  \x1b[33m(flagged, not bluffed)\x1b[0m`);

console.log('\n' + B('the calm-tone gate keeps letters firm, not nuclear:'));
for (const t of ['I will sue you immediately or else!!', 'Please correct my records under UK GDPR Article 16 within one month.']) {
  const tc = toneCheck(t);
  console.log(`  ${tc.calm ? '\x1b[32m✓ calm\x1b[0m' : '\x1b[31m✗ ' + tc.flagged.join(', ') + '\x1b[0m'}  "${t.slice(0, 52)}"`);
}
console.log(D('\n  Not legal advice · UK law · always routes you to free human experts.\n'));
