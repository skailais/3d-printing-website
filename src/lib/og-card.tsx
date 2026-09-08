import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

/**
 * The studio's share card, one drawing with the words swapped.
 *
 * Every route renders its own so a shared link says what it opens: a link to
 * /materials should not present itself as the front page. Declaring openGraph
 * on a page also detaches it from the root opengraph-image file, so a card per
 * route is what keeps an image on the card at all.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#16130f";
const VERMILION = "#c4452d";
const MUTED = "#6e675b";

export function ogCard({
  eyebrow,
  headline,
  blurb,
}: {
  eyebrow: string;
  headline: string;
  blurb: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f3efe6",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 85% 30%, rgba(62,156,148,0.22), transparent 65%), radial-gradient(ellipse 50% 60% at 8% 90%, rgba(196,69,45,0.18), transparent 65%)",
          padding: "0 90px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", width: 48, height: 3, background: VERMILION }} />
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 6,
                color: VERMILION,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              // long headlines would otherwise run under the ensō
              fontSize: headline.length > 22 ? 82 : 104,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {headline}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 28,
              color: MUTED,
              lineHeight: 1.4,
            }}
          >
            {blurb}
          </div>
        </div>

        {/* ensō — an open circle, the brush lifted before it closes.
            A flex sibling rather than `position: absolute; right: 70`, which
            Satori resolved against the wrong box and slid off the card's right
            edge. Source order places it, since Satori ignores `order`. */}
        <svg
          width="330"
          height="330"
          viewBox="0 0 220 220"
          style={{ flexShrink: 0, opacity: 0.9 }}
        >
          <path
            d="M 152 30 A 92 92 0 1 1 66 172"
            stroke={INK}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 64 174 A 92 92 0 0 0 104 188"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 90,
            bottom: 54,
            display: "flex",
            fontSize: 19,
            letterSpacing: 5,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    { ...size }
  );
}
