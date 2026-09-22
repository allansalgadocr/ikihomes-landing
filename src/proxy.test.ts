/**
 * The proxy runs before every rewrite. It locale-prefixes the paths this app
 * serves, and must leave the buyer site's paths alone so the fallback rewrite
 * forwards them unchanged.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

function run(path: string) {
  return proxy(new NextRequest(`https://ikihomescr.com${path}`));
}

describe("landing proxy", () => {
  it.each(["/", "/blog", "/blog/escazu-2026", "/privacy", "/terms", "/unknown"])(
    "locale-prefixes %s as before",
    (path) => {
      const location = run(path)?.headers.get("location");

      expect(location).toBe(`https://ikihomescr.com/es${path === "/" ? "" : path}`);
    },
  );

  it.each([
    "/es",
    "/en/blog",
    "/es/properties/casa-en-escazu",
  ])("leaves the locale-prefixed %s alone", (path) => {
    expect(run(path)).toBeUndefined();
  });

  it.each([
    "/p/ABCD2345",
    "/share/tok123",
    "/view/tok123",
    "/promo-card/3f1a9c22",
    "/og/share/tok123",
    "/api/Property/3f1a9c22/contact",
    "/web-static/_next/static/chunks/main.js",
    "/properties/casa-en-escazu",
  ])("passes the buyer site path %s through unprefixed", (path) => {
    expect(run(path)).toBeUndefined();
  });
});
