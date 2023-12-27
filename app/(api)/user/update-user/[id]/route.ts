import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { profileSchema } from "@/app/_yup/moduleSchema";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  route: { params: { id: string } },
) {
   const requestUrl = new URL(request.url)
   const fd = await request.formData()
   const payload: any = {}
   fd.forEach((value, key) => (payload[key] = value));
  const user_id = route.params.id;
  const supabase = createRouteHandlerClient<Database>({ cookies });
  try {
    await profileSchema.validate(payload);
    const { data, error } = await supabase
      .from("profile")
      .update(payload)
      .eq("id", user_id)
      .select();
    if (error)
      return NextResponse.redirect(
        requestUrl + "?error=Failed to update user",
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        },
      );
    return NextResponse.redirect(
      requestUrl.origin +
        "/profile/id/" +
        user_id +
        "?success=User updated successfully",
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      },
    );
  } catch (error) {
      return NextResponse.redirect(
        requestUrl + "?error=Failed to update user",
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        },
      );
  }
}

