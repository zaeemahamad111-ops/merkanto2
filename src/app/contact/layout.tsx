import type { Metadata } from "next";
import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.contact.title", "seo.contact.description", "seo.contact.keywords"]);

  const getVal = (key: string, fallback: string): string => {
    const item = data?.find((d) => d.key === key);
    return item ? String(item.value) : fallback;
  };

  const title = getVal("seo.contact.title", "Contact MERKANTO | Global Headquarters");
  const description = getVal("seo.contact.description", "Get in touch with MERKANTO Global Trade Leaders. Contact our corporate office in Kerala, India for trade, academy, automotive, or studio inquiries.");
  const keywords = getVal("seo.contact.keywords", "contact merkanto, merkanto headquarters, corporate office, trade inquiries");

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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
