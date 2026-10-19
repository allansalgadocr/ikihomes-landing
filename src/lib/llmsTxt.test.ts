/**
 * /llms.txt describes IkiHomes to AI assistants. The proxy skips .txt paths,
 * so this app serves the file from public/ ahead of the fallback rewrite.
 */
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { config } from "../proxy";

const llms = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");

describe("llms.txt", () => {
  it("opens with the site name as its title", () => {
    expect(llms.startsWith("# IkiHomes\n")).toBe(true);
  });

  it("links only to addresses that answer without a redirect", () => {
    const urls = llms.match(/https?:\/\/[^\s)]+/g) ?? [];
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.filter((url) => url.startsWith("https://ikihomescr.com") || url.startsWith("http://"))).toEqual([]);
  });

  it("is left alone by the proxy", () => {
    expect(config.matcher[0]).toContain(".*\\.txt$");
  });
});
