import "@/styles/credential.css";

const paths = { valid: "M14 25l8 8 14-16", revoked: "M16 16l16 16M32 16L16 32", missing: "M24 13v15M24 35v.5", error: "M24 13v15M24 35v.5" };

/** Status badge; the pop and the stroke-draw are CSS animations (see styles/credential.css). */
export function Badge({ kind }: { kind: keyof typeof paths }) {
  return (
    <div className={`badge ${kind}`}>
      <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden>
        <path d={paths[kind]} pathLength={1} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Wax seal stamped onto a verified certificate. */
export function Seal() {
  return (
    <svg className="seal" viewBox="-50 -50 100 100" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} r="9" cx="0" cy="-36" fill="var(--beet)" transform={`rotate(${(360 / 14) * i})`} />
      ))}
      <circle r="38" fill="var(--beet)" />
      <circle r="30" fill="none" stroke="var(--pink)" strokeWidth="1.5" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} rx="6" ry="11" cy="-12" fill="var(--pink)" transform={`rotate(${a})`} />
      ))}
      <circle r="6" fill="var(--lemon)" />
    </svg>
  );
}
