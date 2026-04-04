"use client";

import { useEffect } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID || PIXEL_ID === "YOUR_PIXEL_ID_HERE") return;
    if (typeof window.fbq === "function") return;

    // Run Meta's pixel init snippet verbatim via Function constructor
    new Function(
      `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`
    )();
  }, []);

  if (!PIXEL_ID || PIXEL_ID === "YOUR_PIXEL_ID_HERE") return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

/**
 * Track custom Meta Pixel events from anywhere.
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
}
