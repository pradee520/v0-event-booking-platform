import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const payload = await req.json()
  const id = `B${Math.random().toString(36).slice(2, 10)}`
  const ref = `R${Math.random().toString(36).slice(2, 8)}`
  return NextResponse.json({ id, ref, received: payload }, { status: 201 })
}
