import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sambasiva Naidu | Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d1117",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ color: "#e6edf3", fontSize: 52, fontWeight: 700, letterSpacing: "-1px" }}>
          Sambasiva Naidu
        </div>
        <div style={{ color: "#7d8590", fontSize: 26 }}>
          Software Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
