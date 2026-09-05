import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://caliprint.example.com"),
  title: {
    default: "CaliPrint — Professional 3D Printing",
    template: "%s — CaliPrint",
  },
  description:
    "Upload a model, choose a material, get a precision-printed part. Professional FDM and resin 3D printing, prototyping and small-batch production.",
  keywords: [
    "3D printing",
    "FDM printing",
    "resin printing",
    "SLA printing",
    "prototyping",
    "small batch production",
    "custom parts",
  ],
  openGraph: {
    title: "CaliPrint — Professional 3D Printing",
    description:
      "Upload a model, choose a material, get a precision-printed part.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CaliPrint — Professional 3D Printing",
    description:
      "Upload a model, choose a material, get a precision-printed part.",
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <div className="atmosphere" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
