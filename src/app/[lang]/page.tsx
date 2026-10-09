import { HeroSection } from "@/components/HeroSection";
import { ProductProofSection } from "@/components/ProductProofSection";
import { PathSplitSection } from "@/components/PathSplitSection";
import { CapabilitiesGrid } from "@/components/CapabilitiesGrid";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { NotifySection } from "@/components/NotifySection";
import { BuyerHome } from "@/components/BuyerHome";
import { getDictionary } from "@/dictionaries";

/**
 * The Spanish home turns from the countdown to the open page at the launch
 * instant (src/lib/launch.ts). It is statically generated, so it regenerates
 * every minute: within about a minute of the hour its server HTML says open,
 * with no deploy. The script in <head> and the countdown cover that minute.
 */
export const revalidate = 60;

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  if (lang === "es") return <BuyerHome dict={dict.buyer} />;

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
