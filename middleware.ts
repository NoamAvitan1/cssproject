import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./types/supabase";

export async function middleware(req: NextRequest) {
  const protectedRoutes = [
    // "/new",
    "profile/update-profile",
    "/payment",
    "/test",
  ];

  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware

  if (protectedRoutes.find((r) => req.url.includes(r))) {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  }

  return res;
}
