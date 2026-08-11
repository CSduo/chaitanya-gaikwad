import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#16130f",
          color: "#faf8f5",
          fontSize: 300,
          fontFamily: "serif",
          letterSpacing: "-0.02em",
        }}
      >
        X
      </div>
    ),
    size,
  );
}
