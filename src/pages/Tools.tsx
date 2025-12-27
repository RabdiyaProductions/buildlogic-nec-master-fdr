import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ToolEngine from "../components/ToolEngine";
import type { ToolField } from "../components/ToolEngine";
import { platformApps } from "../data/platformApps";
import type { Tier } from "../data/tiers";

export default function Tools({ tier }: { tier: Tier }) {
  const { toolId } = useParams();

  const tool = useMemo(
    () => platformApps.find((a) => a.id === toolId),
    [toolId]
  );

  if (!tool) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 32 }}>
        <h1>Unknown Tool</h1>
        <p>This tool route isn’t registered yet.</p>
        <Link to="/">← Back to Hub</Link>
      </div>
    );
  }

  const fields: ToolField[] = [
    {
      key: "project",
      label: "Project Name",
      type: "text",
      placeholder: "e.g. NEC4 ECC Office Fit-Out",
    },
    {
      key: "parties",
      label: "Employer / Contractor",
      type: "text",
      placeholder: "e.g. Employer Ltd / Contractor Ltd",
    },
    {
      key: "scope",
      label: "Scope Summary",
      type: "textarea",
      placeholder: "Describe the works and scope",
    },
  ];

  return (
    <ToolEngine
      title={tool.title}
      description={tool.description}
      fields={fields}
      onGenerate={(values) => {
        return `
NEC CONTRACT + SCOPE REVIEW

Project:
${values.project ?? "-"}

Parties:
${values.parties ?? "-"}

Scope:
${values.scope ?? "-"}

Tier: ${tier}
        `.trim();
      }}
    />
  );
}
