import { HeroSection } from "@/components/HeroSection";
import { ValuePropsSection } from "@/components/ValuePropsSection";
import { DifferentiationSection } from "@/components/DifferentiationSection";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/dictionaries";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection dict={dict.hero} formDict={dict.form} />
      <ValuePropsSection dict={dict.value_props} />
      <DifferentiationSection dict={dict.differentiation} />
      <Footer dict={dict.footer} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
