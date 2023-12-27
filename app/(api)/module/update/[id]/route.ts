import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { Database } from "@/types/supabase";
import { moduleObject } from "@/app/_yup/moduleSchema";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  route: { params: { id: string } },
) {
  const id = route.params.id;
  const moduleData = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  try {
    await moduleObject.validate(moduleData);

    const { data, error } = await supabase
      .from("module")
      .update(moduleData)
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
      return NextResponse.json(error);
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
