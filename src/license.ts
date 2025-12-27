// src/license.ts
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

/**
 * Option A (zero-backend) approach:
 * Treat license keys as "tier-prefixed" strings.
 * Examples:
 *  - EXECUTIVE-ABC123
 *  - PREMIUM-XYZ999
 *  - BASIC-TEST
 */
export function tierFromLicenseKey(key: string): Tier | null {
  const k = (key || "").trim().toUpperCase();
  if (!k) return null;

  const prefixes: Tier[] = [
    "FOUNDER",
    "EXECUTIVE",
    "PREMIUM",
    "STANDARD",
    "BASIC",
    "PUBLIC_ONEOFF",
  ];

  for (const p of prefixes) {
    if (k.startsWith(p + "-") || k === p) return p;
  }
  return null;
}

export function getTierFromStoredKey(fallback: Tier = "PUBLIC_ONEOFF"): Tier {
  const key = getStoredLicenseKey();
  return tierFromLicenseKey(key) ?? fallback;
}
