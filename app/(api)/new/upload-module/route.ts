import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { inspectify } from "../../../../utils/inspectify"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        console.log(data)
        console.log(data.body)
        const res = NextResponse
        return res
    } catch (error) {
        console.error((error as Error).message)
    }
}