// src/data/platformApps.ts
import type { Tier } from "./tiers";

export type AppKind = "HUB" | "TOOL" | "SUITE";

export type PlatformApp = {
  id: string;
  kind: AppKind;
  title: string;
  description: string;

  // internal route inside this Founder Master app
  route: string;

  // tier gating: which tiers can see this card + open it
  tiers: Tier[];

  // optional: link to the public app (for reference only)
  publicUrl?: string;

  // optional: name of public equivalent (shown as a note)
  publicEquivalent?: string;
};

// Helper: all tiers convenience (use sparingly)
const ALL: Tier[] = [
  "FOUNDER",
  "EXECUTIVE",
  "PREMIUM",
  "STANDARD",
  "BASIC",
  "PUBLIC_ONEOFF",
];

// ✅ ADD YOUR NEC LIST HERE (you said ignore Stripe URLs for now)
export const platformApps: PlatformApp[] = [
  {
    id: "nec-hub-mirror",
    kind: "HUB",
    title: "NEC Hub (Founder Mirror)",
    description: "Master navigation + internal tester view.",
    route: "/tool/nec-hub-mirror",
    tiers: ALL,
    publicEquivalent: "BuildLogic NEC Hub (Public)",
    publicUrl: "https://rabdiyaproductions.github.io/nec-hub-pwa/#/buildlogic-nec",
  },
  {
    id: "nec-contract-scope-review",
    kind: "TOOL",
    title: "NEC Contract + Scope Review",
    description: "Founder version: full diagnostics + tier simulation.",
    route: "/tool/nec-contract-scope-review",
    tiers: ALL,
    publicEquivalent: "NEC Contract + Scope Review (Public)",
    // leave empty if you don't want it yet
  },

  // ─────────────────────────────────────────────
  // TEMPLATE: copy/paste for each new NEC tool/suite
  // {
  //   id: "your-id-here",
  //   kind: "TOOL",
  //   title: "Tool Name",
  //   description: "Short one-liner",
  //   route: "/tool/your-id-here",
  //   tiers: ["FOUNDER","EXECUTIVE","PREMIUM","STANDARD","BASIC","PUBLIC_ONEOFF"],
  //   publicEquivalent: "Public Tool Name",
  //   publicUrl: "https://....",
  // },
];
