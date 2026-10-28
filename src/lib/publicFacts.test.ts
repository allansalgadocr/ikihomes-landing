import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import es from "@/dictionaries/es.json";
import en from "@/dictionaries/en.json";
import {
  BUYER_REQUEST_RESPONSE_CAP,
  FREE_PUBLIC_LISTING_LIMIT,
  PRO_PRICE_USD,
  PRO_PURCHASE_OPEN,
} from "./publicFacts";

const llms = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");

/**
 * The facts are stated as words in the dictionaries and in llms.txt. These
 * tests tie those sentences to the constants, so a fact that changes in the
 * canonical fails here and points at every sentence to rewrite.
 */
describe("the public facts this site states", () => {
  it("pin the canonical values", () => {
    expect(FREE_PUBLIC_LISTING_LIMIT).toBe(10);
    expect(PRO_PRICE_USD).toBe(49);
    expect(BUYER_REQUEST_RESPONSE_CAP).toBe(3);
    expect(PRO_PURCHASE_OPEN).toBe(false);
  });

  it("match the blog band in both languages", () => {
    expect(es.blog.cta_body).toContain(`hasta ${FREE_PUBLIC_LISTING_LIMIT} publicadas a la vez`);
    expect(en.blog.cta_body).toContain(`up to ${FREE_PUBLIC_LISTING_LIMIT} published listings at a time`);
  });

  it("match llms.txt, activation note included while purchase is closed", () => {
    expect(llms).toContain(`up to ${FREE_PUBLIC_LISTING_LIMIT} published listings at a time`);
    expect(llms).toContain(`Realtor Pro: US$${PRO_PRICE_USD} per month.`);
    expect(llms).toContain("only the first three valid responses per request are accepted");
    if (!PRO_PURCHASE_OPEN) {
      expect(llms).toContain("Online purchase is not open yet");
    }
    expect(llms).toContain("https://www.ikihomescr.com/es/para-agentes");
    expect(llms).toContain("https://www.ikihomescr.com/es/blog/donde-publicar-propiedades-costa-rica");
  });
});
