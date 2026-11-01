/** True on phones/tablets and weaker devices: used to switch to cheaper rendering. Client-only. */
export function isLite(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const small = window.matchMedia("(max-width: 820px)").matches;
  const weak = (nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency ?? 8) <= 4;
  const saver = !!nav.connection?.saveData;
  return touch || small || weak || saver;
}