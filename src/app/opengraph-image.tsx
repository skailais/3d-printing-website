import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Professional 3D Printing`;
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#06070a",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(154,183,217,0.22), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 84,
              height: 84,
              borderRadius: "50%",
              border: "3px solid #9ab7d9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#9ab7d9",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: 3,
              height: 60,
              background: "#9ab7d9",
              marginTop: 4,
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 76,
              fontWeight: 700,
              color: "#eef1f5",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 30,
              color: "#99a3ae",
            }}
          >
            Professional 3D Printing
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
