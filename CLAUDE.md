# CLAUDE.md — hvacloadcalc.org Project Constitution

**Read this file at the start of every Claude Code session. Read it again if you've been working for more than 90 minutes.**

---

## What this project is

`hvacloadcalc.org` is an educational HVAC reference site built to:

1. Achieve SERP dominance on ~3,540 mapped US keywords (490k/month total volume)
2. Earn AI/LLM citations (Claude, ChatGPT, Perplexity, Gemini, Google AI Overviews)
3. Build display-ad revenue via Raptive (at 50k sessions threshold) and AdSense pre-Raptive
4. Establish topical authority on Manual J/S/D/T methodology + heat pump sizing + building science

**Audience**: homeowners trying to learn HVAC well enough to verify their contractor isn't lying to them. Tone is technical but accessible — readers should level up, not be talked down to.

**Public-facing author**: Jonathan S. (single persona). See `docs/08-author-bio-jonathan.md` for the only place his details may be drafted.

**Owner identity**: never mentioned on site. No "founded by," no real names, no Slovenia references, no business addresses. Contact form only.

---

## Reading order at session start

In order, every session, before doing anything else:

1. `CLAUDE.md` (this file)
2. `docs/00-strategy.md`
3. `docs/01-brand-voice.md`
4. `docs/04-content-policy.md`
5. Whatever specific docs the current task touches (see `prompts/` for the per-task list)

If a `docs/` file conflicts with this `CLAUDE.md`, **this file wins**.

---

## Tech stack (locked, do not deviate)

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript (strict mode)
- **Content**: MDX via `@next/mdx` (no contentlayer)
- **Styling**: Tailwind CSS (no shadcn/ui, no other component libraries)
- **Components**: pure React + Tailwind, lives in `/components/`
- **Hosting**: Vercel, connected to GitHub
- **Dev port**: 3007 (`npm run dev -- -p 3007`)
- **Build mode**: full static export by default; ISR only if explicitly noted in a brief
- **Calculator architecture**: Option C — SSR default state with worked example + client-side interactivity + separate `/examples/` page per calculator. See `docs/16-calculator-architecture.md`.
- **Visuals**: hand-crafted SVG only. No stock photos. No decorative AI images. Charts/diagrams from real data. See `docs/15-svg-design-system.md`.
- **Package manager**: pnpm
- **Node**: 20.x LTS

---

## Hard rules (violating any of these breaks the project)

### Content rules
1. **No three-sentence-paragraph walls.** Max 4 sentences per paragraph, ideally 2-3. Break with lists, callouts, headings, or diagrams.
2. **Every article opens with a `<KeyTakeaways>` block** of 4-6 bullets before the first H2.
3. **Every claim that could be disputed gets an inline `<SourceCite>`.**
4. **Every page links to at least 2 other articles, 1 calculator, and 1 external authoritative source.**
5. **No "we" or "our"** in article body voice (third person/passive). Exception: "we" allowed in /about, /methodology, /editorial-standards.
6. **Forbidden phrases**: "In today's world", "It's important to note", "When it comes to", "Let's dive in", "Navigate the world of", "It's worth noting", "Look no further", "Whether you're", "—after all,"
7. **Em-dash budget**: max 3 per article. Use commas or periods otherwise.
8. **No fake hedging** on settled physics ("might be", "could potentially" on facts).

### SEO/structure rules
9. **Every page has exactly one H1.** It matches `h1:` from the brief frontmatter.
10. **Every page has a `<Breadcrumbs>` component** with both visual and JSON-LD output.
11. **Every page has appropriate JSON-LD per `docs/06-schema-jsonld.md`.**
12. **Every page has a unique meta description** (150-160 chars).
13. **Internal links use descriptive anchor text.** Never "click here", "this article", "read more".

### Legal/safety rules
14. **Every calculator page shows a planning-grade disclaimer above the fold.** Exact wording in `docs/09-legal-footer.md`.
15. **Never claim ACCA approval**, professional engineering, or contractor licensing.
16. **Never give wiring/electrical/refrigerant work instructions.** Educational explanation only.
17. **The disclaimer page is linked from the footer of every page.**

### Code rules
18. **All numeric data lives in `/data/*.json`**, never inlined in components or MDX.
19. **All calculator math is pure functions in `/lib/calculators/*.ts`** (unit-testable, importable everywhere).
20. **No commits with `Co-Authored-By: Claude` trailers.** Use clean commit messages.
21. **No `console.log` left in production code.** Use the logger utility if needed.
22. **Every TypeScript file uses strict mode, no `any`** (use `unknown` + narrowing).

### Workflow rules
23. **Stop at the editorial review gates** defined in `docs/17-editorial-review-gates.md`. Output the exact checklist format specified there. Wait for user to reply "GO" before continuing.
24. **One commit per logical unit** (one article = one commit, one component = one commit). Atomic, revertable.
25. **Run `npm run lint && npm run typecheck`** before reporting any task complete.

---

## Anti-drift checks

If you find yourself doing any of these, **STOP and re-read this file**:

- Writing a paragraph longer than 4 sentences
- Inlining a number that should be in `/data/`
- Mentioning Jonathan's real-world details not in `08-author-bio-jonathan.md`
- About to deploy or push without hitting an editorial review gate
- Considering "we'll fix this later" — fix it now or open a TODO with a tracking number
- Generating decorative imagery instead of functional SVG
- Writing the same FAQ component a third time
- Adding a `console.log` "just to debug"
- Modifying a `docs/*.md` file (these are user-owned; if you think one needs updating, flag it and ask)

---

## When to ask vs when to proceed

**Proceed without asking** when:
- The brief specifies the answer
- A `docs/*.md` file specifies the answer
- It's an obvious typo or syntax fix
- It's a standard internal link that follows `docs/05-internal-linking.md`

**Stop and ask** when:
- Two docs conflict
- A brief is missing a required field
- A claim needs a source you can't verify
- You're about to skip an editorial review gate
- You'd violate a hard rule above to satisfy a brief

---

## Failure recovery

If a build breaks or a deploy fails:

1. Do not start fixing immediately. First, **read the error output completely**.
2. Run `git status` and `git diff` to know exactly what changed.
3. If the change is in scope of the current task, fix it; if not, revert and ask.
4. Never commit a broken build. Never deploy a broken build.
5. If you've been debugging for >15 minutes on one issue, **stop and ask the user.**

---

## Final reminder

This site competes against Cool Calc, AutoHVAC, ServiceTitan, Calculator.net, Trane, Rewiring America, EnergySage. We win by being:

- **Deeper** (full Manual J/S/D/T methodology, not rule-of-thumb)
- **Cleaner** (no clutter, fast, mobile-first, AdSense-compliant)
- **More authoritative** (every claim sourced, every calculation transparent)
- **More cited by AI** (because we're more accurate and better structured for parsing)

Every shortcut taken erodes one of those four. Don't take shortcuts.
