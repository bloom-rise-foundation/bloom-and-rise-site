"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import "@/styles/credential.css";

/** Credential ID lookup. Strips any whitespace (pasted IDs often carry some); the server matches case-insensitively. */
export function VerifyForm() {
  const router = useRouter();
  const [v, setV] = useState("");
  const [pending, start] = useTransition();
  return (
    <form
      className="vform"
      onSubmit={(e) => {
        e.preventDefault();
        const id = v.replace(/\s+/g, "");
        if (id) start(() => router.push(`/credential/${encodeURIComponent(id)}`));
      }}
    >
      <label htmlFor="cid" className="small">Credential ID</label>
      <div className="vrow">
        <input id="cid" value={v} onChange={(e) => setV(e.target.value.replace(/\s+/g, ""))} placeholder="The ID printed on the certificate" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={64} aria-describedby="cid-note" />
        <button className="btn" type="submit" disabled={pending || !v}><span key={pending ? "busy" : "idle"} className="swap">{pending && <span className="spin" aria-hidden />}{pending ? "Checking…" : "Verify"}</span></button>
      </div>
      <p id="cid-note" className="small note" style={{ marginTop: ".8rem" }}>Letters, numbers, dashes and underscores only.</p>
    </form>
  );
}

/** Copy-link and print buttons for a verified certificate. */
export function CredActions() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="cred-actions">
      <button
        type="button"
        className="btn ghost"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch { /* clipboard blocked: nothing to do */ }
        }}
      ><span key={copied ? "done" : "idle"} className="swap">{copied ? "Link copied" : "Copy link"}</span></button>
      <button type="button" className="btn ghost" onClick={() => window.print()}>Print</button>
    </div>
  );
}
