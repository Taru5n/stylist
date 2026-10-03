import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "MINES — AI Personal Stylist",
  description:
    "Discover your signature style with MINES, the world's most intelligent AI personal stylist. Get personalized fashion recommendations, color analysis, wardrobe curation, and virtual try-on experiences.",
  keywords: [
    "AI stylist",
    "personal stylist",
    "fashion AI",
    "color analysis",
    "wardrobe",
    "style guide",
    "virtual try-on",
  ],
  openGraph: {
    title: "MINES — AI Personal Stylist",
    description:
      "Your world-class AI fashion consultant. Discover colors, styles, and outfits curated just for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased bg-ivory text-ink">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
