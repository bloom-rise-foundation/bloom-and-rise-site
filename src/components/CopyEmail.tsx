"use client";
import { useState } from "react";

/** Copies the address to the clipboard and says so (polite live region). */
export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <>
      <button
        type="button"
        className="copy"
        data-done={done}
        onClick={async () => {
          try { await navigator.clipboard.writeText(email); setDone(true); window.setTimeout(() => setDone(false), 2200); } catch { /* clipboard blocked: the address is still a link */ }
        }}
      >
        {done ? "Copied" : "Copy the address"}
      </button>
      <span className="sr-only" role="status">{done ? "Address copied to the clipboard" : ""}</span>
    </>
  );
}
