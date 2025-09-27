import { type NextRequest, NextResponse } from "next/server"

type Body = {
  eventType: string
  attendees: number
  location: "standard" | "premium"
  services: Record<string, boolean>
  coupon?: string
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body

  const BASE: Record<string, number> = {
    wedding: 250000,
    birthday: 50000,
    corporate: 180000,
    festival: 300000,
    other: 75000,
  }

  const SERVICE_RATES: Record<string, number> = {
    catering: 1200, // per head
    decor: 60000,
    photography: 85000,
    music: 45000,
    venue: body.location === "premium" ? 200000 : 120000,
  }

  const items: { label: string; amount: number }[] = []

  // Base package by type
  items.push({ label: `${capitalize(body.eventType)} package`, amount: BASE[body.eventType] ?? BASE.other })

  // Per-head ops (staffing, logistics) 300 per head baseline
  items.push({ label: "Operations (per head)", amount: body.attendees * 300 })

  // Services
  Object.entries(body.services).forEach(([key, active]) => {
    if (!active) return
    if (key === "catering") {
      items.push({ label: "Catering (per head)", amount: body.attendees * SERVICE_RATES.catering })
    } else {
      items.push({ label: capitalize(key), amount: SERVICE_RATES[key] ?? 0 })
    }
  })

  // Location multiplier
  const subtotal = items.reduce((s, i) => s + i.amount, 0)
  const locationMultiplier = body.location === "premium" ? 1.15 : 1.0
  let total = Math.round(subtotal * locationMultiplier)

  // Coupons
  if (body.coupon?.toLowerCase() === "EARLYBIRD".toLowerCase()) {
    items.push({ label: "Coupon EARLYBIRD (-10%)", amount: Math.round(total * -0.1) })
    total = Math.round(total * 0.9)
  } else if (body.coupon?.toLowerCase() === "FRIENDS".toLowerCase()) {
    items.push({ label: "Referral FRIENDS (-₹10,000)", amount: -10000 })
    total = Math.max(0, total - 10000)
  }

  // Taxes and platform fee
  const gst = Math.round(total * 0.18)
  const platform = Math.round(Math.min(25000, total * 0.02))

  items.push({ label: "GST (18%)", amount: gst })
  items.push({ label: "Platform fee", amount: platform })

  const grand = total + gst + platform
  const previewId = `P${Math.random().toString(36).slice(2, 10)}`

  return NextResponse.json({ items, total: grand, previewId })
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
