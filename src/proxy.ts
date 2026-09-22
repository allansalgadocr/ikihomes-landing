import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "es";
const BUYER_SITE_PATH = /^\/(?!blog\/)[^/]+\/.+/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Two or more segments outside the blog is the buyer site behind the fallback
  // rewrite: short links, shares, private views, OG images, API routes and its
  // prefixed assets. It must arrive unprefixed, because the buyer site
  // negotiates its own locale and some of those routes have none.
  if (BUYER_SITE_PATH.test(pathname)) return;

  // Redirect if there is no locale
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths (_next), static assets, and sitemap/robots
    "/((?!_next|web-static/|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$|.*\\.webp$|.*\\.gif$|.*\\.txt$|.*\\.xml$|sitemap|robots).*)",
  ],
};
