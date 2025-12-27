import type { Tier } from "./data/tiers";

const STORAGE_KEY = "bl_license_key_v1";

export function getStoredLicenseKey(): string {
  return localStorage.getItem(STORAGE_KEY) || "";
}

export function setStoredLicenseKey(key: string) {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearStoredLicenseKey() {
  localStorage.removeItem(STORAGE_KEY);
}

// Order of access (lowest -> highest)
const ORDER: Record<Tier, number> = {
  PUBLIC_ONEOFF: 0,
  BASIC: 1,
  STANDARD: 2,
  PREMIUM: 3,
  EXECUTIVE: 4,
  FOUNDER: 5,
};

export function tierGte(a: Tier, b: Tier) {
  return ORDER[a] >= ORDER[b];
}

/**
 * Option A (zero backend) license key rule:
 * Prefix decides tier.
 * Examples:
 *  BASIC-XXXX => BASIC
 *  STANDARD-XXXX => STANDARD
 *  PREMIUM-XXXX => PREMIUM
 *  EXECUTIVE-XXXX => EXECUTIVE
 *  FOUNDER-XXXX => FOUNDER
 *  PUBLIC-XXXX or ONEOFF-XXXX => PUBLIC_ONEOFF
 */
export function parseTierFromKey(key: string): Tier | null {
  const k = key.trim().toUpperCase();
  if (!k) return null;

  const prefix = k.split("-")[0];

  if (prefix === "PUBLIC" || prefix === "ONEOFF" || prefix === "PUBLIC_ONEOFF") return "PUBLIC_ONEOFF";
  if (prefix === "BASIC") return "BASIC";
  if (prefix === "STANDARD") return "STANDARD";
  if (prefix === "PREMIUM") return "PREMIUM";
  if (prefix === "EXECUTIVE") return "EXECUTIVE";
  if (prefix === "FOUNDER") return "FOUNDER";

  return null;
}

export function getStoredLicenseTier(): Tier | null {
  const k = getStoredLicenseKey();
  return parseTierFromKey(k);
}
