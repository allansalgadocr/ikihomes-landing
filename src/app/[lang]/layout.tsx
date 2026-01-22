import type { Metadata } from "next";
import { Arsenal_SC, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageSelector } from "@/components/LanguageSelector";
import "../globals.css";

const arsenalSC = Arsenal_SC({
  variable: "--font-arsenal-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(
  // @ts-ignore
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params;
  
  const isEs = lang === "es";
  const title = isEs 
    ? "IkiHomes - La Plataforma Inmobiliaria Inteligente" 
    : "IkiHomes - The Smarter Real Estate Platform";
  const description = isEs
    ? "Listados, leads, CRM e insights de IA — todo en un solo lugar. Pronto en Costa Rica."
    : "Listings, leads, CRM, and AI insights — all in one place. Coming soon for modern agents in Costa Rica.";

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
        className={`${arsenalSC.variable} ${poppins.variable} antialiased`}
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
