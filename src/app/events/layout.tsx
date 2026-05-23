import type { Metadata } from "next";
import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.events.title", "seo.events.description", "seo.events.keywords"]);

  const getVal = (key: string, fallback: string): string => {
    const item = data?.find((d) => d.key === key);
    return item ? String(item.value) : fallback;
  };

  const title = getVal("seo.events.title", "Global Event Production | MERKANTO Studios");
  const description = getVal("seo.events.description", "Architectural event design, corporate galas, summits, and couture celebrations for the world's most discerning visionaries.");
  const keywords = getVal("seo.events.keywords", "event production, architectural event design, corporate galas, couture celebrations, luxury events");

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

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
