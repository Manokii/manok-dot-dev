import { db } from "@/db/client"
import { portfolios } from "@/db/schema"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

interface Props {
  params: {
    userId: string
  }
}

export async function GET(_: Request, { params }: Props) {
  const portfolio = await db.query.portfolios.findFirst({
    where: eq(portfolios.userId, params.userId),
  })

  if (!portfolio)
    return NextResponse.json({ success: false, message: "Not found", status: 404 }, { status: 404 })

  return NextResponse.json(portfolio ?? "not found")
}
