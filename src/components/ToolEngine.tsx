import React, { useMemo, useState } from "react";

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

export default function ToolEngine({ title, description, fields, onGenerate }: ToolEngineProps) {
  const initial = useMemo(() => {
    const obj: Record<string, string> = {};
    fields.forEach((f) => (obj[f.key] = ""));
    return obj;
  }, [fields]);

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [output, setOutput] = useState<string>("");

  function setField(key: string, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function handleGenerate() {
    const out = onGenerate(values);
    setOutput(out);
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    alert("Copied output to clipboard.");
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <h2 style={{ margin: 0 }}>{title}</h2>
        {description ? <p style={{ marginTop: 6, opacity: 0.8 }}>{description}</p> : null}
      </div>

      <div style={{ display: "grid", gap: 12, maxWidth: 900 }}>
        {fields.map((f) => (
          <label key={f.key} style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>{f.label}</span>

            {f.type === "textarea" ? (
              <textarea
                value={values[f.key] || ""}
                placeholder={f.placeholder || ""}
                onChange={(e) => setField(f.key, e.target.value)}
                rows={5}
                style={{ padding: 10, borderRadius: 10, border: "1px solid #d0d0d0" }}
              />
            ) : (
              <input
                value={values[f.key] || ""}
                placeholder={f.placeholder || ""}
                onChange={(e) => setField(f.key, e.target.value)}
                type={f.type === "number" ? "number" : "text"}
                style={{ padding: 10, borderRadius: 10, border: "1px solid #d0d0d0" }}
              />
            )}
          </label>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handleGenerate} style={{ padding: "10px 14px", borderRadius: 999 }}>
          Generate
        </button>
        <button onClick={handleCopy} style={{ padding: "10px 14px", borderRadius: 999 }}>
          Copy Output
        </button>
      </div>

      <div style={{ border: "1px solid #e3e3e3", borderRadius: 14, padding: 14, minHeight: 180 }}>
        {output ? (
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{output}</pre>
        ) : (
          <div style={{ opacity: 0.7 }}>Output will appear here.</div>
        )}
      </div>
    </div>
  );
}
