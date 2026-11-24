// A template re-mounts on every navigation, so each page eases in with a small CSS animation (no JS animation library).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
