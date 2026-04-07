import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { MechanicSection } from "@/components/MechanicSection";
import { TrustSection } from "@/components/TrustSection";
import { SplitSection } from "@/components/SplitSection";
import { BottomCTASection } from "@/components/BottomCTASection";
import { StickyCTA } from "@/components/StickyCTA";
import { getDictionary } from "@/dictionaries";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection dict={dict.hero} />
      <StickyCTA label={dict.hero.cta} />
      <StatsBar dict={dict.stats} />
      <MechanicSection dict={dict.mechanic} />
      <TrustSection dict={dict.trust} />
      <SplitSection dict={dict.split} />
      <BottomCTASection dict={dict.bottom_cta} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
