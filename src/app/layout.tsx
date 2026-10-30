import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import { siteGraph } from "@/lib/structured-data";
import { site } from "@/data/site";

// Main typeface — swap here (and keep the variable name) to try another font
const sans = Inter_Tight({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Set these in Vercel → Settings → Environment Variables (see SEO.md)
// GA4 measurement ID is public (it ships in every page), so it lives here as the default;
// NEXT_PUBLIC_GA_ID in Vercel overrides it if set.
const gaId = process.env.NEXT_PUBLIC_GA_ID || site.gaId;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const defaultTitle = `${site.name} | ${site.jobTitle} in ${site.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: site.keywords,
  category: "design",
  alternates: { canonical: "/" },
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    title: defaultTitle,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  ...(googleVerification && { verification: { google: googleVerification } }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
  colorScheme: "light dark",
};

// Runs before paint: applies the saved theme (or the OS preference) so dark mode never flashes white
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={siteGraph()} />
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent gaId={gaId} />
        </MotionProvider>
      </body>
    </html>
  );
}
