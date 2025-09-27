"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingForm } from "@/components/booking-form"
import { AIPlanner } from "@/components/ai-planner"
import { VendorGrid } from "@/components/vendor-grid"

export default function BookPage() {
  const [order, setOrder] = useState<any>(null)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Book your event</h1>
        <p className="text-muted-foreground mt-2">
          Get an instant estimate, refine with AI suggestions, and reserve with one click.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="form">Booking</TabsTrigger>
            <TabsTrigger value="ai">AI Planner</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-6">
            <BookingForm onBooked={setOrder} />
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <AIPlanner />
          </TabsContent>

          <TabsContent value="vendors" className="mt-6">
            <VendorGrid />
          </TabsContent>
        </Tabs>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Unity Events?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Transparent pricing. Curated vendors. Built-in QR tickets and calendar export.</p>
              <p>No stress, no guesswork—just great events.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <a href="#ai">Ask the AI Planner</a>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  )
}
