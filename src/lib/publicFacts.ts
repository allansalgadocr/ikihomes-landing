/**
 * The public facts about the agent product that this site states (the blog
 * band and llms.txt). The authoritative copy is the canonical in ikihomes-app
 * (docs/PLATFORM_CANONICAL.md section 4 and section 5) and the maintenance
 * note docs/PUBLIC_FACTS.md there. ikihomes-web keeps the same constants in
 * its src/lib/publicFacts.ts: the two apps cannot import each other, so a
 * change is made in both, and publicFacts.test.ts here fails when a sentence
 * on this site stops matching.
 */

/** Public listings a Free account may have published at a time (canonical section 4). */
export const FREE_PUBLIC_LISTING_LIMIT = 10;

/** Realtor Pro, US dollars per month (canonical section 4). */
export const PRO_PRICE_USD = 49;

/** Valid agent responses accepted per buyer request (canonical section 5). */
export const BUYER_REQUEST_RESPONSE_CAP = 3;

/** Whether an agent can buy Pro online today (portal PRO_PURCHASE_ENABLED). */
export const PRO_PURCHASE_OPEN = false;
