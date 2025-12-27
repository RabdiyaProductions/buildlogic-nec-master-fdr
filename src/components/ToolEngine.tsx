import React, { useMemo, useState } from "react";
import { useState } from "react";

type Field =
  | { key: string; label: string; type: "text"; placeholder?: string }
  | { key: string; label: string; type: "textarea"; placeholder?: string }
  | { key: string; label: string; type: "number"; placeholder?: string };

type ToolEngineProps = {
  title: string;
  description?: string;
  fields: Field[];
  onGenerate: (values: Record<string, string>) => string;
};

<ToolEngine
  title="NEC Contract + Scope Review"
  description="Capture key scope and contract basics, then generate a structured review brief."
  fields={[
    { key: "project", label: "Project name", type: "text", placeholder: "e.g., Office Fit-Out – London" },
    { key: "parties", label: "Parties (Employer / Contractor)", type: "text", placeholder: "e.g., ABC Ltd / XYZ Contractors" },
    { key: "contract", label: "NEC form / option", type: "text", placeholder: "e.g., NEC4 ECC Option C" },
    { key: "scope", label: "Scope summary", type: "textarea", placeholder: "Paste/describe scope in plain English..." },
    { key: "risks", label: "Known risks / pain points", type: "textarea", placeholder: "Time, access, design gaps, interfaces..." },
  ]}
  onGenerate={(v) => {
    return [
      `NEC CONTRACT + SCOPE REVIEW (DRAFT)`,
      ``,
      `Project: ${v.project || "-"}`,
      `Parties: ${v.parties || "-"}`,
      `Contract: ${v.contract || "-"}`,
      ``,
      `SCOPE (Summary)`,
      `${v.scope || "-"}`,
      ``,
      `KNOWN RISKS / ISSUES`,
      `${v.risks || "-"}`,
      ``,
      `REVIEW CHECKLIST (Starter)`,
      `- Scope completeness / exclusions`,
      `- Interfaces + responsibilities matrix`,
      `- Programme assumptions + constraints`,
      `- Early warnings + compensation events process`,
      `- Payment mechanism + substantiation`,
      `- Key deliverables, approvals, lead times`,
      ``,
      `OUTPUT NOTE`,
      `This is an initial structured brief. Next step: attach contract extracts + scope docs for clause-by-clause review.`,
    ].join("\n");
  }}
/>

export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number";
  placeholder?: string;
};

export type ToolEngineProps = {
  title: string;
  description?: string;
  fields: Field[];
  onGenerate: (values: Record<string, string>) => string;
};

export default function ToolEngine({ title, description, fields, onGenerate }: ToolEngineProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string>("");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 18px" }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      {description && <p style={{ opacity: 0.75 }}>{description}</p>}

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {fields.map((f) => (
          <label key={f.key} style={{ display: "grid", gap: 6 }}>
            <div style={{ fontWeight: 600 }}>{f.label}</div>

            {f.type === "textarea" ? (
              <textarea
                rows={5}
                value={values[f.key] ?? ""}
                placeholder={f.placeholder ?? ""}
                onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
              />
            ) : (
              <input
                type={f.type === "number" ? "number" : "text"}
                value={values[f.key] ?? ""}
                placeholder={f.placeholder ?? ""}
                onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
              />
            )}
          </label>
        ))}

        <button
          onClick={() => setOutput(onGenerate(values))}
          style={{ width: "fit-content", padding: "10px 14px", borderRadius: 10 }}
        >
          Generate
        </button>

        {output && (
          <div style={{ marginTop: 12 }}>
            <h3 style={{ marginBottom: 8 }}>Output</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}