// src/pages/Hub.tsx
import { Link } from "react-router-dom";
import { platformApps } from "../data/platformApps";
import type { Tier } from "../data/tiers";

const order: Tier[] = [
  "FOUNDER",
  "EXECUTIVE",
  "PREMIUM",
  "STANDARD",
  "BASIC",
  "PUBLIC_ONEOFF",
];

function tierRank(t: Tier) {
  return order.indexOf(t);
}

export default function Hub({ tier }: { tier: Tier }) {
  const apps = platformApps.filter((a) => a.tiers.includes(tier));

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
      <h1 style={{ marginTop: 0 }}>BuildLogic NEC Master (FDR)</h1>
      <p style={{ opacity: 0.8, marginTop: 6 }}>
        Founder-only master app. Tier simulator shows what customers see.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
          marginTop: 18,
        }}
      >
        {apps.map((a) => {
          const required = a.requiredTier ?? "PUBLIC_ONEOFF";
          const locked = tierRank(tier) > tierRank(required); // lower tier => higher index => locked

          return (
            <div
              key={a.id}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 16,
                padding: 16,
                background: "white",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{a.title}</strong>
                <span style={{ opacity: 0.6, fontSize: 12 }}>
                  {a.kind === "HUB" ? "HUB" : "TOOL"}
                </span>
              </div>

              <div style={{ marginTop: 8, opacity: 0.85 }}>{a.description}</div>

              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                {!locked ? (
                  <Link
                    to={a.route.replace("/tool/", "/#/tool/") ? a.route : a.route}
                    style={{
                      display: "inline-block",
                      padding: "8px 14px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.25)",
                      textDecoration: "none",
                    }}
                  >
                    Open
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `Locked. Requires ${required}. You are simulating ${tier}.`
                      )
                    }
                    style={{
                      padding: "8px 14px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.25)",
                      background: "transparent",
                      cursor: "pointer",
                      opacity: 0.9,
                    }}
                  >
                    Locked
                  </button>
                )}

                {a.publicUrl ? (
                  <a
                    href={a.publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 14px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.18)",
                      textDecoration: "none",
                      opacity: 0.9,
                    }}
                  >
                    Public ref ↗
                  </a>
                ) : null}
              </div>

              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
                Required: <b>{required}</b>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
