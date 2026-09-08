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
  /* Shippori Mincho is a Japanese serif. Even asking only for latin, the
     family is sliced into about a hundred unicode-range files per weight, and
     preload — which defaults on — emitted a <link rel="preload"> for every
     one: 245 of them, 7.3MB of woff2 pulled before the page could settle, for
     a face used on headings.
     Without the preload the browser fetches only the slices the glyphs on the
     page actually need. Geist and Geist Mono keep their preload; they are two
     files each and they set the body text. */
  preload: false,
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
  /* No canonical and no og:url here on purpose. Both inherit down the tree,
     and a value set at the root is a value every page below repeats about
     itself — pages claiming to be the home page. Each route declares its own
     through pageMetadata(); the home page does so in app/page.tsx. */
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b09" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Applies the saved theme before the first paint. Anything later — an effect,
 * a layout pass — and the wrong ground flashes up for a frame.
 */
const noFlashTheme = `(function(){try{var t=localStorage.getItem('caliprint-theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${shippori.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body className="relative flex min-h-full flex-col bg-surface">
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
