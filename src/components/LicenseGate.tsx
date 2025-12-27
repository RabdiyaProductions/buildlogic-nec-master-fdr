// src/components/LicenseGate.tsx
import React, { useMemo, useState } from "react";
import type { Tier } from "../data/tiers";
import { isTierAtLeast, tierLabel } from "../data/tiers";
import {
  clearStoredLicenseKey,
  getStoredLicenseKey,
  getTierFromStoredKey,
  setStoredLicenseKey,
  tierFromLicenseKey,
} from "../license";

type Props = {
  /** Minimum tier required to view the wrapped content */
  required: Tier;

  /**
   * If provided, we gate based on the *simulated* tier (Founder app use-case).
   * If omitted, we gate based on the stored license key (Public app use-case).
   */
  simTier?: Tier;

  children: React.ReactNode;
};

export default function LicenseGate({ required, simTier, children }: Props) {
  const [key, setKey] = useState<string>(getStoredLicenseKey());
  const [saved, setSaved] = useState<boolean>(false);

  const effectiveTier = useMemo<Tier>(() => {
    return simTier ?? getTierFromStoredKey("PUBLIC_ONEOFF");
  }, [simTier, saved]);

  const allowed = isTierAtLeast(effectiveTier, required);

  if (allowed) return <>{children}</>;

  const requiredLabel = tierLabel[required];
  const currentLabel = tierLabel[effectiveTier];

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 16,
        background: "#fff",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Access Required</h2>
      <p style={{ opacity: 0.8 }}>
        This feature requires <b>{requiredLabel}</b>. Your current access is{" "}
        <b>{currentLabel}</b>.
      </p>

      {/* If we're simulating tiers in the Founder app, show a simple message */}
      {simTier ? (
        <div style={{ marginTop: 12 }}>
          <p style={{ opacity: 0.8 }}>
            You’re in tier-simulator mode. Switch the tier at the top to unlock
            this tool.
          </p>
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Enter your license key
          </label>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g. EXECUTIVE-ABC123"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #ccc",
              fontSize: 14,
            }}
          />
          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                const t = tierFromLicenseKey(key);
                if (!t) {
                  alert(
                    "That key format isn't recognised. Use e.g. EXECUTIVE-ABC123."
                  );
                  return;
                }
                setStoredLicenseKey(key);
                setSaved((s) => !s);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Save key
            </button>

            <button
              onClick={() => {
                clearStoredLicenseKey();
                setKey("");
                setSaved((s) => !s);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Clear
            </button>

            {isLocalhost && (
              <button
                onClick={() => {
                  setStoredLicenseKey("FOUNDER-LOCAL");
                  setKey("FOUNDER-LOCAL");
                  setSaved((s) => !s);
                }}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                }}
                title="Local dev helper"
              >
                Set Founder (local)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
