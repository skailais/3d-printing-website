import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Shippori_Mincho } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChromeGate from "@/components/layout/ChromeGate";
import MotionProvider from "@/components/MotionProvider";
import PageViews from "@/components/PageViews";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  /* 400 for plain display text, 500 and 600 for headings — 700 is unused, and
     each weight is a separate file for a non-variable face. */
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Print Studio`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "3D printing",
    "FDM printing",
    "resin printing",
    "SLA printing",
    "prototyping",
    "small batch production",
    "custom parts",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Print Studio`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Print Studio`,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${shippori.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-paper">
        <div className="washi" aria-hidden="true" />
        <PageViews />
        <MotionProvider>
          <ChromeGate>
            <Navbar />
          </ChromeGate>
          <main className="relative z-10 flex-1">{children}</main>
          <ChromeGate>
            <Footer />
          </ChromeGate>
        </MotionProvider>
      </body>
    </html>
  );
}
