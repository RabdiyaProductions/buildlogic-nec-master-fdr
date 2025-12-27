// src/data/platformApps.ts
import type { Tier } from "./tiers";

export type PlatformApp = {
  id: string;
  kind: "HUB" | "TOOL";
  title: string;
  description: string;
  route: string;

  /** tiers that can SEE this card in the Hub list */
  tiers: Tier[];

  /** minimum tier required to OPEN/USE the tool */
  requiredTier?: Tier;

  /** optional public info */
  publicEquivalent?: string;
  publicUrl?: string;
};

const ALL: Tier[] = [
  "FOUNDER",
  "EXECUTIVE",
  "PREMIUM",
  "STANDARD",
  "BASIC",
  "PUBLIC_ONEOFF",
];

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
    // hub should always open for all tiers in this repo
    requiredTier: "PUBLIC_ONEOFF",
  },
  {
    id: "nec-contract-scope-review",
    kind: "TOOL",
    title: "NEC Contract + Scope Review",
    description: "Founder version: full diagnostics + tier simulation.",
    route: "/tool/nec-contract-scope-review",
    tiers: ALL,
    publicEquivalent: "NEC Contract + Scope Review (Public)",
    publicUrl: "",
    // you can tighten this later; keep open while building
    requiredTier: "PUBLIC_ONEOFF",
  },
];
