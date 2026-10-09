import type { Metadata } from "next";
import { Urbanist, Source_Sans_3 } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

/** What the home says in a search result and in a shared link. */
async function homeCopy(isEs: boolean) {
  if (isEs) {
    // The buyer page. The title stays the same in both states so the page is
    // not reindexed over a teaser; the rest follows the phase at render time,
    // and the home route regenerates every minute, so it turns with the hour.
    const { seo, og } = (await getDictionary("es")).buyer;
    const open = currentPhase() === "open";
    return {
      title: seo.title,
      description: fillLaunch(open ? seo.description_open : seo.description_pre),
      shareTitle: fillLaunch(open ? og.title_open : og.title_pre),
      shareDescription: fillLaunch(open ? og.description_open : og.description_pre),
      image: "/og-compradores.png",
      imageAlt: og.image_alt,
    };
  }

  // Keyword-first titles, because nobody searches "IkiHomes" yet. Zone names in
  // the description for bold matches in search results.
  const title = "Real Estate Agents Costa Rica — Get Buyer Requests | IkiHomes";
  const description =
    "Receive buyer property requests in your zone. Escazú, Santa Ana, San José, Guanacaste. Respond fast, earn trust badges, and win clients. The platform for real estate agents in Costa Rica.";
  return {
    title,
    description,
    shareTitle: title,
    shareDescription: description,
    image: "/og-image.png",
    imageAlt: "IkiHomes, the working platform for real estate agents in Costa Rica",
  };
}

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params;

  const isEs = lang === "es";
  const { title, description, shareTitle, shareDescription, image, imageAlt } = await homeCopy(isEs);

  return {
    title,
    description,
    metadataBase: new URL("https://ikihomescr.com"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/es",
      },
    },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      type: "website",
      locale: isEs ? "es_CR" : "en_US",
      siteName: "IkiHomes",
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    other: {
      "geo.region": "CR",
      "geo.placename": "Cartago, La Unión, Costa Rica",
    },
  };
}

import { getDictionary } from "../../dictionaries";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { BuyerNavBar } from "@/components/BuyerNavBar";
import { BuyerFooter } from "@/components/BuyerFooter";
import { BuyerStickyCta } from "@/components/BuyerStickyCta";
import { MetaPixel } from "@/components/MetaPixel";
import { PHASE_SCRIPT, currentPhase, fillLaunch } from "@/lib/launch";

/** JSON-LD structured data for Organization + WebSite */
function StructuredData({ lang, websiteDescription }: { lang: string; websiteDescription: string }) {
  const isEs = lang === "es";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IkiHomes",
    url: "https://ikihomescr.com",
    logo: "https://ikihomescr.com/logo.svg",
    image: "https://ikihomescr.com/og-image.png",
    description: isEs
      ? "Plataforma que conecta compradores de propiedades en Costa Rica con agentes inmobiliarios clasificados por confianza y capacidad de respuesta."
      : "Platform connecting property buyers in Costa Rica with real estate agents ranked by trust and responsiveness.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CR",
      addressRegion: "Cartago",
      addressLocality: "La Unión",
    },
    areaServed: [
      {
        "@type": "City",
        name: "San José",
        containedInPlace: { "@type": "Country", name: "Costa Rica" },
      },
      {
        "@type": "City",
        name: "Escazú",
        containedInPlace: { "@type": "Country", name: "Costa Rica" },
      },
      {
        "@type": "City",
        name: "Santa Ana",
        containedInPlace: { "@type": "Country", name: "Costa Rica" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Guanacaste",
        containedInPlace: { "@type": "Country", name: "Costa Rica" },
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "soporte@ikihomescr.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "IkiHomes",
    url: "https://ikihomescr.com",
    inLanguage: ["es", "en"],
    description: websiteDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
    </>
  );
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const { children, params } = props;
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "es");
  const isEs = lang === "es";

  // Spanish pages carry the launch phase on <html>, and the stylesheet shows
  // the elements of that phase only. It is the server's phase at render time;
  // the script below can move it from pre to open, never back, and the
  // countdown moves it at zero. English pages carry none.
  return (
    <html
      lang={lang}
      data-js
      data-phase={isEs ? currentPhase() : undefined}
      suppressHydrationWarning={isEs}
    >
      <head>
        {isEs && <script dangerouslySetInnerHTML={{ __html: PHASE_SCRIPT }} />}
        <link rel="alternate" hrefLang="en" href="https://ikihomescr.com/en" />
        <link rel="alternate" hrefLang="es" href="https://ikihomescr.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://ikihomescr.com/es" />
        <StructuredData
          lang={lang}
          websiteDescription={
            isEs
              ? dict.buyer.seo.schema_website_description
              : "The platform for real estate agents in Costa Rica."
          }
        />
        {/* noscript: remove data-js so reveal classes don't hide content */}
        <noscript>
          <style>{`html[data-js] .reveal, html[data-js] .reveal-scale, html[data-js] .reveal-left, html[data-js] .reveal-right, html[data-js] .reveal-child, html[data-js] .reveal-child-scale { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body
        className={`${urbanist.variable} ${sourceSans.variable} antialiased`}
      >
        {isEs ? <BuyerNavBar dict={dict.buyer.nav} /> : <NavBar dict={dict.nav} />}
        {children}
        {isEs ? (
          <BuyerFooter dict={dict.buyer.footer} common={dict.footer} />
        ) : (
          <Footer lang={lang} dict={dict.footer} />
        )}
        {isEs ? (
          <BuyerStickyCta dict={dict.buyer.sticky} />
        ) : (
          <StickyCta label={dict.nav.cta} labelPrelaunch={dict.nav.cta_prelaunch} />
        )}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <MetaPixel />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
