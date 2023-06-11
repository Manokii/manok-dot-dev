import { db } from "@/db/client"
import { NextResponse } from "next/server"

export async function GET() {
  const profile = await db.query.profiles.findFirst()
  if (!profile)
    return NextResponse.json(
      { success: false, message: "Not found", status: 404 },
      { status: 404 }
    )
  return NextResponse.json(profile ?? "not found")
}
