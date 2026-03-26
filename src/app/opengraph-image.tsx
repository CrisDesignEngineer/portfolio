import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cristiano Carvalho - Product Designer & Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#bf5af2",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Product Designer & Design Engineer
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#f0f0f5",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Cristiano Carvalho
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#8a8a9a",
              lineHeight: 1.6,
              maxWidth: "700px",
            }}
          >
            Do Figma ao código em produção. SaaS B2B, Design Systems e interfaces escaláveis.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span style={{ fontSize: "16px", color: "#6a6a7a" }}>
            Disponível para novos projetos
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
