import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { NotifySection } from "@/components/NotifySection";
import es from "@/dictionaries/es.json";

describe("NotifySection before submitting", () => {
  const markup = renderToStaticMarkup(<NotifySection dict={es.notify} />);

  it("asks for a name, because a prelaunch invitation cannot be created without one", () => {
    const nameInput = markup.match(/<input[^>]*name="name"[^>]*\/>/)?.[0] ?? "";
    expect(nameInput).toContain('required=""');
  });

  it("offers no email link beside the form, so every visitor from an ad signs up or stays", () => {
    expect(markup).not.toContain("mailto:");
  });
});
