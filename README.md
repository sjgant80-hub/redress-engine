# redress-engine

### ▶ Live app: **https://sjgant80-hub.github.io/redress-engine/**
Open it, pick your situation (or describe it), get your real rights + deadline + a calm
cited letter + free human help. No install, works offline, optional on-device WebLLM / BYOK.

**A legal-process navigator for everyone. The law is public — the *interface* is
locked behind money and jargon. This is the interface.**

Millions face the same walls — benefits lockouts blamed on "user error," inaccurate
assessments, subscriptions that won't cancel, data they can't get deleted, reasonable
adjustments refused — and most quit before the end of the maze. Not because the law
isn't on their side, but because using it is gated behind solicitors' fees and jargon.
This turns *"I'm being screwed by X"* into: **here is your real right, the correct calm
action, the deadline, and the free human help.**

## The safety spine IS the product

The people this serves cannot afford for it to be wrong — their rent, benefits, or
health data ride on getting it right. So the load-bearing core, built and gated first:

- **Accuracy gate (κ-gate on every legal claim).** The engine only *asserts* a lever
  that resolves to a **verified statute** in its table, each with a real citation and
  source. Anything else is **flagged "uncertain — get human help," never bluffed.** An
  unknown "right" comes back `cited:false, UNVERIFIED`, not a confident fabrication.
- **Honest caveats travel with the claim** — e.g. the right to erasure (Art.17) is
  *not absolute*; the engine says so (Art.17(3) lets them keep some data).
- **Calm, not nuclear.** A tone gate flags aggressive wording — calm+firm gets the
  outcome; aggression gets a request bounced.
- **Human routing is non-skippable.** Every result surfaces free expert help
  (Citizens Advice, ICO, Shelter, EASS, the Financial Ombudsman, welfare-rights); on
  high-stakes matters it says *get a human in your corner too* — and means it.
- **No false confidence.** It never guarantees an outcome; the deadline is a real
  statutory clock or an honest "unknown," never a fabricated date.
- **Total.** A vulnerable, panicking user cannot crash it — every function is fuzz-proven
  to never throw on hostile input.

## What it maps (UK, first pass)

| Scenario | Real lever | Escalates to |
|---|---|---|
| Benefits lockout / "IT error" | SAR (UK GDPR Art.15) + Art.12(3) clock + maladministration | DWP → ICE → ICO |
| Data won't be deleted | Erasure (Art.17 — *with* its exemptions) | ICO |
| Reasonable adjustments refused | Equality Act 2010 ss.20–21 | EASS → tribunal |
| Subscription won't cancel/refund | Consumer Rights Act 2015 (+ chargeback / s.75, flagged as mechanisms) | Financial Ombudsman |
| They won't hand over your data | SAR (Art.15) — the one-month clock | ICO |

## Run it

```bash
npm test        # 18 safety-invariant tests (node --test)
npm run gate    # proof-of-play mutation + fuzz gate — must be CLEAN
npm run demo    # two real scenarios, the accuracy gate, and the calm-tone gate
```

**Gate status** — 18 tests; `kernel/redress.mjs` **20/20 mutants killed CLEAN**; fuzz:
the engine never throws on hostile input.

## Honest limits (stated to the user, always)

- **Not legal advice** and not a substitute for a lawyer or adviser — a plain-language
  navigator for rights you already have, that routes you to real experts.
- **UK law.** Jurisdiction-bound; must be built per-jurisdiction, never faked global.
- **High-stakes matters** (benefits, health, eviction, anything time-critical) → the
  tool says "use free human help too," because false confidence on someone's rent or
  health is the one failure that actually hurts them.

Sibling to the estate's sovereign legal self-help tools (falljustice, divorcerbot):
own the navigator, don't rent the £250/hr solicitor — built honest, so it helps the
vulnerable instead of harming them. MIT.
