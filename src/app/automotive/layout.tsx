import type { Metadata } from "next";
import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.automotive.title", "seo.automotive.description", "seo.automotive.keywords"]);

  const getVal = (key: string, fallback: string) => {
    const item = data?.find((d) => d.key === key);
    return item ? item.value : fallback;
  };

  const title = getVal("seo.automotive.title", "Automotive Excellence | MERKANTO");
  const description = getVal("seo.automotive.description", "Luxury vehicle customization, interior reimagining, technical enhancements, and bespoke aesthetics for the discerning collector.");
  const keywords = getVal("seo.automotive.keywords", "luxury automotive, vehicle customization, technical enhancements, bespoke aesthetics, interior reimagining");

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

export default function AutomotiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
