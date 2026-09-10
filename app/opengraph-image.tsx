import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    path.join(process.cwd(), "public", "images", "logo", "logo-on-dark.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101010",
          color: "#faf8f4",
          padding: 72,
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={168}
          height={148}
          alt=""
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            Concrete built to last.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "#b7b2a9",
              maxWidth: 760,
            }}
          >
            Residential flatwork and foundations in Powers, Michigan.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#dc622b" }}>(906) 241-0001</div>
      </div>
    ),
    size,
  );
}
