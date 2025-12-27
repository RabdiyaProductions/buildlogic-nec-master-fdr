// src/pages/Tools.tsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import LicenseGate from "../components/LicenseGate";
import ToolEngine from "../components/ToolEngine";
import { platformApps } from "../data/platformApps";
import type { Tier } from "../data/tiers";

export default function Tools({ tier }: { tier: Tier }) {
  const { toolId } = useParams();

  const app = useMemo(() => {
    return platformApps.find((a) => a.id === toolId);
  }, [toolId]);

  // Fallback if route exists but tool not registered
  if (!app) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
        <h1 style={{ marginTop: 0 }}>Unknown Tool</h1>
        <p style={{ opacity: 0.8 }}>
          This tool route isn’t registered yet.
        </p>
        <Link to="/" style={{ textDecoration: "underline" }}>
          Back to Hub
        </Link>
      </div>
    );
  }

  // Gate rule:
  // - In this Founder Mirror repo, we gate using the TOP TOGGLE tier (simTier=tier).
  // - For public repos later, you can remove simTier and it will use stored license key.
  const requiredTier = app.requiredTier ?? "PUBLIC_ONEOFF";

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/" style={{ textDecoration: "underline" }}>
          ← Back
        </Link>
      </div>

      <LicenseGate required={requiredTier} simTier={tier}>
        {/* Tool UIs */}
        {app.id === "nec-hub-mirror" && (
          <ToolEngine
            title="NEC Hub (Founder Mirror)"
            description="Master navigation + internal tester view."
            fields={[
              {
                key: "project",
                label: "Project Name",
                type: "text",
                placeholder: "e.g. Portland",
              },
              {
                key: "parties",
                label: "Employer / Contractor",
                type: "text",
                placeholder: "e.g. Kiran",
              },
              {
                key: "scope",
                label: "Scope Summary",
                type: "textarea",
                placeholder: "Brief scope overview…",
              },
            ]}
            onGenerate={(values) => {
              return [
                "NEC CONTRACT + SCOPE REVIEW",
                "",
                `Project`,
                `${values.project || "-"}`,
                "",
                `Parties:`,
                `${values.parties || "-"}`,
                "",
                `Scope:`,
                `${values.scope || "-"}`,
                "",
                `Tier: ${tier}`,
              ].join("\n");
            }}
          />
        )}

        {app.id === "nec-contract-scope-review" && (
          <ToolEngine
            title="NEC Contract + Scope Review"
            description="Capture key scope and contract basics, then generate a first-pass advisory output."
            fields={[
              {
                key: "project",
                label: "Project Name",
                type: "text",
                placeholder: "e.g. Portland",
              },
              {
                key: "parties",
                label: "Parties (Employer / Contractor)",
                type: "text",
                placeholder: "e.g. Employer: X / Contractor: Y",
              },
              {
                key: "contract",
                label: "NEC form / option",
                type: "text",
                placeholder: "e.g. NEC4 ECC Option A",
              },
              {
                key: "scope",
                label: "Scope summary",
                type: "textarea",
                placeholder: "Describe scope, constraints, key deliverables…",
              },
            ]}
            onGenerate={(values) => {
              return [
                "NEC CONTRACT + SCOPE REVIEW — MVP OUTPUT",
                "",
                `Project: ${values.project || "-"}`,
                `Parties: ${values.parties || "-"}`,
                `Contract: ${values.contract || "-"}`,
                "",
                "Scope summary:",
                `${values.scope || "-"}`,
                "",
                "Initial flags (MVP):",
                "- Confirm scope boundaries and exclusions.",
                "- Confirm programme constraints and required information release dates.",
                "- Confirm change control process and compensation events handling.",
                "- Confirm acceptance criteria / quality requirements.",
                "",
                `Tier (simulated): ${tier}`,
              ].join("\n");
            }}
          />
        )}
      </LicenseGate>
    </div>
  );
}
