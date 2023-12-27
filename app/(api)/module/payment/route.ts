import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { paymentSchema } from "@/app/_yup/moduleSchema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const moduleData = await request.json();
  moduleData.price = parseInt(moduleData.price);
  const supabase = createRouteHandlerClient<Database>({ cookies });
  try {
    await paymentSchema.validate(moduleData);
    const { data, error } = await supabase
      .from("module_purchase")
      .insert(moduleData)
       .select();
      console.log(error);
      if (error) {
        return NextResponse.json(error)
      }
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json(error)
    }
}

