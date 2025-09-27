import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") || "Unity Events"
  const date = searchParams.get("date") || new Date().toISOString().slice(0, 10)
  const dt = date.replaceAll("-", "")
  const uid = `UE-${Math.random().toString(36).slice(2, 10)}@unity.events`

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Unity Events//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dt}T090000Z`,
    `DTSTART:${dt}T090000Z`,
    `DTEND:${dt}T170000Z`,
    `SUMMARY:${escapeICS(title)}`,
    "DESCRIPTION:Created with Unity Events",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  return new NextResponse(ics, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="unity-event-${dt}.ics"`,
    },
  })
}

function escapeICS(str: string) {
  return str.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n")
}
