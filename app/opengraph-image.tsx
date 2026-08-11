import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.descriptor}`;
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
          justifyContent: "space-between",
          backgroundColor: "#faf8f5",
          padding: "72px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Technical rule, top */}
        <div style={{ display: "flex", height: "1px", backgroundColor: "#c9c0b3" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              fontSize: 76,
              letterSpacing: "0.14em",
              color: "#16130f",
              display: "flex",
            }}
          >
            XIYÀTO
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "#423b33",
              maxWidth: "860px",
              display: "flex",
            }}
          >
            Technical production, growth operations and visual content for design-led
            businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b6157",
          }}
        >
          <div style={{ display: "flex" }}>United Kingdom &nbsp;·&nbsp; India</div>
          <div style={{ display: "flex", color: "#6b2233" }}>xiyato.uk</div>
        </div>

        {/* Accent rule, bottom-left */}
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 56,
            width: "120px",
            height: "2px",
            backgroundColor: "#6b2233",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
