import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const moduleData = await request.json();
  console.log(moduleData);
  const supabase = createRouteHandlerClient<Database>({ cookies });
  try {
    const { data, error } = await supabase
      .from("module_purchase")
      .insert(moduleData)
      .select();
      console.log(data);
      if (error) {
        return NextResponse.json(error)
      }
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json(error)
    }
}

// console.log(request.headers.get("referer"))
