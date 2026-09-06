import type { Metadata } from "next";
import { isAuthenticated, isConfigured } from "@/lib/server/auth";
import { listQuotes } from "@/lib/server/quotes";
import { countPath, dailyTraffic, readViews } from "@/lib/server/analytics";
import LoginScreen from "@/components/admin/LoginScreen";
import MasterDashboard from "@/components/admin/MasterDashboard";

export const metadata: Metadata = {
  title: "Studio control",
  description: "Internal.",
  robots: { index: false, follow: false, nocache: true },
};

/* Reads cookies, so it is rendered per request — never cached, never
   prerendered into a static file. */
export const dynamic = "force-dynamic";

export default async function MasterPage() {
  if (!(await isAuthenticated())) {
    // nothing below this point is sent to an unauthenticated browser
    return <LoginScreen configured={isConfigured()} />;
  }

  const [quotes, views] = await Promise.all([listQuotes(), readViews()]);

  const traffic = dailyTraffic(views, 30);
  const sessions = traffic.reduce((n, d) => n + d.sessions, 0);
  const totalViews = traffic.reduce((n, d) => n + d.views, 0);

  const since = new Date();
  since.setDate(since.getDate() - 30);
  const recentQuotes = quotes.filter((q) => new Date(q.receivedAt) >= since);

  const materialCounts = new Map<string, number>();
  for (const quote of recentQuotes) {
    materialCounts.set(quote.material, (materialCounts.get(quote.material) ?? 0) + 1);
  }
  const materialDemand = [...materialCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const funnel = [
    { stage: "Visited the site", count: sessions },
    { stage: "Opened the quote page", count: countPath(views, (p) => p.startsWith("/quote")) },
    { stage: "Sent a request", count: recentQuotes.length },
  ];

  const answered = quotes.filter((q) => q.status !== "new").length;

  return (
    <MasterDashboard
      traffic={traffic}
      totals={{
        views: totalViews,
        sessions,
        quotes: recentQuotes.length,
        answered,
        allQuotes: quotes.length,
      }}
      materialDemand={materialDemand}
      funnel={funnel}
      quotes={quotes.slice(0, 40)}
    />
  );
}
