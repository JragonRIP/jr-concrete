import type { Metadata } from "next";
import { Archivo, Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileCTA } from "@/components/MobileCTA";
import { Navbar } from "@/components/Navbar";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JR’s Concrete | Concrete Contractor in Powers, MI",
    template: "%s | JR’s Concrete",
  },
  description: site.description,
  keywords: [
    "concrete contractor",
    "Powers Michigan",
    "Upper Peninsula concrete",
    "driveways",
    "patios",
    "foundations",
    "stamped concrete",
    "garage slabs",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JR’s Concrete | Concrete Contractor in Powers, MI",
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "JR’s Concrete | Concrete Contractor in Powers, MI",
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
