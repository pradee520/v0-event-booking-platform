"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function AIPlanner() {
  const [loading, setLoading] = useState(false)
  const [brief, setBrief] = useState("Wedding at beachside venue, 150 guests, vegetarian menu focus, ₹12L budget.")
  const [result, setResult] = useState<string | null>(null)
  const [attendees, setAttendees] = useState(150)
  const [eventType, setEventType] = useState("wedding")
  const [budget, setBudget] = useState(1200000)

  const run = async () => {
    setLoading(true)
    setResult(null)
    const res = await fetch("/api/plan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ eventType, attendees, budget, brief }),
    })
    const data = await res.json()
    setResult(data.text)
    setLoading(false)
  }

  return (
    <Card id="ai">
      <CardHeader>
        <CardTitle>AI Event Planner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-sm block mb-1">Event type</label>
            <Input value={eventType} onChange={(e) => setEventType(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block mb-1">Attendees</label>
            <Input type="number" value={attendees} onChange={(e) => setAttendees(Number(e.target.value || 0))} />
          </div>
          <div>
            <label className="text-sm block mb-1">Budget (₹)</label>
            <Input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value || 0))} />
          </div>
        </div>
        <div>
          <label className="text-sm block mb-1">Brief</label>
          <Textarea rows={5} value={brief} onChange={(e) => setBrief(e.target.value)} />
        </div>
        <Button onClick={run} disabled={loading}>
          {loading ? "Planning..." : "Generate plan"}
        </Button>
        {result && <div className="mt-4 prose-sm max-w-none whitespace-pre-wrap">{result}</div>}
      </CardContent>
    </Card>
  )
}
