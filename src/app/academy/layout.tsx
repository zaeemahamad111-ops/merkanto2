import type { Metadata } from "next";
import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.academy.title", "seo.academy.description", "seo.academy.keywords"]);

  const getVal = (key: string, fallback: string) => {
    const item = data?.find((d) => d.key === key);
    return item ? item.value : fallback;
  };

  const title = getVal("seo.academy.title", "Global Trade Academy | MERKANTO");
  const description = getVal("seo.academy.description", "Learn international trade from real business operations. Access proprietary blueprints of global logistics and live data streams of Merkanto's networks.");
  const keywords = getVal("seo.academy.keywords", "trade academy, international trade learning, logistics training, export academy");

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

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
