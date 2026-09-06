import type { Metadata } from "next";
import MasterDashboard from "@/components/admin/MasterDashboard";

export const metadata: Metadata = {
  title: "Studio control",
  description: "Internal.",
  // keep it out of search results; it is also absent from the sitemap and nav
  robots: { index: false, follow: false, nocache: true },
};

export default function MasterPage() {
  return <MasterDashboard />;
}
