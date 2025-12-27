import { useState } from "react";

/* ---------------- TYPES ---------------- */

export type ToolField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number";
  placeholder?: string;
};

export type ToolEngineProps = {
  title: string;
  description?: string;
  fields: ToolField[];
  onGenerate: (values: Record<string, string>) => string;
};

/* ---------------- COMPONENT ---------------- */

export default function ToolEngine({
  title,
  description,
  fields,
  onGenerate,
}: ToolEngineProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");

  function updateValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 18px" }}>
      <h1 style={{ marginTop: 0 }}>{title}</h1>

      {description && (
        <p style={{ opacity: 0.75, marginBottom: 24 }}>{description}</p>
      )}

      <div style={{ display: "grid", gap: 18 }}>
        {fields.map((f) => (
          <label key={f.key} style={{ display: "grid", gap: 6 }}>
            <strong>{f.label}</strong>

            {f.type === "textarea" ? (
              <textarea
                rows={5}
                value={values[f.key] ?? ""}
                placeholder={f.placeholder}
                onChange={(e) => updateValue(f.key, e.target.value)}
              />
            ) : (
              <input
                type={f.type === "number" ? "number" : "text"}
                value={values[f.key] ?? ""}
                placeholder={f.placeholder}
                onChange={(e) => updateValue(f.key, e.target.value)}
              />
            )}
          </label>
        ))}

        <button
          onClick={() => setOutput(onGenerate(values))}
          style={{
            width: "fit-content",
            padding: "10px 16px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Generate
        </button>

        {output && (
          <div style={{ marginTop: 16 }}>
            <h3>Output</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
