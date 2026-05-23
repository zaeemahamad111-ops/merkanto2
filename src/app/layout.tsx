import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import StartupLoader from "@/components/layout/StartupLoader";

import { supabase } from "@/utils/supabaseClient";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch SEO configuration directly from Supabase (bypassing client-side hooks)
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.home.title", "seo.home.description", "seo.home.keywords"]);

  const getVal = (key: string, fallback: string): string => {
    const item = data?.find((d) => d.key === key);
    return item ? String(item.value) : fallback;
  };

  const title = getVal("seo.home.title", "MERKANTO | Global Trade Leaders");
  const description = getVal("seo.home.description", "MERKANTO is a luxury global trade ecosystem — combining institutional trade, premium education, automotive excellence, cinematic weddings, and elite event management.");
  const keywords = getVal("seo.home.keywords", "global trade, export, trade academy, luxury, automotive, wedding cinema");

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://merkanto2.vercel.app'),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global scripts for the head tag
  const { data } = await supabase
    .from("merkanto_content")
    .select("key, value")
    .in("key", ["seo.global.schema", "seo.global.analytics"]);

  const schemaStr = data?.find((d) => d.key === "seo.global.schema")?.value || "";
  const analyticsStr = data?.find((d) => d.key === "seo.global.analytics")?.value || "";

  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Manrope:wght@300;400;500;600;700;800&family=Geist:wght@400;500;600&display=swap"
        />
        {schemaStr && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />}
        {analyticsStr && <script dangerouslySetInnerHTML={{ __html: analyticsStr }} />}
      </head>
      <body className="bg-background line-pattern text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden w-full">
        <StartupLoader />
        <div className="fixed inset-0 grain-overlay z-50 pointer-events-none" />
        <Navbar />
        <main className="flex-1 flex flex-col relative w-full">
          {children}
        </main>
        <FooterWrapper />
        <WhatsAppButton />
      </body>
    </html>
  );
}

// Server component — wraps Footer without needing usePathname
function FooterWrapper() {
  // Footer is always shown; Navbar already conditionally hides on /dashboard
  // Dashboard pages use their own full-screen layout so Footer rendering is inconsequential
  return <Footer />;
}
