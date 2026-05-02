You are an agent working on IkiHomes Landing in the project: ikihomes-landing

## TASK

Create a new blog post for the IkiHomes blog system:

**Slug**: `compradores-internacionales-2026`
**Title (ES)**: "Compradores internacionales en Costa Rica: qué significa esta oportunidad para los agentes inmobiliarios"
**Title (EN)**: "International Buyers in Costa Rica: What This Opportunity Means for Real Estate Agents"
**Target publish date**: 2026-05-05

**Editorial pivot from the original calendar entry**: The original brief ("¿Por qué los compradores internacionales eligen Costa Rica?") would have been a buyer-facing post. This is **agent-facing**. The reader is a working agent figuring out how to capture international-buyer demand, not a buyer deciding where to buy. Voice, structure, and CTAs reflect that pivot.

You will produce TWO files, one per language, following the same content-tree structure as `escazu-2026`, `mls-costa-rica-reality`, `stand-out-agent`, `santa-ana-mercado-silencioso`, `guanacaste-2026`.

## PROCESS (mandatory)

0. **Read first**: Before writing, read the reference posts to internalize voice, paragraph rhythm, and structural patterns:
   - `content/blog/escazu-2026/es.md` and `en.md`
   - `content/blog/mls-costa-rica-reality/es.md` and `en.md`
   - `content/blog/stand-out-agent/es.md` and `en.md`
   - `content/blog/santa-ana-mercado-silencioso/es.md` and `en.md` (sets the new tonal bar)
   - `content/blog/guanacaste-2026/es.md` and `en.md` (sets the new sourcing bar)
   Also read `src/lib/blog.ts` to confirm the frontmatter contract and `src/app/[lang]/blog/[slug]/page.tsx` to understand the auto-injected CTA card.
1. **Plan**: Outline (one lede + 7 H2 sections) before writing prose.
2. **Write ES first**, then derive EN as a native rewrite, not a literal translation.
3. **Verify**: Confirm word count, frontmatter, and that the posts render in `next dev` at `/es/blog/compradores-internacionales-2026` and `/en/blog/compradores-internacionales-2026`.

## SOURCE OF TRUTH

- `docs/PLATFORM_CANONICAL.md` (in `ikihomes-app`) is the binding source of truth for any product claim.
- Phase 1 is a **controlled zone launch**. Do not promise platform features, agent counts, transaction volume, or international-buyer pipeline that aren't canonically committed.
- **Critical claim guardrail for this topic**: Do not imply IkiHomes already has international-buyer demand on the platform. The post is about what international-buyer demand *means for an agent's positioning*, not about IkiHomes already delivering it. Phase 1 is a controlled launch — overclaiming buyer-side liquidity here is the highest-risk failure mode for this specific post.
- Buyer requests: Pro-only, capped at 3 active per buyer — but **do not describe product mechanics in the body at all**. The post is market analysis.
- Agency/team features and trials are deferred — do not reference them.

## FILE DELIVERABLES

### File 1: `content/blog/compradores-internacionales-2026/es.md`

```yaml
---
title: "Compradores internacionales en Costa Rica: qué significa esta oportunidad para los agentes inmobiliarios"
description: "Compradores internacionales Costa Rica 2026: el contexto macro de IED, perfiles de comprador y cómo se prepara el agente para capturar este flujo."
keywords: ["compradores internacionales Costa Rica", "invertir en Costa Rica", "agente inmobiliario compradores extranjeros", "expats Costa Rica", "IED Costa Rica 2025"]
date: "2026-05-05"
author: "IkiHomes"
image: "/blog-compradores-internacionales-2026.png"
lang: "es"
---
```

> Description is ~155 chars and contains the primary keyword "compradores internacionales Costa Rica." Stay ≤ 160. Date `2026-05-05` will render as "4 de mayo de 2026" in `es-CR` due to UTC midnight conversion. Existing posts accept that shift; match for consistency.

### File 2: `content/blog/compradores-internacionales-2026/en.md`

```yaml
---
title: "International Buyers in Costa Rica: What This Opportunity Means for Real Estate Agents"
description: "International buyers Costa Rica 2026: the FDI macro context, buyer profiles, and how agents prepare to capture this flow professionally."
keywords: ["international buyers Costa Rica", "buy property Costa Rica", "expat real estate Costa Rica", "invest Costa Rica 2026", "Costa Rica foreign investment"]
date: "2026-05-05"
author: "IkiHomes"
image: "/blog-compradores-internacionales-2026.png"
lang: "en"
---
```

> Description is ~140 chars and contains the primary keyword "international buyers Costa Rica." Stay ≤ 160.

### File 3 (optional): `public/blog-compradores-internacionales-2026.png` — 1376×768, matching existing post hero conventions. Flag if image generation isn't available.

## CONTENT BRIEF — what the post must say

### The angle

International capital chose Costa Rica again in 2025. Per **PROCOMER (April 2026 announcement)**, FDI inflows reached **$5,121.8 million** — the second consecutive year above $5B. That's not a residential-buyer number directly, but it's the macro signal that anchors why international residential demand is structurally resilient. Real estate accounted for **6.9% of FDI inflows** (~$353M), and tourism another 7.5%.

The post is not a sales pitch *for Costa Rica*. The reader already lives here and already sells property. The post is about **what this configuration means for how an agent positions, prepares, and captures international-buyer demand** — including the parts of the conversation that broker-marketing-copy avoids (homicide rate trajectory, comparison to Panama, FX/legal risk for the buyer).

The voice is sober, op-ed register: closer to a *Business Costa Rica* feature than a tourism brochure.

### Required structural beats (~950–1,050 words ES, slightly tighter EN)

Open with a one-paragraph lede that names the dynamic: international capital chose CR for the second consecutive year, and the agents who capture residential flow from that wave are the ones who treat international buyers as a *professional category*, not as a romantic add-on.

Then the H2s, in this order:

1. **El expediente macro: lo que se está moviendo** / *The Macro File: What's Actually Moving* — the citable backbone of the post. Cite **PROCOMER's April 2026 announcement** inline:
   - **2025 FDI inflows: $5,121.8M** (BCCR data, announced by PROCOMER).
   - **Second consecutive year above $5B**; 2024 revised upward to $5,113.5M.
   - **Reinvestments $4,328M** — the highest level recorded — represent the largest share. *That's the more important signal than new capital, because reinvestment means existing multinationals are doubling down, not just trying CR for the first time.*
   - New capital $895M (-18%, consistent with global Greenfield decline of -16% per UNCTAD).
   - Sector mix: Free Trade Zone 66.4%, Definitive Regime 15.2%, **Tourism 7.5%, Real Estate 6.9%, Financial 3.1%.**
   - Anchor names from the medical-device cluster: **Insulet, Boston Scientific, Zimmer Biomet, Johnson & Johnson, Thermo Fisher Scientific, Trelleborg, Medtronic.** Between 2023–2025: 175 new companies + 500+ reinvestments.
   - URL (verified live): `https://procomer.com/en/costa-rica-supera-segundo-ano-consecutivo-5-000-millones-en-ied/`
   The agent's framing of this section: **FDI ≠ residential demand directly, but FDI = the corporate-employee + extended-family residential demand pipeline.** When Boston Scientific brings 200 mid-senior engineers to a new facility, those engineers rent or buy. That's the connection.

2. **Por qué Costa Rica todavía está en la lista corta** / *Why Costa Rica Is Still on the Short List* — the structural reasons international buyers consider CR. Stay specific, not promotional:
   - Foreigners hold the **same property rights as nationals** (no nominee structures, no special-purpose entities required for residential).
   - **No foreign-exchange controls**; transactions in **USD or CRC**, free convertibility.
   - Public healthcare via **CAJA** for residents.
   - **Democratic stability track record**: military abolished 1948, uninterrupted civilian government for over 75 years. (Cite the framing soberly — it's a real differentiator vs. regional comparables.)
   - English-speaking professional services depth (lawyers, escrow agents, bilingual notaries) — though uneven across zones.
   - Time-zone alignment with US Central / Eastern; ~3-hour flight from major US hubs.
   This section earns the reader's trust by saying useful, accurate things — not by claiming things that won't survive a buyer's own research.

3. **Lo que se omite en los folletos (y el agente debe poder responder)** / *What the Brochures Skip (and the Agent Must Be Able to Answer)* — the honesty section. The serious international buyer is *already googling* the things below. The agent who pretends they don't exist loses credibility. The agent who answers them with criteria wins:
   - **Public-safety trajectory**: Costa Rica recorded **16.6 homicides per 100,000 residents in 2024**, the second-highest in country history. The agent has to know this number, know the zones where the problem is concentrated (Limón province, parts of Puntarenas), and be able to explain why the residential corridors international buyers actually purchase in (Escazú, Santa Ana, Lindora, Guanacaste coast, Atenas, Grecia) operate on a different risk profile.
   - **Panama is a real comparable**: lower cost, US dollar, faster residency, territorial taxation. The agent should be able to articulate the *trade-offs* — Panama wins on cost and tax structure; Costa Rica wins on nature, public healthcare access, and the diaspora/network depth that comes from 50+ years of expat continuity.
   - **Closing process is bureaucratic relative to US norms**: escrow exists but isn't standardized; notary process is mandatory; SETENA environmental review for some properties; HOA due diligence is non-trivial. The agent who has a short list of trusted bilingual lawyers, escrow agents, and notaries closes faster than the agent who improvises.
   - **Property tax is a 0.25% annual flat** at the national level (small, but exists), plus the *impuesto solidario* on luxury homes above a threshold. Foreign buyers ask. Know the answer.
   This section is what makes the post different from every brokerage blog post on the topic. *Honesty is the differentiator.*

4. **Los tres perfiles de comprador (y cómo deciden distinto)** / *The Three Buyer Profiles (and How Each One Decides)* — same triptych used in the Guanacaste post but applied at a national level:
   - **The retiree** (typically 55–70, North American, capital-ready): turnkey, established community, healthcare proximity, legal certainty. Decision driver: *can I imagine my next 15 years here?* Loses interest if the agent oversells "investment upside" — they're not optimizing for return, they're optimizing for life quality.
   - **The high-earning digital nomad / remote executive** (typically 30–45, may relocate family): connectivity (fiber + LTE backup), walkable community, international school proximity (CDS, Lincoln, Country Day), pet-relocation logistics. Decision driver: *can I run my business from here without friction?*
   - **The short-term-rental investor** (often non-resident, often portfolio-building): evaluates on AirDNA occupancy, RevPAR, HOA STR-allowability, tax treatment of rental income. Decision driver: *will the property cashflow at the cap rate I model?* Aesthetics secondary.
   The agent who can switch register between the three profiles in the same week is the agent who builds a portfolio. The agent who treats all three with the same pitch trains buyers to ignore them.

5. **Lo que el comprador internacional realmente está comprando (y no es la propiedad)** / *What the International Buyer Is Actually Buying (and It Isn't the Property)* — the competitive insight. The international buyer cannot validate the property easily — they don't know the neighborhood, they don't speak fluent Spanish, they don't know which HOA is a nightmare and which one is solid. **What they're buying is the agent's judgment.** The listing is the artifact; the agent is the product. Frame this as why agents in this segment compete on credibility and process, not on inventory. This is the same thesis as `stand-out-agent`, applied specifically to the international-buyer context.

6. **Cómo se prepara el agente para este flujo** / *How Agents Prepare for This Flow* — operational moves, not motivational copy. Use the enumerated-paragraph pattern from `stand-out-agent/es.md` ("Primero / Segundo / Tercero / Cuarto"):
   - **Primero**: build a credible bilingual professional network — at least one lawyer, one escrow agent, one bilingual notary, one tax advisor for foreign buyers, one short-term-rental property manager. Don't improvise these relationships when a buyer is already in town.
   - **Segundo**: respond in hours, not days, in English. International buyers comparing CR to Panama are running both processes in parallel. The first responsive agent in each market sets the anchor.
   - **Tercero**: develop an honest answer to the public-safety, Panama-comparison, and closing-process questions. Don't deflect; don't dismiss. Buyers respect agents who name the trade-offs.
   - **Cuarto**: pick a microcorridor and own it. "I sell Costa Rica" is not a positioning. "I sell Lindora and the Forum corridor" / "I sell Tamarindo and Las Catalinas" is.

7. **Closing H2** — pure analytical wrap-up. **Do not mention IkiHomes by name in the body.** **Do not link to ikihomescr.com from the prose.** The auto-injected CTA card on the page template handles the brand moment. The closing H2 should leave the reader inside the analysis. Suggested ES titles: "Hacia adelante", "La oportunidad operativa". Suggested EN: "What Comes Next", "The Operational Opportunity". Closing line should be observational and earned: *"El flujo internacional no se va a redirigir solo. Se redirige hacia agentes que entienden a quién le están hablando y por qué."* (or equivalent). Stop there.

### Tone rules (non-negotiable)

- **Op-Ed in El Financiero, not pitch deck.** The reader is a working agent; voice is sober, observational, lightly contrarian — not motivational, not urgent.
- **Agent-to-agent voice.** No "discover paradise" energy. No tourism-board phrasing.
- **No infoproduct / guru phrasing.** Banned (and any close variant): *"estás dejando dinero sobre la mesa", "estás dejando comisiones sobre la mesa", "el secreto que mueve el mercado", "lo que nadie te está diciendo", "los agentes inteligentes ya saben", "los que actúan ganan", "no te quedes atrás", "el momento es ahora".* Same in EN: no "leaving money on the table", "the secret driving the market", "smart agents already know", "the time is now".
- **Specific over generic.** "Insulet, Boston Scientific, Johnson & Johnson" over "the medical sector." "Lindora and the Forum corridor" over "the Central Valley." "AirDNA RevPAR" over "rental returns."
- **Numbers as ranges with sources.** Always cite or hedge. The PROCOMER and homicide-rate numbers in particular need inline source attribution.
- **No IkiHomes name in the body.** No mid-post product pitches, no closing pitch, no inline link to `ikihomescr.com`. The auto-CTA card after the body is the *only* commercial moment.
- **No bullet lists in body prose unless mirroring `stand-out-agent/es.md`'s "Primero / Segundo / Tercero" enumerated paragraphs.** Default to flowing prose. The exception is justified in section 6 of this brief (Cómo se prepara el agente).
- **No emojis. No em-dash overuse.** Match the punctuation density of the existing posts.
- **Spanish accents must be correct** — Costa Rican Spanish, not neutralized Spanish.

### What must NOT appear

- **The word "IkiHomes" anywhere in the body.** Brand presence is carried entirely by the auto-injected CTA card.
- **Inline link to `ikihomescr.com`** — same reason.
- **Any claim that IkiHomes already has international buyers on the platform.** This is the highest-risk overclaim for this specific topic. Phase 1 is a controlled launch. Anything that implies "buyers are waiting" or "demand is already there" is out of bounds.
- Buyer-request mechanics, caps, or feature descriptions of any kind.
- Trials, free agent onboarding, or agency/team features.
- Any feature not in `PLATFORM_CANONICAL.md`.
- AI-anything (descriptions, scoring, matching).
- Tourism-board phrasing ("paradise", "pure life", "your slice of heaven", "pura vida lifestyle").
- Generic real estate clichés ("the time to buy is now", "limited inventory", "once-in-a-lifetime opportunity").
- Sweeping claims about Costa Rica's safety ("safest country in Latin America") — the homicide rate trajectory contradicts that. Specific zone-level claims are fine; sweeping national-level safety claims are not.
- Comparing Costa Rica to "first-world" countries as a positioning device — patronizing and wrong.
- Specific negative claims about Panama, Mexico, or other regional comparables — discuss trade-offs neutrally.
- The banned infoproduct phrases listed in the Tone rules.

## STYLE & SEO CONSTRAINTS

- **Spanish length**: 950–1,050 words. **English length**: 900–1,000 words.
- H1 is set by the title in frontmatter — do **not** include an H1 inside the markdown body.
- Use `## ` H2s for section headers.
- Italicize for emphasis sparingly (one or two `*word*` per post max).
- Keep paragraphs to 2–4 sentences. No walls of text.
- **No outbound link to `ikihomescr.com` from the body.** The auto-CTA card after the article handles that.
- **One optional internal link** to `/[lang]/blog/santa-ana-mercado-silencioso` or `/[lang]/blog/escazu-2026` if there's a natural anchor in section 1 or 4 (corporate-employee residential demand is the natural connection point). Skip if no organic anchor.
- Citation links inline, anchor text is the source name in the sentence.
- Description (frontmatter) ≤ 160 characters, contains primary keyword. The descriptions provided already meet this.

## SOURCE ATTRIBUTION (mandatory)

**Minimum: four anchored citations** in the body. This post leans heavily on macro data, so the citation floor is higher than Santa Ana (2) or Guanacaste (3).

**Acceptable Costa Rican / international authority sources** (use these, not generic broker blogs):
- **PROCOMER — Costa Rica reaches over $5 billion in FDI inflows for the second consecutive year** (April 2026 announcement). Verified URL: `https://procomer.com/en/costa-rica-supera-segundo-ano-consecutivo-5-000-millones-en-ied/`. **Strongest single citation in the post.** Cite for: $5,121.8M total, $4,328M reinvestments, sector mix, 175 new companies + 500 reinvestments 2023–2025, named multinationals (Insulet, Boston Scientific, etc.).
- **BCCR — Banco Central de Costa Rica** (`bccr.fi.cr`) — the underlying data source PROCOMER references; cite directly if quoting FDI series-level data.
- **2025 US State Department Investment Climate Statement — Costa Rica** (`https://www.state.gov/reports/2025-investment-climate-statements/costa-rica`) — citable for FDI macro context, US share of FDI (~70%), regulatory framework.
- **OIJ / Ministerio de Seguridad Pública — homicide statistics** — primary source for the 16.6/100K 2024 homicide rate. The 2024 rate was widely covered in Costa Rican press (La Nación, Semanario Universidad, Tico Times). Verify a specific URL before citing.
- **Tico Times** (`ticotimes.net`) — English-language CR press for English version of the post.
- **El Financiero** (`elfinancierocr.com`) — Costa Rican business newspaper.
- **CINDE** (`cinde.org`) — multinational investment landing data.
- **ICT — Instituto Costarricense de Turismo** (`ict.go.cr`) — international arrival data, supports the tourism-driven residential demand argument.

**Citation rules**:
- Inline links, anchor text is the source name in prose (e.g., *"según el [anuncio de PROCOMER de abril 2026](url), la IED alcanzó..."*).
- **Verify the URL exists before citing.** If the source is real but the specific URL can't be located, hedge or attribute by name only.
- **Do NOT cite real-estate-broker blogs** (TheLatinvestor, propertiesincostarica, lxcostarica, 2costaricarealestate, Blue Water Properties, Sol Realty, Coldwell Banker brokerage marketing pages — though the Coldwell Banker Dec 2025 *market report* is acceptable as it's widely-referenced industry data, like in the Guanacaste post).
- Four to six anchored citations is the sweet spot for this post.

**Self-review obligation**: in the final QA note, list every numeric or named-entity claim and classify each as (a) cited inline, (b) sourced from the verified-data appendix without inline citation, (c) directional only.

## VERIFIED DATA APPENDIX (use only these)

Fact-checked April 2026.

**PROCOMER FDI 2025 — VERIFIED PRIMARY SOURCE**
- URL (verified live): `https://procomer.com/en/costa-rica-supera-segundo-ano-consecutivo-5-000-millones-en-ied/`
- Announcement date: **April 6, 2026.** Use phrasing like "según PROCOMER en abril de 2026" or "anunciado en abril de 2026 por PROCOMER".
- **2025 total FDI: $5,121.8M.** Second consecutive year above $5B.
- **2024 revised upward to $5,113.5M** (from previously reported $5,008.5M). The upward revision is itself meaningful — initial reporting underestimated.
- **Reinvestments: $4,328M** — *highest level ever recorded.* Largest share of FDI.
- **New capital: $895M (-18%)**, consistent with global Greenfield decline (-16% per UNCTAD).
- **Sector breakdown of total inflows:**
  - Free Trade Zone regime: **66.4%**
  - Definitive Regime: **15.2%**
  - Tourism: **7.5%**
  - **Real Estate: 6.9%** (~$353M)
  - Financial sector: **3.1%**
  - Inward processing: **1.0%**
- **2023–2025 cumulative**: 175 new companies attracted + 500+ reinvestments.
- **Notable multinational anchors** (named in the announcement): **Insulet, Boston Scientific, Zimmer Biomet, Johnson & Johnson, Thermo Fisher Scientific, Trelleborg, Cretex Medical, Medtronic, Mozarc Medical, Penumbra.** Use a subset of 3–5 in the post; do not list all.

**Foreign-buyer residential context (verified)**
- ✅ **40% of all CR real estate transactions involve foreign buyers** — sourced to Coldwell Banker 2025 market trends report. Citable.
- ❌ **No primary source publishes a "US 45% / Canada 25% / Europe 20% / other 10%" split.** Use qualitative framing only: *"predominantemente estadounidense, con presencia significativa de Canadá y Europa"* / *"predominantly US-based, with significant Canadian and European presence."*
- Macroeconomic FDI context (different metric, do NOT conflate): per **2025 US State Dept Investment Climate Statement**, FDI inflow was $4.322B in 2024 (4.5% of GDP), with US share **~70%** ($3.048B). This is *all FDI*, not residential — use only as macro color.

**Public safety — verified, must address honestly**
- **2024 homicide rate: 16.6 per 100,000 residents** — the **second-highest in country history**.
- **Concentration**: Limón province and parts of Puntarenas drive most of the increase. **Residential corridors international buyers actually purchase in** (Escazú, Santa Ana, Lindora, Heredia, Atenas, Grecia, Guanacaste tourist corridor) **operate on a meaningfully different risk profile** — but this distinction is *the agent's job to explain*, not to brush past.
- The framing rule: name the national number, name the geographic concentration, and explain why the residential-buyer corridors operate differently. **Do not deny, deflect, or minimize.**

**Structural buyer-side factors (verified, citable)**
- **Foreign property rights**: foreigners hold same rights as nationals (with maritime-zone concession exception for the first 200m strip from the high tide line). Source: 2025 US State Dept Investment Climate Statement.
- **No foreign-exchange controls**; transactions in USD or CRC freely. Source: BCCR / State Dept.
- **Public healthcare**: CAJA available to residents.
- **Military abolished 1948**; uninterrupted civilian democracy for 75+ years.
- **Time zone**: UTC-6 (US Central year-round; ~3-hour flight from Miami, Houston, Atlanta).
- **Property tax**: 0.25% annual flat at national level; *impuesto solidario* on luxury homes above ~₡145M threshold.

**Comparison to Panama (qualitative — agent should know, post should reference neutrally)**
- Panama wins on: lower cost, US dollar, faster residency path, territorial taxation.
- Costa Rica wins on: nature/biodiversity, public healthcare access (CAJA), longer expat-network depth, no military / institutional stability narrative.
- Don't quantify the comparison — qualitative framing only.

**Hard "do not say" list**
- ❌ "Costa Rica is the safest country in Latin America" — contradicted by the homicide trajectory.
- ❌ "Pure life lifestyle" / "paradise" / "your slice of heaven" — tourism-board phrasing.
- ❌ "IkiHomes already has international buyers waiting" — out of canonical scope.
- ❌ "Buyers are flooding to Costa Rica" — overstatement; FDI is up but residential is not the same number.
- ❌ Specific negative claims about Panama, Mexico, or other comparables.
- ❌ "First-world country" framing for Costa Rica — patronizing and inaccurate.
- ❌ Implied claims that Insulet, Boston Scientific, etc. are *residential* drivers in specific zones — they're FDI/employment drivers; the residential connection is structural but not directly attributable.
- ❌ "45/25/20/10" buyer-nationality split — no primary source.
- ❌ Sweeping "all international buyers" generalizations — break out by retiree / nomad / STR investor profile instead.
- ❌ Anything that contradicts `PLATFORM_CANONICAL.md`.

## DELIVERABLES CHECKLIST

- [ ] `content/blog/compradores-internacionales-2026/es.md` exists and parses with `gray-matter`
- [ ] `content/blog/compradores-internacionales-2026/en.md` exists and parses with `gray-matter`
- [ ] Frontmatter matches `BlogPostMeta` interface in `src/lib/blog.ts`
- [ ] Slug renders at `/es/blog/compradores-internacionales-2026` and `/en/blog/compradores-internacionales-2026` in dev
- [ ] Listed on `/es/blog` and `/en/blog` in correct date order
- [ ] Sitemap (`src/app/sitemap.ts`) picks it up via `getAllSlugs()`
- [ ] Image asset present at `/public/blog-compradores-internacionales-2026.png` OR explicit flag that it's pending
- [ ] No claims that contradict `PLATFORM_CANONICAL.md`
- [ ] No bulleted lists in body prose (except enumerated-paragraph pattern in section 6)
- [ ] **No "IkiHomes" anywhere in the body** — auto-CTA card carries the brand alone
- [ ] **No outbound link to `ikihomescr.com`** from the body
- [ ] **No claim that IkiHomes already has international buyers on the platform** — verified by reading section 5 and 7 carefully
- [ ] **Public-safety paragraph in section 3** addresses 16.6/100K honestly with geographic concentration explanation
- [ ] **Panama comparison in section 3** is neutral, qualitative, names the trade-offs both ways
- [ ] **No banned infoproduct phrases** (verified by search of body)
- [ ] **No tourism-board phrasing** (paradise, pure life, slice of heaven, pura vida lifestyle)
- [ ] **At least four inline citations** to authority sources, with at minimum: PROCOMER for the FDI numbers, OIJ/press for the homicide rate, US State Dept for the foreign-property-rights framework. URLs verified live.
- [ ] **No 45/25/20/10 buyer-nationality split** — qualitative framing only
- [ ] **No closing IkiHomes pitch paragraph** — the closing H2 stays analytical
- [ ] Reading time renders as ~5 min on the post page (950–1,050 ES words ÷ 200 wpm = 4.75–5.25 min)
- [ ] Self-review note listing: ES/EN word counts, every numeric/named-entity claim classified as (cited inline / from verified appendix / directional only), banned phrases checked, source URLs verified live, public-safety paragraph reviewed for honest framing, IkiHomes-mention check passed
- [ ] Date timezone decision noted (accept `2026-05-05` shift to "4 de mayo" OR use `2026-05-05T12:00:00`)
