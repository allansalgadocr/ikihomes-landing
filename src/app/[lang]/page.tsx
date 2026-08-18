import { HeroSection } from "@/components/HeroSection";
import { ProductProofSection } from "@/components/ProductProofSection";
import { PathSplitSection } from "@/components/PathSplitSection";
import { CapabilitiesGrid } from "@/components/CapabilitiesGrid";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { NotifySection } from "@/components/NotifySection";
import { getDictionary } from "@/dictionaries";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection dict={dict.hero} />
      <ProductProofSection dict={dict.proof} />
      <PathSplitSection dict={dict.paths} />
      <CapabilitiesGrid dict={dict.capabilities} />
      <PricingSection dict={dict.pricing} september={dict.september} />
      <FaqSection dict={dict.faq} />
      <NotifySection dict={dict.notify} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
