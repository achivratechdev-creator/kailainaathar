// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getUserRole(req: NextRequest): string | null {
  // Option B (recommended): role cookie
  const roleFromCookie = req.cookies.get("user_role")?.value;
  if (roleFromCookie) return roleFromCookie;

  // Option A: role inside JWT (edge-safe decode)
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json);
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", pathname);

  /* ---------- 🛒 Cart (any logged-in user) ---------- */
  if (pathname.startsWith("/cart")) {
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
  }

  /* ---------- 🔐 Admin (admin only) ---------- */
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }

    const role = getUserRole(req);
    if (role !== "admin") {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/admin/:path*"],
};
