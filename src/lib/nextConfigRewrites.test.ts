/**
 * In production this app owns the apex and proxies the buyer site for every
 * path it does not serve. Without WEB_ORIGIN nothing may be proxied, because
 * previews and local runs have no buyer site behind them.
 */
import { describe, it, expect, afterEach, vi } from "vitest";
import type { NextConfig } from "next";

type Rule = { source: string; destination: string };
type RewriteTable = { beforeFiles: Rule[]; afterFiles: Rule[]; fallback: Rule[] };

async function loadConfig(): Promise<NextConfig> {
  vi.resetModules();
  return (await import("../../next.config")).default;
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("next.config buyer site proxy", () => {
  it("proxies the buyer site's assets, root files and unmatched paths when WEB_ORIGIN is set", async () => {
    vi.stubEnv("WEB_ORIGIN", "https://buyer.example/");

    const rewrites = (await (await loadConfig()).rewrites!()) as RewriteTable;

    expect(rewrites.beforeFiles).toEqual([
      { source: "/web-static/:path*", destination: "https://buyer.example/web-static/:path*" },
      { source: "/sitemap-listings.xml", destination: "https://buyer.example/sitemap.xml" },
    ]);
    expect(rewrites.afterFiles).toEqual([
      { source: "/:file([^/]+\\.[A-Za-z0-9]+)", destination: "https://buyer.example/:file" },
    ]);
    expect(rewrites.fallback).toEqual([
      { source: "/:path*", destination: "https://buyer.example/:path*" },
    ]);
  });

  it("proxies nothing when WEB_ORIGIN is unset", async () => {
    vi.stubEnv("WEB_ORIGIN", "");

    expect(await (await loadConfig()).rewrites!()).toEqual([]);
  });
});
