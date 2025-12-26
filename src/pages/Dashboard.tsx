// src/pages/Dashboard.tsx
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { platformApps } from "../data/platformApps";
import type { Tier } from "../data/tiers";
import { tierLabel } from "../data/tiers";

export default function Dashboard({ tier }: { tier: Tier }) {
  const visible = useMemo(
    () => platformApps.filter((a) => a.tiers.includes(tier)),
    [tier]
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 18px" }}>
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
          <h1 style={{ margin: 0 }}>BuildLogic NEC Master (FDR)</h1>
          <div style={{ opacity: 0.7, marginTop: 6 }}>
            Founder-only master app. Tier simulator shows what customers see
            (Basic → Executive) + Public One-Off.
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ opacity: 0.65, fontSize: 12 }}>Active Tier</div>
          <div style={{ fontWeight: 700 }}>{tierLabel[tier]}</div>
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div style={{ opacity: 0.7, fontSize: 13 }}>
        Showing <b>{visible.length}</b> items for this tier.
      </div>

      <div style={{ height: 14 }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {visible.map((a) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 14,
              padding: 14,
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 800 }}>{a.title}</div>
              <div style={{ opacity: 0.55, fontSize: 12 }}>BuildLogic</div>
            </div>

            <div style={{ opacity: 0.8, marginTop: 8, lineHeight: 1.35 }}>
              {a.description}
            </div>

            <div style={{ height: 10 }} />

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "6px 10px",
                  border: "1px solid #111",
                  borderRadius: 999,
                  fontSize: 12,
                }}
              >
                {a.kind}
              </span>

              <Link
                to={a.route}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #111",
                  borderRadius: 999,
                  fontSize: 12,
                  textDecoration: "none",
                }}
              >
                Open
              </Link>
            </div>

            {a.publicEquivalent || a.publicUrl ? (
              <>
                <div style={{ height: 10 }} />
                <div style={{ opacity: 0.7, fontSize: 12 }}>
                  {a.publicEquivalent ? (
                    <>
                      Public: <b>{a.publicEquivalent}</b>
                    </>
                  ) : null}
                  {a.publicUrl ? (
                    <>
                      {a.publicEquivalent ? " • " : ""}
                      <a href={a.publicUrl} target="_blank" rel="noreferrer">
                        Public reference ↗
                      </a>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
