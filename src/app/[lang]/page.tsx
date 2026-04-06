import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { ValuePropsSection } from "@/components/ValuePropsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { DifferentiationSection } from "@/components/DifferentiationSection";
import { BuiltForCostaRicaSection } from "@/components/BuiltForCostaRicaSection";
import { EarlyEdgeSection } from "@/components/EarlyEdgeSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { StickyCTA } from "@/components/StickyCTA";
import { getDictionary } from "@/dictionaries";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection dict={dict.hero} />
      <StickyCTA label={dict.hero.cta} />
      <IntroSection dict={dict.intro} />
      <ValuePropsSection dict={dict.value_props} />
      <HowItWorksSection dict={dict.how_it_works} />
      <DifferentiationSection dict={dict.differentiation} />
      <BuiltForCostaRicaSection dict={dict.built_for_cr} />
      <EarlyEdgeSection dict={dict.early_edge} />
      <FinalCTASection dict={dict.final_cta} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
