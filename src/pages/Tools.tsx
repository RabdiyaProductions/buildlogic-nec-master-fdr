// src/pages/Tools.tsx
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { platformApps } from "../data/platformApps";
import type { Tier } from "../data/tiers";
import { tierLabel } from "../data/tiers";
import ToolEngine from "../components/toolEngine";

export default function Tools({ tier }: { tier: Tier }) {
  const { toolId } = useParams();

  const tool = useMemo(
    () => platformApps.find((a) => a.id === toolId),
    [toolId]
  );

  if (!tool) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
        <h1 style={{ marginTop: 0 }}>Unknown Tool</h1>
        <div style={{ opacity: 0.75 }}>
          This tool route isn’t registered yet.
        </div>
        <div style={{ height: 12 }} />
        <Link to="/">← Back to Master</Link>
      </div>
    );
  }

  const allowed = tool.tiers.includes(tier);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "baseline",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>{tool.title}</h2>
          <div style={{ opacity: 0.7, marginTop: 6 }}>
            Tool: <b>{tool.id}</b> | Tier: <b>{tierLabel[tier]}</b>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/">← Back to Master</Link>
          {tool.publicUrl ? (
            <a href={tool.publicUrl} target="_blank" rel="noreferrer">
              Public reference ↗
            </a>
          ) : null}
        </div>
      </div>

      <div style={{ height: 16 }} />

      {!allowed ? (
        <div
          style={{
            border: "1px solid #e2a6a6",
            background: "#fff6f6",
            padding: 14,
            borderRadius: 12,
            lineHeight: 1.35,
          }}
        >
          <b>Tier blocked.</b> This tool is not available in{" "}
          <b>{tierLabel[tier]}</b>.
          <div style={{ opacity: 0.75, marginTop: 6 }}>
            (That’s good — it means your simulator gates correctly.)
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #ddd",
            background: "#fff",
            padding: 14,
            borderRadius: 12,
            minHeight: 520,
          }}
        >
          <div style={{ opacity: 0.75, fontWeight: 700 }}>Workspace</div>
          <div style={{ opacity: 0.75, marginTop: 6, lineHeight: 1.35 }}>
            Drop the REAL tool UI here (forms, generators, outputs) while
            respecting tier gates.
            <br />
            For now, this confirms routing + tier simulation works.
          </div>

          <div style={{ height: 14 }} />

          <div
            style={{
              border: "1px dashed #bbb",
              borderRadius: 12,
              padding: 14,
              opacity: 0.85,
            }}
          >
            Tier gating rule (simulator): hide/disable premium features when tier
            is Basic/Standard etc.
          </div>
        </div>
      )}
    </div>
  );
}
