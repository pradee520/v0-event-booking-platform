"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { QRBadge } from "./qr-badge"

type EstimateInput = {
  eventType: string
  attendees: number
  location: "standard" | "premium"
  services: {
    catering: boolean
    decor: boolean
    photography: boolean
    music: boolean
    venue: boolean
  }
  coupon?: string
  date?: string
  name?: string
  email?: string
}

const fetcher = async (key: string, payload: EstimateInput) => {
  const res = await fetch("/api/estimate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to estimate")
  return res.json()
}

export function BookingForm({ onBooked }: { onBooked?: (data: any) => void }) {
  const [form, setForm] = useState<EstimateInput>({
    eventType: "wedding",
    attendees: 120,
    location: "premium",
    services: { catering: true, decor: true, photography: true, music: true, venue: true },
    coupon: "",
    date: "",
    name: "",
    email: "",
  })

  const { data: estimate, isLoading } = useSWR(
    ["estimate", form] as any,
    ([, payload]) => fetcher("estimate", payload),
    {
      revalidateOnFocus: false,
    },
  )

  const total = estimate?.total ?? 0

  const canBook = useMemo(() => {
    return !!form.name && !!form.email && !!form.date && total > 0
  }, [form, total])

  const onSubmit = async () => {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...form, estimate }),
    })
    const data = await res.json()
    onBooked?.(data)
    alert(`Booking created with ID ${data.id}`)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my event",
          text: "Here’s our event booking—scan the QR code for your pass.",
          url: `${window.location.origin}/book?ref=${data.ref}`,
        })
      } catch {}
    }
  }

  const onExportCalendar = async () => {
    const params = new URLSearchParams({
      title: `${form.eventType} • Unity Events`,
      date: form.date || "",
    })
    const url = `/api/ics?${params.toString()}`
    window.open(url, "_blank")
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="order-2 lg:order-1">
        <CardHeader>
          <CardTitle>Booking details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Event type</Label>
              <Select value={form.eventType} onValueChange={(v) => setForm((f) => ({ ...f, eventType: v }))}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Event date</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="attendees">Attendees</Label>
              <Input
                id="attendees"
                type="number"
                min={1}
                value={form.attendees}
                onChange={(e) => setForm((f) => ({ ...f, attendees: Math.max(1, Number(e.target.value || 1)) }))}
              />
            </div>

            <div>
              <Label htmlFor="location">Location tier</Label>
              <Select value={form.location} onValueChange={(v: any) => setForm((f) => ({ ...f, location: v }))}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid sm:grid-cols-2 gap-4">
            {(["catering", "decor", "photography", "music", "venue"] as const).map((key) => (
              <label key={key} className="flex items-center justify-between rounded-md border p-3">
                <span className="capitalize">{key}</span>
                <Switch
                  checked={form.services[key]}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, services: { ...f.services, [key]: v } }))}
                />
              </label>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="coupon">Coupon code</Label>
              <Input
                id="coupon"
                value={form.coupon}
                onChange={(e) => setForm((f) => ({ ...f, coupon: e.target.value }))}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={onSubmit} disabled={!canBook || isLoading}>
              Checkout
            </Button>
            <Button onClick={onExportCalendar} variant="secondary">
              Add to Calendar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="order-1 lg:order-2 sticky top-20 h-fit">
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm">
            {estimate?.items?.map((it: any) => (
              <li key={it.label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{it.label}</span>
                <span>₹{it.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <Separator />
          <div className="flex items-center justify-between text-lg font-medium">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <div className="pt-2">
            <QRBadge bookingId={estimate?.previewId || "PREVIEW"} name={form.name || "Guest"} />
          </div>
          <p className="text-xs text-muted-foreground">Scan to preview a sample ticket for check‑in.</p>
        </CardContent>
      </Card>
    </div>
  )
}
