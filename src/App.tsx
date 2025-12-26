// src/App.tsx
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import type { Tier } from "./data/tiers";
import { loadTier, saveTier, tierOrder, tierLabel } from "./data/tiers";

function TierBar({ tier, setTier }: { tier: Tier; setTier: (t: Tier) => void }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
      {tierOrder.map((t) => (
        <button
          key={t}
          onClick={() => setTier(t)}
          style={{
            padding: "7px 10px",
            borderRadius: 999,
            border: "1px solid #111",
            background: t === tier ? "#111" : "#fff",
            color: t === tier ? "#fff" : "#111",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          {tierLabel[t]}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [tier, setTier] = useState<Tier>(() => loadTier());

  useEffect(() => {
    saveTier(tier);
  }, [tier]);

  return (
    <HashRouter>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 18px" }}>
        <TierBar tier={tier} setTier={setTier} />
      </div>

      <Routes>
        <Route path="/" element={<Dashboard tier={tier} />} />
        <Route path="/tool/:toolId" element={<Tools tier={tier} />} />
      </Routes>
    </HashRouter>
  );
}
