import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Amanda Changa, Frontend and Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OpenGraphCardProps = {
  smokePosterSrc: string;
  whiteLogoSrc: string;
};

export function OpenGraphCard({ smokePosterSrc, whiteLogoSrc }: OpenGraphCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        color: "white",
        background: "#0a0a0a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src={smokePosterSrc}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 48%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(6, 8, 12, 0.84) 0%, rgba(6, 8, 12, 0.62) 58%, rgba(6, 8, 12, 0.36) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
        }}
      >
        <img
          src={whiteLogoSrc}
          alt="Amanda Changa logo"
          width={150}
          height={104}
          style={{ width: 150, height: 104, objectFit: "contain" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              textShadow: "0 3px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            Amanda Changa
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#f2f2f2",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.55)",
            }}
          >
            Frontend · Full-Stack · AI-Assisted Developer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 1,
            background: "rgba(255, 255, 255, 0.58)",
          }}
        />
      </div>
    </div>
  );
}

export default async function OpenGraphImage() {
  const [smokePosterData, whiteLogoData] = await Promise.all([
    readFile(join(process.cwd(), "public/media/smoke-opengraph.jpg"), "base64"),
    readFile(join(process.cwd(), "public/brand/ac-logo-white.svg"), "base64"),
  ]);

  return new ImageResponse(
    <OpenGraphCard
      smokePosterSrc={`data:image/jpeg;base64,${smokePosterData}`}
      whiteLogoSrc={`data:image/svg+xml;base64,${whiteLogoData}`}
    />,
    size,
  );
}
