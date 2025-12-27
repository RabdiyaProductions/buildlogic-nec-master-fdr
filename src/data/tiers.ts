// src/data/tiers.ts

export type Tier =
  | "FOUNDER"
  | "EXECUTIVE"
  | "PREMIUM"
  | "STANDARD"
  | "BASIC"
  | "PUBLIC_ONEOFF";

export const tierLabel: Record<Tier, string> = {
  FOUNDER: "Founder (Full)",
  EXECUTIVE: "Executive",
  PREMIUM: "Premium",
  STANDARD: "Standard",
  BASIC: "Basic",
  PUBLIC_ONEOFF: "Public One-Off",
};

export const tierRank: Record<Tier, number> = {
  PUBLIC_ONEOFF: 0,
  BASIC: 1,
  STANDARD: 2,
  PREMIUM: 3,
  EXECUTIVE: 4,
  FOUNDER: 5,
};

export function isTierAtLeast(current: Tier, required: Tier): boolean {
  return tierRank[current] >= tierRank[required];
}
