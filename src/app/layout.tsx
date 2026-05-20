import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "MERKANTO | Global Trade Leaders",
  description:
    "MERKANTO is a luxury global trade ecosystem — combining institutional trade, premium education, automotive excellence, cinematic weddings, and elite event management.",
  keywords: ["global trade", "export", "trade academy", "luxury", "automotive", "wedding cinema"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;900&family=Inter:wght@300;400;500;600&family=Geist:wght@400;500;600&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden w-full">
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
