import type { Metadata } from "next";
import { Urbanist, Source_Sans_3 } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageSelector } from "@/components/LanguageSelector";
import "../globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(
  // @ts-ignore
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params;

  const isEs = lang === "es";
  const title = isEs
    ? "IkiHomes | Recibe Solicitudes de Compradores — Agentes Inmobiliarios Costa Rica"
    : "IkiHomes | Get Buyer Requests — Real Estate Agents Costa Rica";
  const description = isEs
    ? "Recibe solicitudes de compradores en tu zona. Responde rápido, gana insignias de confianza y cierra más clientes. La plataforma para agentes inmobiliarios en Costa Rica."
    : "Receive buyer property requests in your zone. Respond fast, earn trust badges, and win clients. The platform for real estate agents in Costa Rica.";

  return {
    title,
    description,
    metadataBase: new URL("https://ikihomescr.com"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      images: ["/og-image.png"],
      type: "website",
      locale: isEs ? "es_CR" : "en_US",
      siteName: "IkiHomes",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.png", type: "image/png" },
      ],
      apple: "/favicon.png",
    },
  };
}

import { getDictionary } from "../../dictionaries";
import { StatusBanner } from "@/components/StatusBanner";

/** JSON-LD structured data for Organization + LocalBusiness */
function StructuredData({ lang }: { lang: string }) {
  const isEs = lang === "es";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IkiHomes",
    url: "https://ikihomescr.com",
    logo: "https://ikihomescr.com/logo.svg",
    description: isEs
      ? "Plataforma que conecta compradores de propiedades en Costa Rica con agentes inmobiliarios clasificados por confianza y capacidad de respuesta."
      : "Platform connecting property buyers in Costa Rica with real estate agents ranked by trust and responsiveness.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@ikihomescr.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "IkiHomes",
    url: "https://ikihomescr.com",
    logo: "https://ikihomescr.com/logo.svg",
    image: "https://ikihomescr.com/og-image.png",
    description: isEs
      ? "Plataforma inmobiliaria en Costa Rica. Recibe solicitudes de compradores reales en tu zona."
      : "Real estate platform in Costa Rica. Receive real buyer requests in your zone.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CR",
      addressRegion: "San José",
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
    priceRange: "$$",
    openingHours: "Mo-Fr 08:00-18:00",
    email: "contact@ikihomescr.com",
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "IkiHomes",
    url: "https://ikihomescr.com",
    inLanguage: [isEs ? "es" : "en"],
    description: isEs
      ? "La plataforma para agentes inmobiliarios en Costa Rica."
      : "The platform for real estate agents in Costa Rica.",
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
          __html: JSON.stringify(localBusinessSchema),
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

  return (
    <html lang={lang} data-js>
      <head>
        <link rel="alternate" hrefLang="en" href="https://ikihomescr.com/en" />
        <link rel="alternate" hrefLang="es" href="https://ikihomescr.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://ikihomescr.com/en" />
        <StructuredData lang={lang} />
        {/* noscript: remove data-js so reveal classes don't hide content */}
        <noscript>
          <style>{`html[data-js] .reveal, html[data-js] .reveal-scale, html[data-js] .reveal-left, html[data-js] .reveal-right, html[data-js] .reveal-child, html[data-js] .reveal-child-scale { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body
        className={`${urbanist.variable} ${sourceSans.variable} antialiased`}
      >
        <StatusBanner text={dict.status_banner} />
        <LanguageSelector />
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
