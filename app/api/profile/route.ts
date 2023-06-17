import { db } from "@/db/client"
import { NextResponse } from "next/server"

export async function GET() {
  const portfolio = await db.query.portfolios.findMany()
  if (!portfolio)
    return NextResponse.json(
      { success: false, message: "Not found", status: 404 },
      { status: 404 }
    )
  return NextResponse.json(portfolio ?? "not found")
}
