"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/components/MetaPixel";

/** Fires ViewContent on blog article page load */
export function BlogPixelTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackMetaEvent("ViewContent", { category: "blog", content_name: slug });
  }, [slug]);

  return null;
}
