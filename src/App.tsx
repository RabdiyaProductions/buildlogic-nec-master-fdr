import React, { useMemo, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Hub from "./pages/Hub";
import Tools from "./pages/Tools";
import Dashboard from "./pages/Dashboard";

import type { Tier } from "./data/tiers";
import LicenseGate from "./components/LicenseGate";
import { getStoredLicenseTier } from "./license";

export default function App() {
  // If a license exists, that becomes the active tier.
  // Otherwise default to FOUNDER for your own testing.
  const [tier, setTier] = useState<Tier>(() => getStoredLicenseTier() ?? "FOUNDER");

  // When the license changes, we want UI to reflect it.
  // (LicenseGate sets localStorage; reload is simplest + reliable.)
  const onLicenseUpdated = () => window.location.reload();

  const basename = useMemo(() => import.meta.env.BASE_URL ?? "/", []);

  return (
    <HashRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Hub tier={tier} />} />
        <Route
          path="/tool/:toolId"
          element={
            <LicenseGate requiredTier="BASIC" currentTier={tier} onUpdated={onLicenseUpdated}>
              <Tools tier={tier} />
            </LicenseGate>
          }
        />
        <Route
          path="/dashboard"
          element={
            <LicenseGate requiredTier="STANDARD" currentTier={tier} onUpdated={onLicenseUpdated}>
              <Dashboard tier={tier} />
            </LicenseGate>
          }
        />

        {/* Safety net */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
