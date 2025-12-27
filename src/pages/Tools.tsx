import LicenseGate from "../components/LicenseGate";

// ...inside your render
return (
  <LicenseGate required="EXECUTIVE" simTier={tier}>
    {/* the tool UI goes here */}
  </LicenseGate>
);
