You are an agent working on IkiHomes Landing in the project: ikihomes-landing

## TASK

Create a new blog post for the IkiHomes blog system:

**Slug**: `guanacaste-2026`
**Title (ES)**: "Guanacaste en 2026: oportunidad de playa para agentes que entienden al comprador internacional"
**Title (EN)**: "Guanacaste in 2026: The Beach Opportunity for Agents Who Understand International Buyers"
**Target publish date**: 2026-05-01

You will produce TWO files, one per language, dropped into the existing content tree exactly as the prior posts (`escazu-2026`, `mls-costa-rica-reality`, `stand-out-agent`, `santa-ana-mercado-silencioso`) are organized.

## PROCESS (mandatory)

0. **Read first**: Before writing, read the reference posts to internalize voice, paragraph rhythm, and CTA pattern:
   - `content/blog/escazu-2026/es.md` and `en.md`
   - `content/blog/mls-costa-rica-reality/es.md` and `en.md`
   - `content/blog/stand-out-agent/es.md` and `en.md`
   - `content/blog/santa-ana-mercado-silencioso/es.md` and `en.md` (if already published — sets the new tonal bar)
   Also read `src/lib/blog.ts` to confirm the frontmatter contract and `src/app/[lang]/blog/[slug]/page.tsx` to understand how the post will render (it appends a CTA card automatically — do not duplicate one inside the markdown body).
1. **Plan**: Outline the post (one lede + 7 H2 sections) before writing prose. Confirm the angle, the data points, and how each section ladders.
2. **Write ES first**, then derive EN. EN is not a literal translation — it should feel like a natively-written agent-business essay.
3. **Verify**: Confirm word count, frontmatter, and that the posts render in `next dev` at `/es/blog/guanacaste-2026` and `/en/blog/guanacaste-2026`.

## SOURCE OF TRUTH

- `docs/PLATFORM_CANONICAL.md` (in `ikihomes-app`) is the binding source of truth for any product claim made in the post.
- Phase 1 is a **controlled zone launch**. Do not promise liquidity, agent counts, transaction volume, or platform features that aren't canonically committed.
- Buyer requests are **Pro-only** for response access; canonically, **the first 3 valid agent responses per buyer request are accepted**, after which the request moves to `ResponseLimitReached` and additional responses are rejected server-side. **Do not describe this mechanic in the body at all** — the post is market analysis. The mechanic is in the brief only so you do not contradict it accidentally.
- Agency/team features and trials are deferred — do not reference them.
- If a claim feels load-bearing and you're not sure it's canonical, soften the language or cut it. Better to under-promise.
- Note on zone scope: Guanacaste is **outside** the controlled-zone Phase 1 launch focus (which is GAM-centric). Frame the post as market analysis for agents who work the coast — not as an IkiHomes service announcement for Guanacaste. The IkiHomes launch is GAM-first; do not imply otherwise.

## FILE DELIVERABLES

### File 1: `content/blog/guanacaste-2026/es.md`

Frontmatter (must match exactly the schema in `src/lib/blog.ts`):

```yaml
---
title: "Guanacaste en 2026: oportunidad de playa para agentes que entienden al comprador internacional"
description: "Mercado inmobiliario Guanacaste 2026: la corrección de precios, perfiles del comprador internacional y la ventana operativa para agentes con enfoque."
keywords: ["mercado inmobiliario Guanacaste", "bienes raíces Guanacaste", "agente inmobiliario Guanacaste", "Tamarindo Costa Rica real estate", "Guanacaste corrección 2026"]
date: "2026-05-01"
author: "IkiHomes"
image: "/blog-guanacaste-2026.png"
lang: "es"
---
```

> Description is ~149 chars and contains the primary keyword "mercado inmobiliario Guanacaste." Stay ≤ 160. Date `2026-05-01` will render as "30 de abril de 2026" in `es-CR` due to UTC midnight conversion. Existing posts accept that shift; match for consistency. If exact May 1 matters, use `2026-05-01T12:00:00`.

### File 2: `content/blog/guanacaste-2026/en.md`

```yaml
---
title: "Guanacaste in 2026: The Beach Opportunity for Agents Who Understand International Buyers"
description: "Guanacaste real estate market 2026: the price correction, international-buyer profiles, and the operational window for focused agents."
keywords: ["Guanacaste real estate market", "Tamarindo real estate", "Guanacaste property agent", "Costa Rica beach real estate", "Guanacaste correction 2026"]
date: "2026-05-01"
author: "IkiHomes"
image: "/blog-guanacaste-2026.png"
lang: "en"
---
```

> Description is ~135 chars and contains the primary keyword "Guanacaste real estate market." Stay ≤ 160.

### File 3 (optional, only if you have an image generation tool wired): `public/blog-guanacaste-2026.png`

If you don't have generation, **stop and flag** that the image asset is pending — don't break the post by referencing a missing file. Match resolution and aspect ratio of `public/blog-escazu-2026.png` (1376×768).

## CONTENT BRIEF — what the post must say

### The angle

Guanacaste corrigió. That's what changed the conversation. After a post-pandemic boom that pushed prices ~400% in three years (2020–2023), the zone entered a different phase in 2024–2025: more orderly, more negotiable, more demanding of the agent. For the agent who is already inside and works the market with criteria, this stage opens a window that wasn't available 24 months ago.

The post is for working agents in Costa Rica — coastal specialists or generalists looking to add a Guanacaste line. Not for buyers, not for tourists, not for retirees considering the move. Voice is sober, op-ed register: closer to a CCC quarterly report read-aloud than a brokerage newsletter.

### Required structural beats (~750–900 words ES, slightly tighter EN)

Open with a one-paragraph lede that names the dynamic: Guanacaste corrected, the conversation changed, and the agents who work the market with criteria have a window.

Then the H2s, in this order:

1. **La corrección que reordenó el mercado** / *The Correction That Reordered the Market* — the headline narrative is normalization, not crash. **Anchor with two distinct citations:**
   - For the **boom**: cite **OBTUR-UNA** (the **Observatorio de Turismo, Migraciones y Desarrollo Sostenible de la Región Chorotega de la Universidad Nacional**, coordinated by Esteban Barboza Núñez). The 2024 study reported that property prices on the Guanacaste coast rose **hasta 400% entre 2020 y 2023**. **Use the "hasta" hedge — the study uses it in the headline.** Use past tense ("según el estudio publicado en 2024 por OBTUR-UNA, los precios subieron hasta 400% entre 2020 y 2023") — by April 2026 the study is two years old, present-tense framing would mislead. **Citable URLs (verified live):**
     - Press version (recommended primary citation, more stable URL): `https://semanariouniversidad.com/pais/precio-de-propiedades-en-guanacaste-se-incremento-hasta-un-400-entre-2020-y-2023/`
     - UNA original release: `https://www.unacomunica.una.ac.cr/index.php/marzo-2024/5179-hasta-400-de-precio-incrementaron-propiedades-en-costas-de-guanacaste`
   - For the **correction and current state**: cite **Coldwell Banker Costa Rica's December 2025 Market Report** at `https://www.coldwellbankercostarica.com/article/december-2025-report-trends-costa-rica-real-estate-market-update` (verified live). The report's actual Guanacaste/Nicoya YTD 2025 vs 2024 figures:
     - **Median list price: $1,332,551 (▼ 1.8%)** — list-side held, sellers anchored.
     - **Median sold price: $707,527 (▼ 16.0%)** — *this is the killer datapoint*. List held but transactions cleared 16% lower YoY. Sellers asked, buyers negotiated, deals closed below.
     - Sold listings: 291 (▼ 5.5%).
     - Inventory: 571 homes (▲ 21.5%).
     - Average days on market: **355 days (▲ 23.1%)**.
   - The framing that emerges: the gap between median list (-1.8%) and median sold (-16.0%) is the operational reality of the market. *That's* the agent's edge — knowing how much the asking price will move at close. Sellers haven't capitulated on listing yet; buyers know they don't need to.

2. **Lo que se mueve y lo que no** / *What's Moving and What Isn't* — Guanacaste is not a single market. Differentiate the microzones explicitly: **Tamarindo**, **Playa Flamingo**, **Nosara**, **Las Catalinas**, **Papagayo**, **Playas del Coco**. Each has its own dynamic, and an agent who generalizes loses credibility instantly with a serious buyer. Pricing notes (use these specific verified ranges only — do **not** use the wrong numbers from the source draft):
   - **Tamarindo: $1,400/m² (standard inland) to $9,000/m² (premium beachfront in Langosta and Tamarindo Centro).** Tamarindo prices fell ~10% Jan 2025 → Jan 2026 because inventory grew faster than demand.
   - **Papagayo: ultra-premium tier with listings typically between $1.5M and $10M+ (do NOT quote a per-m² number — primary sources don't publish one).**
   - **Nosara**: lifestyle/wellness/digital-nomad demand profile.
   - **Flamingo**: reactivated by the new **Marina Flamingo** (Phase 1 inaugurated February 2023, $12.7M; properties near the marina saw +15%–20% valuation lifts).
   - **Coco**: most accessible entry point in the consolidated corridor.
   - **Las Catalinas**: master-planned, walkable, premium developer-curated.

3. **El comprador internacional no es uno solo** / *The International Buyer Is Not a Single Profile* — three distinct profiles to name:
   - The North American retiree: turnkey, established community, legal certainty, healthcare proximity.
   - The high-earning digital nomad: connectivity, community, walkable beach proximity.
   - The short-term-rental investor: evaluates by AirDNA occupancy and revenue-per-available-night, not aesthetics.
   Treating all three with the same pitch is how an agent loses credibility fastest. Cite the **40% foreign-buyer share of CR transactions** (Coldwell Banker 2025 market trends report) and note it skews higher in Guanacaste than the national average. **Do NOT quote a 45/25/20/10 split** for US/Canada/Europe/other — no primary source publishes that breakdown. Use qualitative framing only: *"predominantemente estadounidenses, con presencia significativa de Canadá y Europa"* / *"predominantly US-based, with significant Canadian and European presence."*

4. **Por qué este es momento de agente, no de espectador** / *Why This Is an Agent Moment, Not a Spectator Moment* — the operational metrics define a buyer's market. **From the Coldwell Banker Dec 2025 report (citable as authority):**
   - Average days on market: **355** (▲ 23.1% YoY).
   - Inventory: **+21.5%** YoY.
   - Median list -1.8% / median sold -16.0% — the spread *is* the buyer's leverage.
   **Do NOT cite Coldwell Banker for "5–10% below asking", "8–12 months of absorption vs 4–6 balanced", or "276 properties at 10.2%"** — those numbers came from broker-blog interpretations (TheLatinvestor) and are not in the actual Coldwell Banker report. If you want to use them, attribute generically as "market commentary suggests" or cut. The Coldwell Banker median-list-vs-median-sold spread is a stronger and properly-sourced way to make the same point.
   The framing that earns agent respect: *buyer's market does NOT mean any agent captures the deal*. It means the buyer has time, options, and demands criteria from the agent. The agent who shows up with a portfolio PDF gets ignored. The agent who shows up with microzone analysis, adjusted comps, and a read on which seller is ready to clear at -16% closes.

5. **Lo que están haciendo los agentes ya posicionados** / *What the Already-Positioned Agents Are Doing* — they specialize by microzone and work it with discipline. Active relationships with developers and property managers (off-market access). Curated buyer rolodex by profile, not flooded with generic listings. Hours-not-days response time. They treat Guanacaste like a financial market with its own microstructure, not a tourism destination that happens to sell properties. Same playbook from `stand-out-agent` applied to a coastal geography.

6. **La ventana** / *The Window* — corrections don't last indefinitely. Verified 2026 forward projections: **6%–10% appreciation in beachfront prime, 3%–5% in stabilized mid-market**, conditional on continued international arrivals at Liberia airport (LIR) and short-term-rental demand sustaining pace. The current configuration of broad inventory + flexible sellers + post-peak prices has an expiration date. Agents who build position now (relationships, zone knowledge, qualified-buyer pipeline) enter the next demand cycle with structural advantage over agents who wait for the market to "clear."

7. **Closing H2** — pure analytical wrap-up. **Do not mention IkiHomes by name in the body.** **Do not link to ikihomescr.com from the prose.** The page template at `src/app/[lang]/blog/[slug]/page.tsx` already injects a CTA card after the article body — that card is the entire commercial moment for this post. The closing H2 should leave the reader inside the analysis, not pivot to a pitch. Suggested ES titles: "Hacia adelante", "La operativa apenas comienza". Suggested EN: "What Comes Next", "The Operational Phase Begins". Closing line should be observational and earned: *"La narrativa especulativa terminó. La operativa sofisticada apenas comienza."* (or equivalent) — and stop there.

### Tone rules (non-negotiable)

- **Op-Ed in El Financiero, not pitch deck.** The reader is a working agent, not a lead. Voice is sober, observational, lightly contrarian — not motivational, not urgent. Closer to a CCC quarterly report than guru newsletter.
- **Agent-to-agent voice.** No "discover your dream beach home" energy. No buyer-marketing copy. No tourism-board phrasing.
- **No infoproduct / guru phrasing.** Specifically banned (and any close variant): *"estás dejando dinero sobre la mesa", "estás dejando comisiones sobre la mesa", "el secreto que mueve el mercado", "lo que nadie te está diciendo", "los agentes inteligentes ya saben", "los que actúan ganan", "no te quedes atrás", "el momento es ahora".* Same in EN: no "leaving money on the table", "the secret driving the market", "smart agents already know", "the time is now". Match the tone of a trade publication.
- **Specific over generic.** "Tamarindo" over "the beach." "Marina Flamingo Phase 1" over "Flamingo's revival." "AirDNA occupancy" over "rental returns."
- **Numbers as ranges with sources, never as exact unverifiable figures.** Use the same hedging the existing posts use ("entre 30% y 35%", "$1,400 a $9,000 por m² según proximidad").
- **No IkiHomes name in the body.** No mid-post product pitches, no closing pitch, no inline link to `ikihomescr.com`. The page template injects a CTA card after the body — that is the *only* commercial moment in the post.
- **No bullet lists in body prose unless mirroring `stand-out-agent/es.md`'s "Primero / Segundo / Tercero" enumerated paragraphs.** Default to flowing prose.
- **No emojis. No em-dash overuse.** Match the punctuation density of the existing posts.
- **Spanish accents must be correct** (corrección, ventana, áreas, etc.) — Costa Rican Spanish, not neutralized Spanish.

### What must NOT appear

- **The word "IkiHomes" anywhere in the body.** Brand presence is carried entirely by the auto-injected CTA card.
- **Inline link to `ikihomescr.com`** — same reason.
- Claims about IkiHomes user count, transaction volume, liquidity, or coverage in Guanacaste specifically (the launch is GAM-first).
- Buyer-request mechanics, caps, or feature descriptions of any kind. The post is market analysis, not product copy.
- Trials, free agent onboarding, or agency/team features.
- Any feature not in `PLATFORM_CANONICAL.md`.
- AI-anything (descriptions, scoring, matching).
- Tourism-board phrasing ("paradise", "pure life", "your slice of heaven").
- Generic real estate clichés ("the time to buy is now", "limited inventory", "once-in-a-lifetime opportunity").
- The banned infoproduct phrases listed in the Tone rules above.

## STYLE & SEO CONSTRAINTS

- **Spanish length**: 750–900 words. **English length**: 700–850 words.
- H1 is set by the title in frontmatter — do **not** include an H1 inside the markdown body.
- Use `## ` H2s for section headers (matches what `BlogMarkdown` already styles).
- Italicize for emphasis sparingly (one or two `*word*` per post max), the same way `mls-costa-rica-reality` uses it.
- Keep paragraphs to 2–4 sentences. No walls of text.
- **No outbound link to `ikihomescr.com` from the body.** The auto-CTA card after the article handles that.
- **Internal cross-links optional**: linking to `/[lang]/blog/escazu-2026` or `/[lang]/blog/santa-ana-mercado-silencioso` is unnatural in a coastal post — skip unless an organic anchor presents itself in section 4 or 5 (e.g., comparing GAM-corridor agent dynamics to coastal microzone dynamics). Don't force it.
- Citation links (see SOURCE ATTRIBUTION below) are inline, anchor text is the source name in the sentence.
- Description (frontmatter) ≤ 160 characters and contains the primary keyword phrase ("mercado inmobiliario Guanacaste" / "Guanacaste real estate market"). The descriptions provided above already meet this.

## SOURCE ATTRIBUTION (mandatory)

For an audience of working agents, unsourced figures read as invented. This post must do better than the older IkiHomes posts.

**Minimum: three anchored citations** in the body (Guanacaste has more strong sources than Santa Ana, so the floor is higher). Attach to the most load-bearing claims: the 400% boom (UNA OBSERMIDE), the 30%–35% correction (Coldwell Banker / Global Property Guide), the operational metrics (Coldwell Banker), and the 40% foreign-buyer share.

**Acceptable Costa Rican / international authority sources** (use these, not generic broker blogs):
- **OBTUR-UNA — Observatorio de Turismo, Migraciones y Desarrollo Sostenible de la Región Chorotega de la Universidad Nacional** — Costa Rican academic primary source for the boom narrative. **Coordinator: Esteban Barboza Núñez. Study published 5 marzo 2024.** Use past tense ("según el estudio publicado en 2024") and keep the "hasta 400%" hedge. Citable URLs (verified live April 2026):
  - Press version (recommended primary, more stable URL): `https://semanariouniversidad.com/pais/precio-de-propiedades-en-guanacaste-se-incremento-hasta-un-400-entre-2020-y-2023/`
  - UNA original: `https://www.unacomunica.una.ac.cr/index.php/marzo-2024/5179-hasta-400-de-precio-incrementaron-propiedades-en-costas-de-guanacaste`
- **CFIA — Colegio Federado de Ingenieros y Arquitectos** — government-certified construction-permit data, citable via the OBTUR-UNA study above (Barboza references CFIA stats directly). The 456,000→866,000 m² habitational growth and "25% of national construction in Guanacaste in July 2023" figures are both anchored to CFIA via this study.
- **Coldwell Banker Costa Rica — December 2025 Market Report** (`https://www.coldwellbankercostarica.com/article/december-2025-report-trends-costa-rica-real-estate-market-update`, **verified live April 2026**). Citable strictly for: median list $1,332,551 (-1.8%), median sold $707,527 (-16.0%), sold listings 291 (-5.5%), inventory 571 (+21.5%), DOM 355 days (+23.1%), and the regional comparison (Central Valley, Central & South Pacific). **Do NOT attribute to this report**: the 30%–35% luxury correction, "5–10% below asking," "8–12 months absorption," "276 cuts at 10.2%" — those are broker-blog interpretations.
- **Global Property Guide — Costa Rica Residential Market Analysis 2025** (`https://www.globalpropertyguide.com/latin-america/costa-rica/price-history`) — cross-reference for the +7.65% Central Valley listing-price growth, useful for contrast with Guanacaste's correction.
- **2025 US State Department Investment Climate Statement — Costa Rica** (`https://www.state.gov/reports/2025-investment-climate-statements/costa-rica`) — citable for FDI macro context: $4.322B inflow, ~70% from US. Note: this is *all* FDI, not residential buyers — use only as macro color, do not conflate with the residential-buyer 40% share.
- **El Financiero** (`elfinancierocr.com`) — Costa Rica's main business newspaper. Useful for citing IMAE-Construcción coverage and broader construction reporting. Verify specific article URLs before citing.
- **BCCR — Estadísticas de la Construcción** (`https://www.bccr.fi.cr/indicadores-economicos/estad%C3%ADsticas-de-la-construcci%C3%B3n`) — IMAE-Construcción for context on private-construction cycle if relevant.
- **ICT — Instituto Costarricense de Turismo** (`ict.go.cr`) — official tourism arrival statistics. Essential for any claim about Liberia airport (LIR) traffic or international arrival trends.
- **CINDE** (`cinde.org`) — multinational/foreign investment data.
- **Tico Times** (`ticotimes.net`) — English-language CR press; useful for English version citations of the same data.

**Citation rules**:
- Inline links, anchor text is the source name read naturally in prose (e.g., *"según el [Observatorio de Turismo de la Universidad Nacional](url), los precios subieron cerca de 400%..."*). Not footnotes, not parenthetical.
- **Verify the URL exists before citing.** If the source is real but the specific URL can't be located, hedge the claim or attribute by name only without a link.
- Do **not** cite real-estate-broker blogs (TheLatinvestor, propertiesincostarica, lxcostarica, 2costaricarealestate, Blue Water Properties, Sol Realty, Rebecca Clower) as authority — they have commercial bias. They can inform the brief but should not appear as cited sources in the body. Coldwell Banker is the one exception because their December 2025 market report is widely-referenced industry data.
- Three to five anchored citations is the sweet spot. More than five and the post reads as a research paper.

**Self-review obligation**: in the final QA note, list every numeric or named-entity claim in the post and mark each as (a) cited inline, (b) sourced from the verified-data appendix without inline citation, (c) directional language only. If anything falls outside (a)/(b)/(c), cut it.

## VERIFIED DATA APPENDIX (use only these)

Fact-checked April 2026. **Do not introduce numbers or named entities that aren't on this list.** If a fact you want to use isn't here, either cut it or hedge with directional language.

**Geography (verified)**
- Guanacaste province on the Pacific. Microzones: **Tamarindo** (Langosta sub-zone, Tamarindo Centro), **Playa Flamingo**, **Nosara**, **Las Catalinas**, **Peninsula Papagayo**, **Playas del Coco**, **Playa Hermosa**, **Sámara**.
- **Liberia International Airport (LIR)** is the gateway; international arrivals trajectory is a key 2026 demand variable.
- **Marina Flamingo Phase 1** opened February 2023, $12.7M project; planned expansion to 184 wet slips, vessels up to 40m.

**Boom — verified primary source**
- **OBTUR-UNA — Observatorio de Turismo, Migraciones y Desarrollo Sostenible de la Región Chorotega de la Universidad Nacional**. Coordinator: **Esteban Barboza Núñez**. Study published **5 marzo 2024**. Findings:
  - Property prices on the Guanacaste coast rose **hasta 400% entre 2020 y 2023**. Always use "hasta" hedge, always past tense. The headline number is **the strongest single citation in the post.**
  - Citable URLs (verified live April 2026):
    - Press version (recommended primary citation): `https://semanariouniversidad.com/pais/precio-de-propiedades-en-guanacaste-se-incremento-hasta-un-400-entre-2020-y-2023/`
    - UNA original: `https://www.unacomunica.una.ac.cr/index.php/marzo-2024/5179-hasta-400-de-precio-incrementaron-propiedades-en-costas-de-guanacaste`
- **CFIA construction-volume data (within the same OBTUR-UNA source, citable to CFIA via Barboza)** — these numbers anchor the boom narrative concretely:
  - Habitational construction in Guanacaste: **456,000 m² in 2019 → 866,000 m² in 2022** (~90% increase in 3 years).
  - Commercial construction: **131,000 m² (2019) → 209,000 m² (2022)**.
  - Top 4 cantones (Santa Cruz, Nicoya, Liberia, Carrillo) concentrated **89%** of habitational m² in 2022.
  - Top 7 distritos costeros (Nosara, Tamarindo, Sardinal, Cabo Velas, Sámara, Nacascolo, Liberia central) totaled **609,000 m² = 70%** of all 2022 m².
  - **July 2023: 25% of all CR construction m² were concentrated in Guanacaste** (~900K–1M m²).
  - Useful framing: "second only to San José in 2022 m² processed."
- **Property-level example from the same study:** a property worth $100K four years prior was at $400K–$500K. *Useful color, not a structural number.*

**Correction & current state — verified (Coldwell Banker Dec 2025 Market Report)**
- URL (verified live April 2026): `https://www.coldwellbankercostarica.com/article/december-2025-report-trends-costa-rica-real-estate-market-update`
- **Guanacaste/Nicoya YTD 2025 vs 2024 (the actual numbers from the report):**
  - Median **list** price: **$1,332,551 (▼ 1.8%)**.
  - Median **sold** price: **$707,527 (▼ 16.0%)** ← *the killer datapoint; spread between list and sold is the buyer's leverage*.
  - Sold listings: **291 (▼ 5.5%)**.
  - Inventory: **571 homes (▲ 21.5%)**.
  - Average days on market: **355 days (▲ 23.1%)**.
- For **regional comparison** (also from the same report):
  - Central & South Pacific: median list $1,130,210 (▲ 7.2%), DOM 406 days (▲ 47.1%) — Guanacaste is *not* the worst-affected coast; Pacífico Central/Sur is slower.
  - Central Valley (GAM): median list $618,147 (▲ 6.9%), DOM 343 days (▲ 18.3%) — GAM is the relative outperformer in 2025.
- **30%–35% "luxury correction" (broker-blog interpretation, NOT in the Coldwell Banker report itself):** ⚠️ This number circulates widely in broker commentary (TheLatinvestor, Blue Water Properties, Rebecca Clower, Sol Realty) but the actual Coldwell Banker Dec 2025 report does NOT publish a single "luxury correction percentage." If you cite the 30%–35% number, do NOT attribute to Coldwell Banker — attribute to "broker market commentary" or use the verified Coldwell Banker median-sold -16.0% figure instead, which makes the same point with proper sourcing.

**Numbers that broker blogs publish but Coldwell Banker does NOT (do not attribute to Coldwell Banker)**
- "5%–10% below asking on closing" — broker commentary; not in the Dec 2025 report.
- "8–12 months of absorption vs 4–6 balanced" — broker commentary; not in the Dec 2025 report.
- "276 properties cut prices in 2025 averaging 10.2%" — broker commentary; not in the Dec 2025 report. The 13.6% (>$1M) and 15.2% (>$2M) tier cuts are in this same broker-commentary lineage.
- "Average home price $1,530/m², -31% YoY" — broker source, directional cross-reference only.

If you want to use any of these in the post, attribute as "market commentary suggests..." or cut. They support the narrative but aren't authority-grade.

**Microzone pricing — CORRECTED (do NOT use the wrong numbers from the source draft)**
- ⚠️ Earlier draft circulating internally said Tamarindo runs "$966 to $6,000/m²." **The $966 floor is not in any verified source.** The correct verified range is **$1,400/m² (standard inland) to $9,000/m² (premium beachfront, Langosta, Tamarindo Centro)**. Use this range, not the earlier one.
- **Tamarindo prices fell ~10% Jan 2025 → Jan 2026** because inventory grew faster than demand. (TheLatinvestor data — directional, not citation-worthy.)
- ⚠️ Earlier draft said Papagayo runs "above $4,000/m²." **No primary source publishes a per-m² figure for Papagayo.** Use total-price framing instead: **listings typically $1.5M to $10M+, average listing ~$1.8M**. Do not quote a Papagayo per-m² number.
- **Marina Flamingo proximity premium: +15%–20%** vs comparable non-marina properties (Tamarindo Real Estate / Flamingo Beach Realty source — directional).

**Operational metrics (verified to Coldwell Banker Dec 2025 report — already covered above, restating for clarity)**
- Days on market: **355** (▲ 23.1%). NOT 340.
- Inventory increase: **+21.5%** YoY. NOT +15%.
- Median list -1.8% / median sold -16.0% spread is the operational story, not "5–10% below asking."

**Foreign-buyer composition — CORRECTED**
- ✅ **40% foreign-buyer share of CR transactions** — sourced to Coldwell Banker 2025 market trends report. Citable.
- ❌ **45/25/20/10 split for US/Canada/Europe/other** — **NO primary source publishes this breakdown.** It's broker-blog interpretation. **Do not quote percentages.** Use qualitative framing: *"predominantemente estadounidense, con presencia significativa de Canadá y Europa"* (ES) / *"predominantly US-based, with significant Canadian and European presence"* (EN). The most authoritative published statement is "most interest coming from the U.S., Canada, and Europe."
- Macroeconomic FDI context (different metric than residential buyers, do NOT conflate): per the **2025 US State Department Investment Climate Statement**, FDI inflow to Costa Rica was **$4.322B in 2024 (4.5% of GDP)**, of which **US accounted for $3.048B (~70%)**. This is *all FDI*, not residential buyers — useful only as macro color, not as a residential-buyer split.
- ⚠️ "Foreign investment in CR property +18% YoY in 2024" and "350+ HNWIs influx, $2.8B" — both broker-blog claims, no primary source. Cut or hedge.

**2026 forward projections (verified across multiple sources)**
- **Beachfront prime / luxury ocean-view: 6%–10% appreciation.**
- **Stabilized mid-market: 3%–5% appreciation.**
- **Estimated downside-to-upside band on prime properties: -5% to +8%.** Some downside risk in weaker pockets persists.
- Conditional drivers: continued LIR international arrivals growth, sustained short-term-rental demand.
- Rental returns in Tamarindo/Flamingo/Playa Hermosa: **5%–8%** range.

**Hard "do not say" list**
- ❌ **Tamarindo "$966/m² floor"** — fabricated, no source. Use $1,400/m² floor.
- ❌ **Papagayo "above $4,000/m²"** — no primary source publishes per-m² for Papagayo. Use total-price framing.
- ❌ **"OBSERMIDE"** as the observatory acronym — wrong. The correct name is **OBTUR-UNA** (Observatorio de Turismo, Migraciones y Desarrollo Sostenible de la Región Chorotega de la Universidad Nacional). Always coordinate with Esteban Barboza Núñez attribution.
- ❌ **Flat "400% surge" without "hasta"** — the OBTUR-UNA study says "hasta 400%". Always carry the hedge.
- ❌ **Present-tense framing of the OBTUR-UNA study** — it's a 2024 publication measuring 2020–2023. Always past tense.
- ❌ **"45% US / 25% Canada / 20% Europe / 10% other"** foreign-buyer split — no primary source. Use qualitative framing.
- ❌ **Attributing "5–10% below asking", "8–12 months absorption", "276 cuts at 10.2%" to Coldwell Banker** — those are broker-blog (TheLatinvestor) interpretations, NOT in the Coldwell Banker Dec 2025 report. Either attribute as "market commentary suggests" or use the verified Coldwell Banker median-list -1.8% / median-sold -16.0% spread instead.
- ❌ **"Median Guanacaste/Nicoya $1.32M, -3.05% YoY"** — wrong YoY figure I had earlier. Actual is **$1,332,551, -1.8%** for median list. Correct number, correct attribution.
- ❌ **"30%–35% luxury correction" attributed to Coldwell Banker** — not in their actual Dec 2025 report. Use the Coldwell Banker median-sold -16.0% YoY figure instead, which is in the report and makes the same point.
- ❌ **"Crash"** — the correction is normalization, not a crash. Use "corrección" / "normalization."
- ❌ Generic "tourism-board" phrasing — paradise, pure life, slice of heaven, etc.
- ❌ Specific multinational tenant names for Liberia / Guanacaste — do not borrow the Forum I/II framing from Santa Ana.
- ❌ The "IkiHomes está habilitando acceso temprano para agentes que trabajan Guanacaste" closing pitch from the source draft — **cut entirely**. The auto-CTA card handles the brand moment.
- ❌ Claims about specific HOAs being "well managed" or "problematic" — defamation risk. Speak in general terms about HOA-due-diligence importance.
- ❌ Claims about specific developers delivering as promised — same defamation risk.
- ❌ Anything that contradicts `PLATFORM_CANONICAL.md`.

## DELIVERABLES CHECKLIST

- [ ] `content/blog/guanacaste-2026/es.md` exists and parses with `gray-matter`
- [ ] `content/blog/guanacaste-2026/en.md` exists and parses with `gray-matter`
- [ ] Frontmatter matches the `BlogPostMeta` interface in `src/lib/blog.ts`
- [ ] Slug renders at `/es/blog/guanacaste-2026` and `/en/blog/guanacaste-2026` in dev
- [ ] Listed on `/es/blog` and `/en/blog` in correct date order (after `santa-ana-mercado-silencioso`)
- [ ] Sitemap (`src/app/sitemap.ts`) picks it up via `getAllSlugs()`
- [ ] Image asset present at `/public/blog-guanacaste-2026.png` OR explicit flag that it's pending
- [ ] No claims that contradict `PLATFORM_CANONICAL.md`
- [ ] No bulleted lists in body prose (unless mirroring the enumerated-paragraph pattern from `stand-out-agent`)
- [ ] **No "IkiHomes" anywhere in the body** — auto-CTA card carries the brand alone
- [ ] **No outbound link to `ikihomescr.com`** from the body
- [ ] **No banned infoproduct phrases** (verified by search of body for: "dejando dinero", "secreto que mueve", "lo que nadie te está diciendo", "agentes inteligentes", "leaving money on the table", "secret driving the market", "smart agents already know")
- [ ] **No tourism-board phrasing** (paradise, pure life, slice of heaven, etc.)
- [ ] **At least three inline citations** to authority sources, with at minimum: UNA OBSERMIDE for the 400% surge, Coldwell Banker for operational metrics, and one more (Global Property Guide / El Financiero / ICT) for the correction or arrivals data. URLs verified live.
- [ ] **Wrong numbers from the source draft confirmed cut**: Tamarindo $966 floor → replaced with $1,400; Papagayo $4,000/m² → replaced with total-price framing.
- [ ] **No closing IkiHomes pitch paragraph** — the source draft's "IkiHomes está habilitando acceso temprano..." paragraph must be cut entirely.
- [ ] Reading time renders as ~4–5 min on the post page (750–900 ES words ÷ 200 wpm)
- [ ] Self-review note listing: ES/EN word counts, every numeric/named-entity claim classified as (cited inline / from verified appendix / directional only), banned phrases checked, cut claims explicitly listed (the $966, the $4,000/m² Papagayo, the IkiHomes closing pitch), source URLs verified live
- [ ] Date timezone decision noted (accept `2026-05-01` shift to "30 de abril" OR use `2026-05-01T12:00:00`)
