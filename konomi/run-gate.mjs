// run-gate.mjs — proof-of-play for the redress engine. The accuracy gate is the
// product, so it gets the mutation gate + a fuzz pass: no crafted input may throw
// the engine, and (mutation-tested) the safety invariants actually hold.
import { runMutations, fuzz } from './witness.mjs';
import { resolveLever, deadline, guidance, toneCheck, humanRoutes } from '../kernel/redress.mjs';

const TEST = ['node', '--test', 'test/redress.test.mjs'];
let clean = true;
console.log('── mutation gate ─────────────────────────────────────────');
const r = runMutations('kernel/redress.mjs', { testCmd: TEST });
if (r.baselineFailed) { console.log('  BASELINE RED —', r.reason); clean = false; }
else {
  const ig = r.ignored.length ? ` (+${r.ignored.length} baselined)` : '';
  console.log(`  kernel/redress.mjs: ${r.killed}/${r.total} killed  score=${r.score}${ig}  ${r.clean ? 'CLEAN' : 'THEATRE'}`);
  for (const s of r.survived) console.log(`     SURVIVED L${s.line}  ${s.mutation}  | ${s.snippet}`);
  clean = clean && r.clean;
}
console.log('\n── fuzz gate (a vulnerable user must never crash the engine) ──');
for (const [name, fn] of Object.entries({
  'resolveLever': (x) => resolveLever(x), 'deadline': (x) => deadline(x, x),
  'guidance': (x) => guidance(x, x), 'toneCheck': (x) => toneCheck(x), 'humanRoutes': (x) => humanRoutes(x),
})) {
  const f = await fuzz(fn);
  console.log(`  ${name}: ${f.neverThrows ? 'never throws — OK' : 'THREW on ' + f.throwsOn.map(t => t.input).join(', ')}`);
  clean = clean && f.neverThrows;
}
console.log(clean ? '\n=== ALL CLEAN ===' : '\n=== SURVIVORS / THROWS REMAIN ===');
process.exit(clean ? 0 : 1);
