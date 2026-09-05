import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Print Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#f3efe6",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 85% 30%, rgba(62,156,148,0.22), transparent 65%), radial-gradient(ellipse 50% 60% at 8% 90%, rgba(196,69,45,0.18), transparent 65%)",
          padding: "0 90px",
        }}
      >
        {/* ensō */}
        <svg
          width="360"
          height="360"
          viewBox="0 0 220 220"
          style={{ position: "absolute", right: 70, top: 135, opacity: 0.9 }}
        >
          <path
            d="M 152 30 A 92 92 0 1 1 66 172"
            stroke="#16130f"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 64 174 A 92 92 0 0 0 104 188"
            stroke="#16130f"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", width: 48, height: 3, background: "#c4452d" }} />
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 6,
                color: "#c4452d",
                textTransform: "uppercase",
              }}
            >
              Professional 3D Printing
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 104,
              fontWeight: 700,
              color: "#16130f",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Ideas, made solid.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 28,
              color: "#6e675b",
              lineHeight: 1.4,
            }}
          >
            {SITE_NAME} — a print studio for prototypes, functional parts and short runs.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
