import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "OAFLAD #BuildingResilience";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const svgBuffer = await readFile(
    join(process.cwd(), "public/images/fr/campaign-logo-full.svg")
  );
  const svgBase64 = `data:image/svg+xml;base64,${svgBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FBF0E6 0%, #F5E6D3 50%, #FBF0E6 100%)",
        }}
      >
        {/* Left brand stripe */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, background: "#E07B39" }} />
          <div style={{ flex: 1, background: "#9B1C37" }} />
          <div style={{ flex: 1, background: "#6B3417" }} />
          <div style={{ flex: 1, background: "#2D7B3F" }} />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={svgBase64}
          alt=""
          width={800}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
