You are an agent working on IkiHomes Landing in the project: ikihomes-landing

## TASK

Create a new blog post for the IkiHomes blog system:

**Slug**: `santa-ana-mercado-silencioso`
**Title (ES)**: "Santa Ana: el mercado que crece en silencio (y los agentes que lo están aprovechando)"
**Title (EN)**: "Santa Ana: The Quietly Growing Market (and the Agents Already Capturing It)"
**Target publish date**: 2026-04-24

You will produce TWO files, one per language, dropped into the existing content tree exactly as the prior posts (`escazu-2026`, `mls-costa-rica-reality`, `stand-out-agent`) are organized.

## PROCESS (mandatory)

0. **Read first**: Before writing, read the four reference posts to internalize the voice, paragraph rhythm, and CTA pattern:
   - `content/blog/escazu-2026/es.md` and `en.md`
   - `content/blog/mls-costa-rica-reality/es.md` and `en.md`
   - `content/blog/stand-out-agent/es.md` and `en.md`
   Also read `src/lib/blog.ts` to confirm the frontmatter contract and `src/app/[lang]/blog/[slug]/page.tsx` to understand how the post will render (it appends a CTA card automatically — do not duplicate one inside the markdown body).
1. **Plan**: Outline the post (5–7 H2 sections) before writing prose. Confirm the angle, the data points, and how each section ladders into the IkiHomes positioning.
2. **Write ES first**, then derive EN. EN is not a literal translation — it should feel like a natively-written agent-business essay, the way `escazu-2026/en.md` reads next to its Spanish counterpart.
3. **Verify**: Confirm word count, frontmatter, and that the posts render in `next dev` at `/es/blog/santa-ana-mercado-silencioso` and `/en/blog/santa-ana-mercado-silencioso`.

## SOURCE OF TRUTH

- `docs/PLATFORM_CANONICAL.md` (in `ikihomes-app`) is the binding source of truth for any product claim made in the post.
- Phase 1 is a **controlled zone launch**. Do not promise liquidity, agent counts, transaction volume, or platform features that aren't canonically committed.
- Buyer requests are **Pro-only** for response access; canonically, **the first 3 valid agent responses per buyer request are accepted**, after which the request moves to `ResponseLimitReached` and additional responses are rejected server-side. Do not contradict this canonical mechanic. **Do not describe it in the article body** — the post is market analysis, not product copy.
- Agency/team features and trials are deferred — do not reference them.
- If a claim feels load-bearing and you're not sure it's canonical, soften the language or cut it. Better to under-promise.

## FILE DELIVERABLES

### File 1: `content/blog/santa-ana-mercado-silencioso/es.md`

Frontmatter (must match exactly the schema in `src/lib/blog.ts`):

```yaml
---
title: "Santa Ana: el mercado que crece en silencio (y los agentes que lo están aprovechando)"
description: "Mercado inmobiliario Santa Ana: datos, perfiles de comprador y la oportunidad para agentes que se posicionan en el corredor que crece en silencio."
keywords: ["mercado inmobiliario Santa Ana", "bienes raíces Lindora", "agente inmobiliario Santa Ana", "comprar casa Santa Ana Costa Rica", "corredor Santa Ana Escazú"]
date: "2026-04-24"
author: "IkiHomes"
image: "/blog-santa-ana-mercado-silencioso.png"
lang: "es"
---
```

> Description is ~149 chars and contains the primary keyword "mercado inmobiliario Santa Ana." Stay ≤ 160. Note on date: `YYYY-MM-DD` is parsed as UTC midnight, so `2026-04-24` renders as "23 de abril de 2026" in `es-CR`. If exact April 24 display matters, use `2026-04-24T12:00:00`. Existing posts accept the shift; match that for consistency.

### File 2: `content/blog/santa-ana-mercado-silencioso/en.md`

```yaml
---
title: "Santa Ana: The Quietly Growing Market (and the Agents Already Capturing It)"
description: "Santa Ana real estate market 2026: data, buyer profiles, and the opportunity for agents positioning early in Costa Rica's quietly growing corridor."
keywords: ["Santa Ana real estate market", "Lindora real estate", "Santa Ana property agent", "buy house Santa Ana Costa Rica", "Santa Ana Escazú corridor"]
date: "2026-04-24"
author: "IkiHomes"
image: "/blog-santa-ana-mercado-silencioso.png"
lang: "en"
---
```

> Description is ~148 chars and contains the primary keyword "Santa Ana real estate market." Stay ≤ 160.

### File 3 (optional, only if you have an image generation tool wired): `public/blog-santa-ana-mercado-silencioso.png`

If you don't have generation, **stop and flag** that the image asset is pending — don't break the post by referencing a missing file. The existing posts each have a matching `/blog-<slug>.png` in `public/`. Match resolution and aspect ratio of `public/blog-escazu-2026.png` (1376×768).

## CONTENT BRIEF — what the post must say

### The angle

Santa Ana is the corridor everyone *talks past*. Escazú gets the headlines, Cariari gets the nostalgia, but the real story of the last five years has been Santa Ana — Lindora, Pozos, the Forum corridor — quietly absorbing the multinational footprint, the new tower stock, and the international family demand that Escazú can no longer comfortably house at its price point. The agents who already specialize here are compounding their pipelines while everyone else is still pitching Escazú listings.

The post is for working agents in Costa Rica. Not for buyers, not for investors. The voice is the same direct, slightly contrarian, agent-to-agent register used in `escazu-2026/es.md` and `stand-out-agent/es.md`.

### Required structural beats (~700–850 words ES, slightly tighter EN)

Open with a one-paragraph lede that names the dynamic: Santa Ana grew in silence while everyone was watching Escazú, and now the smart agents are quietly relocating their attention.

Then the H2s, in this order:

1. **El corredor que se construyó mientras nadie miraba** / *The corridor that built itself while no one was looking* — the Forum I and Forum II business parks anchor the multinational footprint. **Verified tenants you can name** (do not invent others): Forum I houses Procter & Gamble, Chiquita Brands, Bolsa Nacional de Valores, Cuestamoras, Alimentos Prosalud. Forum II houses Oracle, Walmart, Western Union, Tigo, Citibank, Mondelez, Hewlett Packard, Kraft Foods. Pick three or four for the post — do not list all of them. Speak in the aggregate as "una concentración de multinacionales que pocas zonas del país igualan" rather than citing a specific count of corporations in Santa Ana (no public source pins that number). New apartment tower stock concentrated along the **Lindora–Pozos–Río Oro** axis (all three are verified Santa Ana neighborhoods; Río Oro borders Escazú directly). The point: this isn't speculative anymore, it's already infrastructure.

2. **Los números: lo que Escazú ya no puede ofrecer** / *The Numbers: What Escazú Can No Longer Offer* — Santa Ana sits below Escazú per m² but is appreciating at a comparable clip. **Use ranges only.** Per the framing already used in the `escazu-2026` post, Escazú quality condos sit in the $1,800–$2,500/m² band; for Santa Ana, frame as "ligeramente por debajo del rango de Escazú, con la brecha cerrándose" and **avoid quoting a hard Santa Ana number** — public sources disagree. The directional truth is what matters: gap is narrowing. **For the headline appreciation number, use the citable +7.65% YoY Central Valley listing prices figure from Global Property Guide** (cite inline with the source name). Frame the 7%–10% range only as a forward projection if at all. **For yields, do NOT use "7.5% in the corridor" — that's the national average. Use the corrected framing**: yields in Santa Ana run 6%–8% gross by unit type, *below* the national 7.84% average that Global Property Guide reports, but offset by corporate-tenant stability and lower vacancy. This prestige-compression read is more sophisticated and harder for an experienced agent to dismiss. (See Verified Data Appendix → Rental yields for exact citable language.)

3. **El comprador de Santa Ana no es el comprador de Escazú** / *The Santa Ana Buyer Isn't the Escazú Buyer* — the Santa Ana profile skews to the multinational mid-to-senior employee on a 3–5 year posting, the second-time buyer trading down from Escazú, and the family that wants Lindora schools without the Escazú price ceiling. Less status-driven, more practical. Faster decisions. Repeat-buyer potential is real because the corridor stickiness is high.

4. **Por qué la oferta nueva cambia tu juego como agente** / *Why New Inventory Changes Your Game as an Agent* — the new tower projects are mostly presale or recently-delivered. That means fewer comparable listings circulating in WhatsApp, less price noise, and an opportunity for the agent who actually knows which project has the right HOA, the right developer track record, and the right delivery timeline. **Cite the CCC context here**: nationally, the construction wave is moving *out* of the GAM core — Cartago leads 2025 construction-intent growth at +53.9%, Alajuela has surpassed San José in total m² processed, and the BCCR's IMAE-Construcción shows private construction moderating to +0.8% in 2025 (public works carried the +5.1% sector total). Santa Ana is therefore **not** riding a national building wave — it's a specialized premium corridor concentrating demand against a softer national backdrop. That's a sharper story than "new inventory is everywhere", and it's defensible. Tie this back to the `mls-costa-rica-reality` thesis: in a fragmented market with cooling broad-based supply, the agent with proprietary zone knowledge wins disproportionately.

5. **Lo que están haciendo los agentes que ya están dentro** / *What the Agents Already Inside Are Doing* — they specialize, they walk every project monthly, they keep a personal rolodex of corridor-specific buyers, and they respond inside hours. They treat Santa Ana as a zone, not a list of listings. This is the same playbook from `stand-out-agent` applied to a specific geography.

6. **Por qué la oferta nueva cambia tu juego como agente** content can also live here if section 4 runs short. Otherwise this is **La ventana** / *The Window* — frame the timing: Santa Ana is past speculation but before saturation. The agents who pick up the zone now ride the appreciation curve and build the referral base. The ones who wait will be competing on someone else's turf in two years.

7. **Closing H2** — pure analytical wrap-up. **Do not mention IkiHomes by name in the body.** **Do not link to ikihomescr.com from the prose.** The page template at `src/app/[lang]/blog/[slug]/page.tsx` already injects a CTA card after the article body — that card is the entire commercial moment for this post. The closing H2 should leave the reader inside the analysis, not pivot to a pitch. Suggested ES titles: "Hacia adelante", "Lo que sigue para los que actúan ahora". Suggested EN: "What Comes Next", "The Window in Plain Terms". Closing line should be observational and earned — model the tone on the analytical sentence-before-pitch in `mls-costa-rica-reality` ("Los agentes que entienden dónde se dirige el mercado ya están dentro") **but stop there** — do not add the IkiHomes-promoting sentence that follows it in that post.

### Tone rules (non-negotiable)

- **Op-Ed in El Financiero, not pitch deck.** The reader is a working agent, not a lead. Voice is sober, observational, lightly contrarian — not motivational, not urgent. Closer to McKinsey memo than guru newsletter.
- **Agent-to-agent voice.** No "discover your dream home" energy. No buyer-marketing copy.
- **No infoproduct / guru phrasing.** Specifically banned (and any close variant): *"estás dejando dinero sobre la mesa", "estás dejando comisiones sobre la mesa", "el secreto que mueve el mercado", "lo que nadie te está diciendo", "los agentes inteligentes ya saben", "los que actúan ganan", "no te quedes atrás", "el momento es ahora".* These read as English-to-Spanish translations of US infoproduct copy and undercut a premium brand. Replace with measured equivalents: *"agentes que conocen este patrón están capturando la demanda", "la dinámica está documentada", "el mercado ya recompensa a los agentes que..."*. The same rule applies in EN: no "leaving money on the table", "the secret driving the market", "smart agents already know" — match the tone of a trade publication, not a sales letter.
- **Specific over generic.** Lindora over "Santa Ana." "Forum corridor" over "office areas." "Multinational mid-senior on a 3–5 year posting" over "international buyer."
- **Numbers as ranges, never as exact unverifiable figures.** Use the same hedging the `escazu-2026` post uses ("entre 4% y 6%", "entre $1,800 y $2,500").
- **No IkiHomes name in the body.** No mid-post product pitches, no closing pitch, no inline link to `ikihomescr.com`. The page template injects a CTA card after the body — that is the *only* commercial moment in the post. The closing H2 must leave the reader inside the analysis.
- **No bullet lists in body prose unless mirroring `stand-out-agent/es.md`'s "Primero / Segundo / Tercero" enumerated paragraphs.** Default to flowing prose.
- **No emojis. No em-dash overuse.** Match the punctuation density of the existing posts.
- **Spanish accents must be correct** (María, área, etc.) — Costa Rican Spanish, not neutralized Spanish.

### What must NOT appear

- **The word "IkiHomes" anywhere in the body.** Brand presence is carried entirely by the auto-injected CTA card — do not duplicate it.
- **Inline link to `ikihomescr.com`** — same reason. The card supplies the link.
- Claims about IkiHomes user count, transaction volume, or liquidity in Santa Ana.
- Buyer-request mechanics, caps, or feature descriptions of any kind. The post is market analysis, not product copy.
- Trials, free agent onboarding, or agency/team features.
- Any feature not in `PLATFORM_CANONICAL.md`.
- AI-anything (descriptions, scoring, matching).
- Specific multinational names you can't verify — prefer aggregates.
- Generic real estate clichés ("the time to buy is now", "limited inventory", etc.).
- The banned infoproduct phrases listed in the Tone rules above.

## STYLE & SEO CONSTRAINTS

- **Spanish length**: 700–850 words. **English length**: 650–800 words.
- H1 is set by the title in frontmatter — do **not** include an H1 inside the markdown body.
- Use `## ` H2s for section headers (matches what `BlogMarkdown` already styles).
- Italicize for emphasis sparingly (one or two `*word*` per post max), the same way `mls-costa-rica-reality` uses it.
- Keep paragraphs to 2–4 sentences. No walls of text.
- **No outbound link to `ikihomescr.com` from the body.** The auto-CTA card after the article handles that.
- **One optional internal link** to `/[lang]/blog/escazu-2026` placed naturally in section 1 or 2 where the corridor reference is made (e.g., *"...el corredor [Santa Ana–Escazú](/es/blog/escazu-2026) que ya está absorbiendo..."*). This is for topical-authority SEO, not promotion. Skip it if no natural anchor presents itself — don't force it.
- Citation links (see SOURCE ATTRIBUTION below) are inline, anchor text is the source name in the sentence, not a footnote.
- Description (frontmatter) must be ≤ 160 characters and contain the primary keyword phrase ("mercado inmobiliario Santa Ana" / "Santa Ana real estate market"). The descriptions provided above already meet this.

## SOURCE ATTRIBUTION (mandatory)

The existing IkiHomes blog posts cite zero sources. For an audience of working agents, that's a credibility ceiling — figures read as invented even when they're directionally correct. This post must do better.

**Minimum: two anchored citations** in the body, attached to the most load-bearing claims (the appreciation projection, the multinational footprint, the new-construction inventory dynamic, OR the rental-yield datapoint — pick two).

**Acceptable Costa Rican authority sources** (use these, not real-estate-broker blogs):
- **Global Property Guide** (`globalpropertyguide.com/latin-america/costa-rica`) — the strongest single source for this post. Cite the +7.65% Central Valley listing-price figure and the Costa Rica yield table (Heredia 8.37%, San José 8.35%, Escazú 7.18%, national avg 7.84%). Specific URLs in the Verified Data Appendix below.
- **BCCR — IMAE-Construcción** (`bccr.fi.cr/indicadores-economicos/estadísticas-de-la-construcción`) — Banco Central's monthly construction activity index. Cite a specific monthly reading or a 2025 trend, not vague "BCCR confirms" language.
- **CCC — Cámara Costarricense de la Construcción** (`construccion.co.cr/informes-economicos/`) — quarterly economic reports. Citable: 2024 sector +17%, 2025 housing share 47.3%, Cartago +53.9% intent growth, Alajuela leading by m² processed.
- **El Financiero** (`elfinancierocr.com`) — Costa Rica's main business newspaper. Useful for citing IMAE coverage, multinational corridor reporting. Verify the specific article URL exists before citing.
- **CFIA — Colegio Federado de Ingenieros y Arquitectos** (`cfia.or.cr`) — monthly construction-permits-by-canton data. Strong for new-construction inventory claims if you can locate the specific report.
- **CINDE** (`cinde.org`) — multinational investment and corporate-services data; relevant for the Forum corridor section.
- **INEC** (`inec.cr`) — demographic and housing census data.
- **CRGAR — Cámara Costarricense de Corredores de Bienes Raíces** (`crgar.com`) — agent-side market data.

**Citation rules**:
- Inline links, anchor text is the source name read naturally in prose (e.g., *"según [el reporte de la CCC del primer trimestre 2026](url), la zona oeste...")*. Not footnotes, not parenthetical.
- **Verify the URL exists before citing.** If the source is real but the specific report URL can't be located, hedge the claim instead of fabricating a link. Better to write *"el sector construcción reporta..."* than to cite a broken link.
- If a load-bearing figure cannot be sourced to one of the authorities above, downgrade it to directional language and remove the number. Do **not** cite real-estate-broker blogs (TheLatinvestor, propertiesincostarica, lxcostarica, 2costaricarealestate) as authority — they have commercial bias.
- Don't over-cite. Two anchored citations is the floor, four is the ceiling. The piece is an essay, not a research paper.

**Self-review obligation**: in the final QA note, list every numeric or named-entity claim in the post and mark each as (a) cited inline, (b) sourced from the verified-data appendix without inline citation, (c) directional language only. If anything falls outside (a)/(b)/(c), cut it.

## VERIFIED DATA APPENDIX (use only these)

The data points below were fact-checked April 2026. **Do not introduce numbers or named entities that aren't on this list.** If a fact you want to use isn't here, either cut it or hedge with directional language ("creciendo aceleradamente", "uno de los corredores más activos") instead of inventing a figure.

**Geography (verified)**
- Santa Ana is the canton west of Escazú in the GAM. Key neighborhoods: **Lindora, Pozos, Río Oro**. Lindora and Pozos consistently attract the highest share of foreign condo buyers in Santa Ana. Río Oro borders Escazú directly.
- **Route 27** runs through the corridor and is the main access from San José to the Pacific.
- Proximity to international schools, Multiplaza Escazú, Sabana, and Juan Santamaría International Airport (~8 km from Forum II) is verifiable.

**Multinational anchor tenants (verified — pick a subset)**
- **Forum I**: Procter & Gamble, Chiquita Brands, Bolsa Nacional de Valores, Cuestamoras, Alimentos Prosalud.
- **Forum II**: Oracle, Walmart, Western Union, Tigo, Citibank, Mondelez, Hewlett Packard, Kraft Foods.
- Costa Rica nationally hosts ~400–450 multinationals; **no public source pins the Santa Ana subset**, so do not state a specific count for the corridor.
- Forum II opened December 2007, ~50,726 m², eleven 4-storey buildings plus hotel — useful color but not load-bearing for the post.

**Pricing & appreciation (verified primary sources, citable)**
- **Central Valley median listing prices: +7.65% YoY** to USD 610,685 — *Global Property Guide, Costa Rica Residential Property Market Analysis 2025*. This is the strongest single number in the post. Cite it inline with the source name.
  - URL: `https://www.globalpropertyguide.com/latin-america/costa-rica/price-history`
  - Note: this is **listing prices**, not closing prices. Phrase accordingly: *"precios de listado en el Valle Central"*.
- Costa Rica nationwide property prices: **+7%** YoY in USD terms (Jan 2025–Jan 2026) — directional, broker-blog source, do not cite as authority.
- Central Valley range: **6%–10%** — directional, broker-blog source.
- 2026 forward projection for top condos in Escazú/Santa Ana/Curridabat: **7%–10%** — broker-blog forecast, frame as "se proyecta" not "se reporta".
- Per-m² figures are contested across sources — keep Escazú's range at the existing $1,800–$2,500/m² framing the prior post used, and **do not commit to a Santa Ana hard figure**. Frame Santa Ana as "below Escazú, with the gap narrowing."

**Rental yields — CORRECTED (previously wrong in earlier prompt drafts)**
- ⚠️ **The "~7.5% in the corridor" claim is WRONG.** That number is the Costa Rica national average gross yield (actually 7.84% per Global Property Guide May 2025), not the corridor.
- **Premium corridors have COMPRESSED yields**, not premium yields, because purchase prices are inflated by prestige/security/international demand while rents are capped by tenant affordability.
- **Verified yield data (Global Property Guide, May 2025 — citable as authority):**
  - Costa Rica national gross yield average: **7.84%**
  - Heredia: **8.37%** (highest among monitored submarkets)
  - San José city: **8.35%**
  - **Escazú: 7.18%** (lowest among monitored submarkets)
  - URL: `https://www.globalpropertyguide.com/latin-america/costa-rica/rental-yields`
- **Santa Ana / Lindora / Pozos corridor:** gross yields **6%–7%** typical, full distribution **6%–8%** depending on unit type. Source: TheLatinvestor (broker — directional, not authority).
- **Recommended framing for the post (steal this language verbatim if useful)**:
  - ES: *"los rendimientos brutos en Santa Ana se mueven entre 6% y 8% según el tipo de unidad — por debajo del promedio nacional de aproximadamente 7.84% que [Global Property Guide reporta para Costa Rica](https://www.globalpropertyguide.com/latin-america/costa-rica/rental-yields), pero compensados por mayor estabilidad de inquilino corporativo y vacancia más baja"*
  - EN: *"gross yields in Santa Ana range 6%–8% by unit type — below the national average of roughly 7.84% [reported by Global Property Guide](https://www.globalpropertyguide.com/latin-america/costa-rica/rental-yields), but offset by stronger corporate-tenant stability and lower vacancy"*
- This framing is more sophisticated than a single yield number, and the prestige-compression dynamic is the kind of insight that earns credibility with experienced agents.

**Construction cycle context (BCCR + CCC — citable as authority)**
- **BCCR — IMAE-Construcción** (Índice Mensual de Actividad Económica del Sector Construcción) is the right BCCR indicator. Methodology and live data:
  - Methodology: `https://gee.bccr.fi.cr/indicadoreseconomicos/Documentos/DocumentosMetodologiasNotasTecnicas/Metodologia de calculo del IMAE.htm`
  - Construction statistics landing page: `https://www.bccr.fi.cr/indicadores-economicos/estad%C3%ADsticas-de-la-construcci%C3%B3n`
  - Verified 2025 readings:
    - Construction sector closed 2025 **+5.1%**, but **private construction moderated to just +0.8%** (public works carried the growth at +12.5%).
    - Feb 2025: +2.7% (5th consecutive monthly increase).
    - May 2025: **-2.5% YoY**, with private construction -1.9% on lower residential project execution.
  - **The honest read**: private residential construction is *cooling*, not booming. Santa Ana's premium-corridor growth is happening **against** a softer national construction backdrop, not riding a wave. That's actually a more compelling story for the post — the corridor is concentrating demand while broader inventory is moderating.
- **CCC — Cámara Costarricense de la Construcción** quarterly economic reports:
  - Reports landing: `https://construccion.co.cr/informes-economicos/`
  - Verified 2025 data:
    - Construction sector grew **+17% in 2024**.
    - 2025: through July, 4.5M m² processed nationally, **housing = 47.3%** of permitted area.
    - **Cartago leading 2025 construction intent: +53.9%** (the wave is moving *out* of the GAM core).
    - **Alajuela the largest construction province**: 15.2% growth, surpassing San José in total m² processed.
  - This contextualizes Santa Ana as a **specialized premium niche**, not a beneficiary of broad-based GAM building activity. Useful for the "Por qué la oferta nueva cambia tu juego" section.
- **Do not** write the vague "BCCR confirms the private construction cycle is active" line — it's filler authority. Either cite a specific IMAE reading from a specific month with the URL, or cut the BCCR reference entirely.

**Hard "do not say" list**
- ❌ "Más de 80 multinacionales en el corredor" — unverifiable.
- ❌ Bayer, Bridgestone, Amazon as Forum tenants — not verified.
- ❌ Specific Santa Ana per-m² number — sources conflict.
- ❌ "8–12%" appreciation for 2026 — the verified projection is 7–10%.
- ❌ **"+9.2% YoY" appreciation for premium suburbs** — no source. Replace with the Global Property Guide **+7.65% YoY** Central Valley listing-price figure (citable).
- ❌ **"~7.5% rental yields in the corridor"** — flat wrong. That's the city average. Corridor yields are compressed at 6%–8%. Use the corrected framing in the rental-yields section above.
- ❌ Vague "BCCR confirms" or "según el BCCR" without a specific index name and URL — name the IMAE-Construcción explicitly or cut.
- ❌ Anything about days-on-market, % discount-from-asking, or transaction count specific to Santa Ana — no source verified at this fact-check pass.

## DELIVERABLES CHECKLIST

- [ ] `content/blog/santa-ana-mercado-silencioso/es.md` exists and parses with `gray-matter`
- [ ] `content/blog/santa-ana-mercado-silencioso/en.md` exists and parses with `gray-matter`
- [ ] Frontmatter matches the `BlogPostMeta` interface in `src/lib/blog.ts` (title, description, keywords[], date, author, image, lang)
- [ ] Slug renders at `/es/blog/santa-ana-mercado-silencioso` and `/en/blog/santa-ana-mercado-silencioso` in dev
- [ ] Listed on `/es/blog` and `/en/blog` in correct date order
- [ ] Sitemap (`src/app/sitemap.ts`) picks it up via `getAllSlugs()` — no manual sitemap edits required, but verify
- [ ] Image asset present at `/public/blog-santa-ana-mercado-silencioso.png` OR explicit flag that it's pending
- [ ] No claims that contradict `PLATFORM_CANONICAL.md`
- [ ] No bulleted lists in body prose (unless mirroring the enumerated-paragraph pattern from `stand-out-agent`)
- [ ] **No "IkiHomes" anywhere in the body** — auto-CTA card carries the brand alone
- [ ] **No outbound link to `ikihomescr.com`** from the body
- [ ] **No banned infoproduct phrases** (verified by search of body for: "dejando dinero", "secreto que mueve", "lo que nadie te está diciendo", "agentes inteligentes", "leaving money on the table", "secret driving the market", "smart agents already know")
- [ ] **At least two inline citations** to Costa Rican authority sources (El Financiero, CFIA, CCC, BCCR, CINDE, INEC, CRGAR), URLs verified
- [ ] **Optional inline link** to `/[lang]/blog/escazu-2026` if there's a natural anchor — skip if not
- [ ] Reading time renders as ~4 min on the post page (700–850 ES words ÷ 200 wpm rounds to 4)
- [ ] Self-review note listing: ES/EN word counts, every numeric/named-entity claim classified as (cited inline / from verified appendix / directional only), banned phrases checked, sources verified live
- [ ] Date timezone decision noted (accept `2026-04-24` shift to "23 de abril" OR use `2026-04-24T12:00:00`)
