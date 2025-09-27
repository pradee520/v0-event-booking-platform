"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Vendor = { id: string; name: string; category: string; priceFrom: number; rating: number }

const VENDORS: Vendor[] = [
  { id: "v1", name: "Seaside Caterers", category: "catering", priceFrom: 599, rating: 4.9 },
  { id: "v2", name: "Aura Decor", category: "decor", priceFrom: 399, rating: 4.8 },
  { id: "v3", name: "Frame It Photography", category: "photography", priceFrom: 499, rating: 4.7 },
  { id: "v4", name: "Groove DJs", category: "music", priceFrom: 349, rating: 4.6 },
  { id: "v5", name: "Vista Venues", category: "venue", priceFrom: 1499, rating: 4.9 },
  { id: "v6", name: "Green Leaf Catering", category: "catering", priceFrom: 699, rating: 4.8 },
]

export function VendorGrid() {
  const [filter, setFilter] = useState<string>("all")

  const categories = ["all", "catering", "decor", "photography", "music", "venue"] as const

  const filtered = useMemo(() => (filter === "all" ? VENDORS : VENDORS.filter((v) => v.category === filter)), [filter])

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c) => (
          <Button key={c} size="sm" variant={filter === c ? "default" : "secondary"} onClick={() => setFilter(c)}>
            {c[0].toUpperCase() + c.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={`/.jpg?height=160&width=320&query=${encodeURIComponent(v.name)}%20${v.category}`}
                alt={`${v.name} vendor`}
                className="w-full h-[160px] object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{v.name}</div>
                  <Badge>{v.rating} ★</Badge>
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {v.category} • from ₹{v.priceFrom}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
