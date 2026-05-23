import type { Metadata } from "next";
import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.about.title", "seo.about.description", "seo.about.keywords"]);

  const getVal = (key: string, fallback: string): string => {
    const item = data?.find((d) => d.key === key);
    return item ? String(item.value) : fallback;
  };

  const title = getVal("seo.about.title", "About MERKANTO | Institutional Profile & Philosophy");
  const description = getVal("seo.about.description", "Learn about MERKANTO's global enterprise, structural intelligence for global commerce, private capital execution, and strategic compliance advisory.");
  const keywords = getVal("seo.about.keywords", "merkanto about, global enterprise, supply chain, compliance, capital execution");

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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
