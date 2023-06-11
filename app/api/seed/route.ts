import { db } from "@/db/client"
import { profiles } from "@/db/schema/profile"
import { env } from "@/env.mjs"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token || token !== env.SEED_TOKEN) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  const res = await db.transaction(async (tx) => {
    const profile = await tx.query.profiles.findFirst()

    if (!profile) {
      await tx.insert(profiles).values({
        id: 1,
        firstName: "Jasper",
        lastName: "Concepcion",
        shortDescription: "",
        longDescription: "",
      })
    }

    const data = await tx.query.profiles.findFirst({
      with: { experience: true },
    })

    return data
  })

  return NextResponse.json({
    success: true,
    data: res,
  })
}
