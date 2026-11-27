/** Device-capability helpers. The same signals are read by the inline boot script in layout.tsx (before first paint) so the
 *  page can start in "lite" mode on devices that report little memory, few cores, Save-Data or a slow connection. */
type NavExt = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };

export const LITE_KEY = "br-lite";

/** True when the device itself says it is constrained. Client-only. */
export function isConstrained(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as NavExt;
  const c = nav.connection;
  return (
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
    !!c?.saveData ||
    /(^|-)2g$/.test(c?.effectiveType ?? "") ||
    window.matchMedia("(prefers-reduced-data: reduce)").matches
  );
}

/** True once the page is running in lite mode (set before paint, or at runtime when frames drop). Client-only. */
export function isLite(): boolean {
  return typeof document !== "undefined" && document.documentElement.classList.contains("lite");
}
