import { HeroSection } from "@/components/HeroSection";
import { ValuePropsSection } from "@/components/ValuePropsSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { getDictionary } from "@/dictionaries";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection dict={dict.hero} formDict={dict.form} />
      <StickyCTA label={dict.hero.cta} />
      <ValuePropsSection dict={dict.value_props} />
      <SocialProofSection dict={dict.social_proof} />
      <AboutSection dict={dict.about} />
      <Footer dict={dict.footer} formDict={dict.form} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
