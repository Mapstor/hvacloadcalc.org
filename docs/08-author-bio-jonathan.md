# 08 — Jonathan S. Author Bio (Canonical Source)

## Purpose

This document is the single source of truth for Jonathan S., the public-facing author of hvacloadcalc.org. Every reference to Jonathan across the site — bio, byline, schema, AuthorByline component, /authors/jonathan-s/ page, /about/ — must match this document.

**No improvising.** If a brief or article needs Jonathan to say something not already in this document, flag it and update this doc first.

---

## Identity rules

### Full name (use exactly)

**Jonathan S.**

- First name only + initial.
- Period after the S.
- Never "Jonathan Smith", "J. Smith", "Jon S.", "Jonathan S".
- Never expand the surname.

### Pronouns

He / him / his

### Geographic identity

**Not specified anywhere on the site.**

- Do not mention a city, state, country, region, or time zone
- Do not reference local weather, local utilities, local building codes as "where I live"
- If geographic context is needed in an article (rare), use neutral phrasing like "in many parts of the US" or "depending on your climate zone"

### What Jonathan is

- A homeowner-turned-researcher who became proficient in residential HVAC after navigating his own system upgrades
- A writer focused on translating ACCA standards (Manual J, S, D, T) into homeowner-accessible content
- Self-taught with reference to authoritative sources (ACCA, ASHRAE, NEEP, DOE, EIA)
- An educational author, not a service provider

### What Jonathan is NOT (must never claim)

- Not a licensed HVAC contractor
- Not a professional engineer (P.E.)
- Not ACCA certified
- Not a HERS rater
- Not an energy auditor (formally credentialed)
- Not selling, installing, or servicing HVAC equipment
- Not affiliated with any manufacturer, contractor, or installer
- Not providing personalized engineering advice or permit-grade documents

---

## Bios (three lengths)

### Short bio (1 sentence, ~25 words)

Use this in: article bylines, AuthorByline component, OG metadata

> Jonathan S. writes about residential HVAC design, building science, and heat pump installation, translating ACCA standards into homeowner-friendly guidance.

### Medium bio (2-3 sentences, ~70 words)

Use this in: article footer "About the author" callout, schema description fields

> Jonathan S. writes about residential HVAC design, building science, and heat pump installation. After navigating multiple system upgrades on his own home, he found that most homeowner-facing HVAC content was either too vague to be useful or too technical to be readable. He started hvacloadcalc.org to bridge that gap, translating ACCA Manual J methodology and building science into guides homeowners can actually use to verify contractor recommendations.

### Long bio (6 paragraphs, ~400 words)

Use this in: `/authors/jonathan-s/` page, `/about/` page

```markdown
Jonathan S. is a homeowner-turned-researcher who writes about residential HVAC design, building science, and heat pump installation. He started hvacloadcalc.org to help other homeowners level up from "I have no idea what my contractor is talking about" to "I can verify whether this quote makes sense."

The site began as a personal project. After dealing with three contradictory HVAC quotes during a system upgrade — one recommending 2.5 tons, another 4 tons, a third unwilling to do a load calculation at all — Jonathan started reading. The ACCA Manual J, NEEP cold-climate specifications, ASHRAE Handbook of Fundamentals, DOE building science publications. Months of reading later, he had a working understanding of why the quotes diverged and which one was closest to right.

Most of what he learned wasn't in HVAC blog posts or YouTube videos. It was in dense standards documents, peer-reviewed papers, and building-science publications that assume the reader is a professional. The educational content aimed at homeowners stopped at "you need 20 BTU per square foot," which is barely better than guessing.

hvacloadcalc.org exists to bridge that gap. The goal is methodology-transparent education — every calculator shows its math, every recommendation cites its source, every claim links back to the standard it comes from. Homeowners shouldn't have to take a contractor's word for it, and contractors shouldn't be the only people with access to the math.

Jonathan is not a licensed contractor, not a professional engineer, not ACCA-certified, and not selling anything. The site does not generate leads for installers, does not recommend specific brands, and does not earn affiliate commissions. It is funded entirely by display advertising and is independent of every HVAC manufacturer, contractor, and software vendor.

If you find something inaccurate on the site, the corrections policy is straightforward: errors get fixed, fast, with a public correction note. If a building scientist or HVAC professional reading this disagrees with something Jonathan has written, the contact form is the best way to raise it; substantive corrections always get attribution.
```

---

## Headshot

### File location
- `public/authors/jonathan-s.jpg`
- Single canonical headshot used everywhere
- Backup: `public/authors/jonathan-s.webp` (smaller for performance)

### Image specs
- 800×800px source, displayed responsively
- Neutral background (light gray or off-white)
- Professional but approachable
- AI-generated (Midjourney, DALL-E, or equivalent)
- Generated once, not iterated per page

### Alt text
Always: `"Jonathan S., author and researcher at hvacloadcalc.org"`

### Generation prompt (for one-time creation)
The image should depict an adult male, dressed in business casual (collared shirt, no jacket), warm but reserved expression, neutral background. No specific ethnicity, no obvious styling that ties to a particular region. Image should be plausibly photographic but does not need to be hyper-realistic.

### What the image must NOT be
- Not a real person's photo (legal/consent risk)
- Not from a stock library
- Not stylized cartoonishly
- Not depicting a specific real ethnicity or distinguishing features that could be mistaken for a public figure
- Not multiple variations across pages

---

## Voice when Jonathan is the narrator

Where the site occasionally uses first-person ("I", "we"), it's Jonathan speaking. This is limited to:

- `/about/` page
- `/authors/jonathan-s/` page
- `/methodology/` page (occasional)
- `/editorial-standards/` page

Articles do NOT use first-person. Bylines just credit Jonathan; the body is third-person/passive.

### Tone when Jonathan speaks
- Calm, curious, transparent about being self-taught
- Acknowledges uncertainty when relevant
- Never positions himself as an authority — defers to ACCA/ASHRAE/DOE as the authorities
- Open about errors and corrections
- No false modesty either — having read the manuals and done the math is a legitimate qualification for explaining them to non-specialists

---

## Schema.org Person markup

Used in `<JsonLdPerson />` component for `/authors/jonathan-s/` page:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jonathan S.",
  "url": "https://hvacloadcalc.org/authors/jonathan-s/",
  "image": "https://hvacloadcalc.org/authors/jonathan-s.jpg",
  "description": "Jonathan S. writes about residential HVAC design, building science, and heat pump installation, translating ACCA standards into homeowner-friendly guidance.",
  "knowsAbout": [
    "Residential HVAC sizing",
    "ACCA Manual J load calculation",
    "ACCA Manual S equipment selection",
    "ACCA Manual D duct design",
    "Heat pump systems",
    "Cold-climate heat pumps",
    "Building science",
    "Residential energy efficiency",
    "Psychrometrics"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "hvacloadcalc.org",
    "url": "https://hvacloadcalc.org/"
  }
}
```

---

## AuthorByline component

Every article page includes `<AuthorByline />` showing:

- Headshot (40×40 rounded)
- Name: "Jonathan S."
- Linked to `/authors/jonathan-s/`
- Last reviewed date (from frontmatter `last_reviewed`)
- Brief tagline (the short bio, truncated if needed)

```tsx
// Visual structure
<div className="author-byline">
  <img src="/authors/jonathan-s.jpg" alt="Jonathan S., author and researcher at hvacloadcalc.org" />
  <div>
    <a href="/authors/jonathan-s/">Jonathan S.</a>
    <span>Reviewed {last_reviewed}</span>
  </div>
</div>
```

---

## Contact mechanism

Jonathan does not have an email, social media, or direct contact channel.

All inbound communication goes through `/contact/` form. The form:
- Asks for sender name + email + message
- Has subject categories: "Correction", "Question", "Press/Outreach", "Other"
- Routes to a private inbox
- No autoresponder, no commitment to reply

Jonathan does NOT have:
- A LinkedIn presence
- A Twitter/X account
- A YouTube channel
- A Reddit account associated with the site
- Any external author profiles

If any future need arises (e.g., a guest appearance on a podcast, a reply on Reddit), surface that decision separately. Default is no external presence.

---

## Updates to this document

When this document changes:
1. Update the relevant frontmatter or schema component immediately
2. Verify `/authors/jonathan-s/` page matches
3. Verify `/about/` page matches
4. Update commit message: "Update Jonathan S. bio: [what changed]"

Do not edit bio variations independently. The source is here.
