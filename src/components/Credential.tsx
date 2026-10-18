"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/styles/credential.css";

const paths = { valid: "M14 25l8 8 14-16", revoked: "M16 16l16 16M32 16L16 32", missing: "M24 13v15M24 35v.5", error: "M24 13v15M24 35v.5" };

export function Badge({ kind }: { kind: keyof typeof paths }) {
  return (
    <motion.div className={`badge ${kind}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14 }}>
      <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden>
        <motion.path d={paths[kind]} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.3 }} />
      </svg>
    </motion.div>
  );
}

export function VerifyForm() {
  const router = useRouter();
  const [v, setV] = useState("");
  return (
    <form className="vform" onSubmit={(e) => { e.preventDefault(); const id = v.trim(); if (id) router.push(`/credential/${encodeURIComponent(id)}`); }}>
      <label htmlFor="cid" className="small">Credential ID</label>
      <div className="vrow">
        <input id="cid" value={v} onChange={(e) => setV(e.target.value)} placeholder="The ID printed on the certificate" autoComplete="off" spellCheck={false} />
        <button className="btn" type="submit">Verify</button>
      </div>
    </form>
  );
}
