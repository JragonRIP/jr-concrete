import { ImageResponse } from "next/og";

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
          background: "#101010",
          color: "#faf8f4",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e24a1a",
          }}
        >
          Powers, Michigan
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            JR’s Concrete
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "#b7b2a9",
              maxWidth: 760,
            }}
          >
            Residential flatwork and foundations throughout the Upper Peninsula.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#e24a1a" }}>(906) 241-0001</div>
      </div>
    ),
    size,
  );
}
