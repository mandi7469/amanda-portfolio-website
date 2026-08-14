import { ImageResponse } from "next/og";

export const alt = "Amanda Changa, Frontend and Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          color: "white",
          background: "#0a0a0a",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: "0.08em", color: "#d8d8d8" }}>
          AC
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: "-0.05em" }}>
            Amanda Changa
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#dedede" }}>
            Frontend · Full-Stack · AI-Assisted Developer
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: 1, background: "#6d6d6d" }} />
      </div>
    ),
    size,
  );
}
