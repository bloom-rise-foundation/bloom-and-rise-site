// Looks up credentials in Airtable (server-side only; the token never reaches the browser).
export type Credential = { id: string; name: string; type: string; role?: string; description?: string; issued?: string; revoked: boolean };
export type Lookup = { state: "found"; cred: Credential } | { state: "missing" } | { state: "error" };

const ORG = "Bloom & Rise Foundation";
const T = { participation: "Participation", heads: "Heads", volunteers: "Volunteers", projects: "Projects" };
const TITLES: Record<string, string> = {
  Volunteer: "Certificate of Volunteer Service",
  Head: "Certificate of Leadership",
  "Guest / Speaker": "Certificate of Contribution",
};

// Only these columns are ever requested. Emails, phones, notes and addresses are never fetched.
const P_FIELDS = ["Credential ID", "Certificate Status", "Certificate Type", "Certificate Issue Date", "Volunteer", "Projects", "Role / Title", "Contribution Description", "Hours Contributed"];
const H_FIELDS = ["Credential ID", "Head Name", "Role/Title", "Tenure Start Date", "Tenure End Date", "Department/Focus Area", "Certificate Issue Date"];

// Used only when Airtable env vars are not set, so you can test locally.
const DEMO: Credential[] = [
  { id: "demo-credential", name: "Sample Recipient", type: "Certificate of Leadership", role: "Founder", description: "A sample record so you can test this page before connecting Airtable.", issued: "2026-10-14", revoked: false },
];

// Letters, numbers, - and _ only. Also protects the Airtable filter formula from injection.
export const validId = (s: string) => /^[A-Za-z0-9_-]{3,64}$/.test(s);

type Rec = { id: string; fields: Record<string, unknown> };

const s = (v: unknown) => (v == null || v === "" ? undefined : Array.isArray(v) ? v.join(", ") : String(v));
const andJoin = (a: string[]) => (a.length > 1 ? `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}` : a[0] ?? "");
const monthYear = (d?: string) => {
  if (!d) return undefined;
  const t = new Date(d);
  return isNaN(+t) ? d : t.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
};

async function find(table: string, formula: string, fields: string[]): Promise<Rec | undefined> {
  const url = new URL(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`);
  url.searchParams.set("maxRecords", "1");
  url.searchParams.set("filterByFormula", formula);
  fields.forEach((f) => url.searchParams.append("fields[]", f));
  const res = await fetch(url, { headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` }, next: { revalidate: 60 } }); // refresh at most every 60s
  if (!res.ok) throw new Error(String(res.status));
  const data = (await res.json()) as { records?: Rec[] };
  return data.records?.[0];
}

// Linked-record fields come back as record IDs, so fetch just the one display column.
async function nameOf(table: string, link: unknown, field: string) {
  const rid = Array.isArray(link) ? link[0] : undefined;
  if (typeof rid !== "string" || !/^rec[A-Za-z0-9]{14}$/.test(rid)) return undefined;
  return s((await find(table, `RECORD_ID()='${rid}'`, [field]))?.fields[field]);
}

async function fromParticipation(r: Rec): Promise<Credential | undefined> {
  const f = r.fields;
  const st = s(f["Certificate Status"]);
  if (st !== "Issued" && st !== "Revoked") return undefined; // "Not Issued" or blank = not verifiable
  const type = s(f["Certificate Type"]) ?? "Volunteer";
  const [name, project] = await Promise.all([nameOf(T.volunteers, f["Volunteer"], "Volunteer Name"), nameOf(T.projects, f["Projects"], "Project Name")]);
  const role = s(f["Role / Title"]);
  const hours = f["Hours Contributed"];
  const proj = project ? ` to the ${project} project` : "";
  const description =
    s(f["Contribution Description"]) ??
    (type === "Head" ? `for outstanding leadership and dedicated service as ${role ?? "a leader"} of ${ORG}.`
      : type === "Guest / Speaker" ? `in grateful recognition of their valuable contribution as ${role ?? "a guest"}${proj}, hosted by ${ORG}.`
      : `for dedicated volunteer service${hours != null ? `, contributing ${hours} hours` : ""}${proj} with ${ORG}.`);
  return {
    id: s(f["Credential ID"]) ?? `CERT-${r.id.slice(-8).toUpperCase()}`,
    name: name ?? "",
    type: TITLES[type] ?? type,
    role: type === "Volunteer" ? undefined : role,
    description,
    issued: s(f["Certificate Issue Date"]),
    revoked: st === "Revoked",
  };
}

function fromHeads(r: Rec): Credential | undefined {
  const f = r.fields;
  const roles = andJoin(Array.isArray(f["Role/Title"]) ? (f["Role/Title"] as unknown[]).map(String) : []);
  const focus = s(f["Department/Focus Area"]);
  const from = monthYear(s(f["Tenure Start Date"]));
  const to = monthYear(s(f["Tenure End Date"]));
  return {
    id: s(f["Credential ID"]) ?? `CERT-${r.id.slice(-8).toUpperCase()}`,
    name: s(f["Head Name"]) ?? "",
    type: TITLES.Head,
    role: roles || undefined,
    description: `for outstanding leadership and dedicated service as ${roles || "a leader"} of ${ORG}${focus ? `, guiding ${focus}` : ""}${from ? (to ? `, from ${from} to ${to}` : `, since ${from}`) : ""}.`,
    issued: s(f["Certificate Issue Date"]),
    revoked: false,
  };
}

export async function lookupCredential(raw: string): Promise<Lookup> {
  const id = raw.trim();
  if (!validId(id)) return { state: "missing" };

  if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID) {
    const d = DEMO.find((c) => c.id.toLowerCase() === id.toLowerCase());
    return d ? { state: "found", cred: d } : { state: "missing" };
  }
  try {
    // "CERT-XXXXXXXX" is what the generator prints when Credential ID is blank (last 8 chars of the record ID).
    const formula = /^CERT-[A-Za-z0-9]{8}$/i.test(id)
      ? `UPPER(RIGHT(RECORD_ID(),8))='${id.slice(5).toUpperCase()}'`
      : `LOWER({Credential ID})='${id.toLowerCase()}'`;
    const [p, h] = await Promise.all([find(T.participation, formula, P_FIELDS), find(T.heads, formula, H_FIELDS)]);
    const cred = (p && (await fromParticipation(p))) || (h && fromHeads(h));
    return cred ? { state: "found", cred } : { state: "missing" };
  } catch {
    return { state: "error" };
  }
}