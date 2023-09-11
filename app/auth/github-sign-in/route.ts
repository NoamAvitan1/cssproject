import supabase from "@/utils/supabaseConnection";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // const supabase = createServerComponentClient({ cookies })
    const requestUrl = new URL(request.url)

    const res = await supabase.auth.signInWithOAuth({
        provider: 'github',
    })

    const user = await supabase.auth.getUser()
    console.log(user);

    if (res.error) {
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=Could not authenticate user`,
          {
            // a 301 status is required to redirect from a POST to a GET route
            status: 301,
          }
        )
      }
    
      return NextResponse.redirect(requestUrl.origin, {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      })
}