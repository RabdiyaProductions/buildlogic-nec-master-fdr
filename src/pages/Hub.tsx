import { Link } from "react-router-dom";

export default function Hub() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "26px 18px" }}>
      <h1 style={{ margin: 0 }}>NEC Hub (Founder Mirror)</h1>
      <div style={{ opacity: 0.75, marginTop: 6 }}>
        Internal hub placeholder. Next step: put suite navigation + internal notes + export shortcuts here.
      </div>

      <div style={{ height: 14 }} />

      <div style={{ border: "1px solid #ddd", borderRadius: 14, padding: 14, background: "#fff" }}>
        <div style={{ fontWeight: 800 }}>Hub actions (placeholder)</div>
        <ul style={{ marginTop: 10, lineHeight: 1.5 }}>
          <li>Open a tool from the master dashboard</li>
          <li>Quick links to public hub for cross-check</li>
          <li>Later: internal “Founder Notes” + export</li>
        </ul>
      </div>

      <div style={{ height: 14 }} />
      <Link to="/" style={{ fontSize: 13 }}>← Back to Master</Link>
    </div>
  );
}
