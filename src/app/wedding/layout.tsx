import type { Metadata } from "next";
import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.wedding.title", "seo.wedding.description", "seo.wedding.keywords"]);

  const getVal = (key: string, fallback: string): string => {
    const item = data?.find((d) => d.key === key);
    return item ? String(item.value) : fallback;
  };

  const title = getVal("seo.wedding.title", "Cinematic Weddings | MERKANTO Studios");
  const description = getVal("seo.wedding.description", "Elite wedding photography and cinematic filmography for those who view life through a cinematic lens. Precision-crafted imagery for the global aesthetic elite.");
  const keywords = getVal("seo.wedding.keywords", "cinematic weddings, elite wedding photography, luxury filmography, wedding imagery");

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

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
