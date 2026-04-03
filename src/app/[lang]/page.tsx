import { HeroSection } from "@/components/HeroSection";
import { ValuePropsSection } from "@/components/ValuePropsSection";
import { TrustVisibleSection } from "@/components/TrustVisibleSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { BuiltForCostaRicaSection } from "@/components/BuiltForCostaRicaSection";
import { EarlyEdgeSection } from "@/components/EarlyEdgeSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";
import { FormModal } from "@/components/FormModal";
import { StickyCTA } from "@/components/StickyCTA";
import { getDictionary } from "@/dictionaries";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection dict={dict.hero} />
      <StickyCTA label={dict.hero.cta} />
      <ValuePropsSection dict={dict.value_props} />
      <HowItWorksSection dict={dict.how_it_works} />
      <TrustVisibleSection dict={dict.trust_visible} />
      <BuiltForCostaRicaSection dict={dict.built_for_cr} />
      <EarlyEdgeSection dict={dict.early_edge} />
      <FinalCTASection dict={dict.final_cta} />
      <Footer dict={dict.footer} formDict={dict.form} />
      <FormModal closeLabel={dict.modal.close} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
