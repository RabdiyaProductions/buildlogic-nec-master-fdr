import React, { useMemo, useState } from "react";
import type { Tier } from "../data/tiers";
import { getStoredLicenseKey, setStoredLicenseKey, parseTierFromKey, tierGte } from "../license";

export default function LicenseGate({
  requiredTier,
  currentTier,
  onUpdated,
  children,
}: {
  requiredTier: Tier;
  currentTier: Tier;
  onUpdated?: () => void;
  children: React.ReactNode;
}) {
  const storedKey = useMemo(() => getStoredLicenseKey(), []);
  const [key, setKey] = useState(storedKey);
  const [error, setError] = useState("");

  const storedTier = useMemo(() => parseTierFromKey(storedKey) ?? "PUBLIC_ONEOFF", [storedKey]);
  const effectiveTier: Tier = currentTier ?? storedTier;

  if (tierGte(effectiveTier, requiredTier)) return <>{children}</>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 18px" }}>
      <h1 style={{ marginTop: 0 }}>Unlock required</h1>
      <p style={{ opacity: 0.8, lineHeight: 1.5 }}>
        This page requires <b>{requiredTier}</b> tier or higher.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <input
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setError("");
          }}
          placeholder="Enter license key e.g. BASIC-XXXX"
          style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc" }}
        />
        <button
          onClick={() => {
            const t = parseTierFromKey(key);
            if (!t) {
              setError("Invalid key format. Use e.g. BASIC-XXXX / STANDARD-XXXX / PREMIUM-XXXX / EXECUTIVE-XXXX / FOUNDER-XXXX");
              return;
            }
            setStoredLicenseKey(key);
            onUpdated?.();
          }}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Unlock
        </button>
      </div>

      {error ? <div style={{ marginTop: 10, color: "crimson" }}>{error}</div> : null}

      <div style={{ marginTop: 18, opacity: 0.75, fontSize: 13 }}>
        Tip: Option-A (zero backend) derives tier from the key prefix. PUBLIC/ONEOFF maps to PUBLIC_ONEOFF.
      </div>
    </div>
  );
}
