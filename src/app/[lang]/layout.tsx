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
    ? "IkiHomes | Plataforma Inmobiliaria para Agentes en Costa Rica" 
    : "IkiHomes | Real Estate Platform for Agents in Costa Rica";
  const description = isEs
    ? "Centraliza tus propiedades, comparte enlaces confiables por WhatsApp y gestiona leads sin caos. La nueva forma profesional de vender en Costa Rica."
    : "Centralize your properties, share trusted WhatsApp links, and manage leads without chaos. The new professional way to sell in Costa Rica.";

  return {
    title,
    description,
    metadataBase: new URL("https://ikihomescr.com"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      images: ["/og-image.png"],
    },
  };
}



export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const { children, params } = props;
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://ikihomescr.com/en" />
        <link rel="alternate" hrefLang="es" href="https://ikihomescr.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://ikihomescr.com/en" />
      </head>
      <body
        className={`${urbanist.variable} ${sourceSans.variable} antialiased`}
      >
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
