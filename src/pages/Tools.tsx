// src/pages/Tools.tsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import LicenseGate from "../components/LicenseGate";
import ToolEngine from "../components/ToolEngine";

import { platformApps } from "../data/platformApps";
import type { Tier } from "../data/tiers";

function pickRequiredTier(appTiers?: Tier[]): Tier {
  // Your app convention: tiers list is usually highest->lowest or all tiers.
  // We’ll pick the “lowest allowed” if it looks ordered, otherwise default BASIC.
  if (!appTiers || appTiers.length === 0) return "BASIC";
  // safest: require the lowest tier that can access it
  return appTiers[appTiers.length - 1];
}

export default function Tools({ tier }: { tier: Tier }) {
  const { toolId } = useParams();

  const app = useMemo(() => {
    return platformApps.find((a) => a.id === toolId);
  }, [toolId]);

  // Route exists but tool not registered in platformApps
  if (!app) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
        <h1 style={{ marginTop: 0 }}>Unknown Tool</h1>
        <div style={{ opacity: 0.75 }}>
          This tool route isn’t registered yet.
        </div>
        <div style={{ marginTop: 16 }}>
          <Link to="/">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const requiredTier = pickRequiredTier(app.tiers);

  return (
    <LicenseGate
      requiredTier={requiredTier}
      currentTier={tier}
      onUpdated={() => window.location.reload()}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
        <div style={{ marginBottom: 14 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            ← Back
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <h1 style={{ margin: 0 }}>{app.title}</h1>
          <div style={{ opacity: 0.7 }}>Tier: {tier}</div>
        </div>

        <div style={{ opacity: 0.75, marginTop: 8 }}>{app.description}</div>

        <div style={{ marginTop: 22 }}>
          <ToolEngine
            title={app.title}
            description={app.description}
            Tier={tier}
          />
        </div>

        {app.publicEquivalent ? (
          <div style={{ marginTop: 18, opacity: 0.75, fontSize: 13 }}>
            Public reference: {app.publicEquivalent}
            {app.publicUrl ? (
              <>
                {" "}
                ·{" "}
                <a href={app.publicUrl} target="_blank" rel="noreferrer">
                  Open
                </a>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </LicenseGate>
  );
}
