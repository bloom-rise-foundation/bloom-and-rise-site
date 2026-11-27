import { Flower } from "./Decor";
import { vars } from "./ui";

/* Server-rendered, CSS-only decoration (no JavaScript). All motion is transform / opacity, see styles/sections.css. */

/** The symbol for men and boys, drawn as a stroke so it can take any colour. */
export function Mars({ size = 34 }: { size?: number }) {
  return (
    <svg className="mars" viewBox="0 0 40 40" width={size} height={size} aria-hidden fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="24" r="9" />
      <path d="M23 17L35 5M26 5H35V14" />
    </svg>
  );
}

/** The symbol for women and girls, drawn as a stroke so it can take any colour. */
export function Venus({ size = 34 }: { size?: number }) {
  return (
    <svg className="venus" viewBox="0 0 40 40" width={size} height={size} aria-hidden fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <circle cx="20" cy="15" r="9" />
      <path d="M20 24v13M13.5 31h13" />
    </svg>
  );
}

function ribbonItems(items: string[], sep: "mars" | "venus") {
  const all = [...items, ...items, ...items, ...items];
  return all.map((t, i) => (
    <li key={i} className={i % 2 ? "it" : "bd"} aria-hidden={i >= items.length || undefined}>
      <span>{t}</span>
      {sep === "mars" ? <Mars size={30} /> : <Venus size={30} />}
    </li>
  ));
}

/** Two tilted ribbons of words sliding in opposite directions (they never pause), in a dark room. */
export function Band({ items, items2 }: { items: string[]; items2: string[] }) {
  return (
    <section className="band" aria-label={[...items, ...items2].join(", ")}>
      <div className="ribbons">
        <div className="ribbon rb1">
          <ul className="rb-track">{ribbonItems(items, "mars")}</ul>
        </div>
        <div className="ribbon rb2" aria-hidden>
          <ul className="rb-track">{ribbonItems(items2, "venus")}</ul>
        </div>
      </div>
    </section>
  );
}

const T = [
  /* 0 */ <g key="0"><rect width="100" height="100" fill="#E3939B" /><circle cx="50" cy="38" r="17" fill="none" stroke="#570F1D" strokeWidth="8" /><path d="M50 55v28M36 70h28" stroke="#570F1D" strokeWidth="8" strokeLinecap="round" /></g>,
  /* 1 */ <g key="1"><rect width="100" height="100" fill="#6F2B34" />{[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="50" cy="26" rx="11" ry="20" fill="#E3939B" stroke="#F9DAD8" strokeWidth="2" transform={`rotate(${a} 50 50)`} />)}<circle cx="50" cy="50" r="9" fill="#FCF1DA" /></g>,
  /* 2 */ <g key="2"><rect width="100" height="100" fill="#F9DAD8" /><path d="M2 98C2 38 36 2 98 2C98 64 64 98 2 98Z" fill="#570F1D" /><path d="M20 80C22 52 40 30 70 24C68 52 52 74 20 80Z" fill="#C65C6A" /></g>,
  /* 3 */ <g key="3"><rect width="100" height="100" fill="#8DA9C4" />{Array.from({ length: 25 }, (_, k) => <circle key={k} cx={14 + (k % 5) * 18} cy={14 + Math.floor(k / 5) * 18} r="3.2" fill="#CFE3F3" />)}</g>,
  /* 5 */ <g key="5"><rect width="100" height="100" fill="#C65C6A" /><path d="M50 0A50 50 0 0 1 0 50H50Z" fill="#F9DAD8" /><path d="M50 100A50 50 0 0 1 100 50H50Z" fill="#F9DAD8" /><path d="M50 0A50 50 0 0 0 100 50H50Z" fill="#570F1D" /><path d="M50 100A50 50 0 0 0 0 50H50Z" fill="#570F1D" /></g>,
  /* 7 */ <g key="7"><rect width="100" height="100" fill="#CFE3F3" />{[0, 90, 180, 270].map((a) => <path key={a} d="M50 50C34 40 34 14 50 6C66 14 66 40 50 50Z" fill={a % 180 ? "#C65C6A" : "#570F1D"} transform={`rotate(${a} 50 50)`} />)}<circle cx="50" cy="50" r="6" fill="#FCF1DA" /></g>,
  /* 8 */ <g key="8"><rect width="100" height="100" fill="#CFE3F3" /><circle cx="42" cy="58" r="19" fill="none" stroke="#570F1D" strokeWidth="8" /><path d="M56 44L80 20M62 20H80V38" fill="none" stroke="#570F1D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /></g>,
];

/** A strip of bold geometric tiles (flowers, the symbol for women and girls, petals, dots) sliding past, above the footer. */
export function PatternStrip() {
  return (
    <div className="pat" aria-hidden>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <symbol id="pat-sym" viewBox="0 0 700 100">
          {T.map((g, i) => (
            <svg key={i} x={i * 100} y="0" width="100" height="100" viewBox="0 0 100 100">{g}</svg>
          ))}
        </symbol>
      </svg>
      <div className="pat-track">
        {Array.from({ length: 8 }, (_, i) => (
          <svg key={i} viewBox="0 0 700 100"><use href="#pat-sym" width="700" height="100" /></svg>
        ))}
      </div>
    </div>
  );
}
