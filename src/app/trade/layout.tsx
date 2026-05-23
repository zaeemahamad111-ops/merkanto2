import type { Metadata } from "next";
import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.trade.title", "seo.trade.description", "seo.trade.keywords"]);

  const getVal = (key: string, fallback: string): string => {
    const item = data?.find((d) => d.key === key);
    return item ? String(item.value) : fallback;
  };

  const title = getVal("seo.trade.title", "Institutional Trade | MERKANTO");
  const description = getVal("seo.trade.description", "Precision-driven commodity trading, heavy industrial components, and sustainable infrastructure supply chain architecture for global markets.");
  const keywords = getVal("seo.trade.keywords", "institutional trade, commodity trading, heavy industrial, sustainable infrastructure, global markets");

  return {
    title,
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    openGraph: {
      title,
      description,
      images: ["/images/merkanto_logo_new.png"],
    },
  };
}

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
