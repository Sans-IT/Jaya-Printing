import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const adminPath = "/admin/dashboard";
  const res = NextResponse.next();  

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const data = await fetch(`${req.nextUrl.origin}/api/user?id=${session?.user.id}`, {method: 'GET'}).then(res => res.json())
  
  if (!session || data?.role !== 'ADMIN') {
    if (req.nextUrl.pathname.startsWith(adminPath)) {
      const redirectUrl = req.nextUrl;
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
