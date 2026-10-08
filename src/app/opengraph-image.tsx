import { ImageResponse } from "next/og";

export const alt = "VoltEdge Energy — Industrial IoT Energy Management";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0f19",
          padding: "64px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid background effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(6, 182, 212, 0.1) 0%, transparent 45%)",
          }}
        />

        {/* Top Header with Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              height: "48px",
              width: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 229, 255, 0.15)",
              border: "1px solid rgba(0, 229, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00e5ff",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            ⚡
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
              VoltEdge
            </span>
            <span style={{ fontSize: "32px", fontWeight: 800, color: "#00e5ff", letterSpacing: "-0.02em", marginLeft: "8px" }}>
              IIoT
            </span>
          </div>
          <div
            style={{
              marginLeft: "16px",
              padding: "6px 14px",
              borderRadius: "9999px",
              backgroundColor: "rgba(0, 229, 255, 0.1)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              color: "#00e5ff",
              fontSize: "14px",
              fontWeight: 700,
              display: "flex",
            }}
          >
            ISO 50001 & IEC 62443 Certified
          </div>
        </div>

        {/* Headline & Benefit Statement */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "56px",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Cut your peak energy costs by
            </span>
            <span
              style={{
                fontSize: "56px",
                fontWeight: 900,
                color: "#00e5ff",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginLeft: "16px",
              }}
            >
              up to 32%
            </span>
          </div>
          <div style={{ display: "flex", fontSize: "24px", color: "#94a3b8", lineHeight: 1.4 }}>
            Revenue-grade DIN-rail submetering, 4G LTE gateways, and real-time edge telemetry for industrial plants.
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#00e5ff" }}>32%</span>
              <span style={{ fontSize: "13px", color: "#94a3b8", textTransform: "uppercase" }}>Peak Reduction</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>1,240+</span>
              <span style={{ fontSize: "13px", color: "#94a3b8", textTransform: "uppercase" }}>Monitored Plants</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>14 Days</span>
              <span style={{ fontSize: "13px", color: "#94a3b8", textTransform: "uppercase" }}>Turnkey Setup</span>
            </div>
          </div>

          <div style={{ display: "flex", color: "#64748b", fontSize: "16px", fontWeight: 600 }}>
            voltedge-energy.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
