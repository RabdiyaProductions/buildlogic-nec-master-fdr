// src/data/tiers.ts

export type Tier =
  | "FOUNDER"
  | "EXECUTIVE"
  | "PREMIUM"
  | "STANDARD"
  | "BASIC"
  | "PUBLIC_ONEOFF";

export const tierOrder: Tier[] = [
  "FOUNDER",
  "EXECUTIVE",
  "PREMIUM",
  "STANDARD",
  "BASIC",
  "PUBLIC_ONEOFF",
];

export const tierLabel: Record<Tier, string> = {
  FOUNDER: "Founder (Full)",
  EXECUTIVE: "Executive",
  PREMIUM: "Premium",
  STANDARD: "Standard",
  BASIC: "Basic",
  PUBLIC_ONEOFF: "Public One-Off",
};

const KEY = "BL_NEC_MASTER_FDR_TIER";

export function loadTier(): Tier {
  const v = localStorage.getItem(KEY);
  if (!v) return "FOUNDER";
  if (tierOrder.includes(v as Tier)) return v as Tier;
  return "FOUNDER";
}

export function saveTier(t: Tier) {
  localStorage.setItem(KEY, t);
}
