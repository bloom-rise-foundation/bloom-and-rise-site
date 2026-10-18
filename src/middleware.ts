import { NextResponse, type NextRequest } from "next/server";

// On any host starting with "verify" (e.g. verify.bloomandrise.org), "/" shows the verify page.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("verify")) return NextResponse.rewrite(new URL("/verify", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/"] };
