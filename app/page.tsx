"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <header className="border-b sticky top-0 z-40 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div aria-hidden className="size-6 rounded-md bg-primary" />
            <span className="font-semibold">Unity Events</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-primary">
              Features
            </a>
            <a href="#marketplace" className="hover:text-primary">
              Vendors
            </a>
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/book">
              <Button>Book an Event</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Event booking, reimagined</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-balance tracking-tight">
            Plan and book unforgettable events in minutes—not months
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            One platform to budget, discover vendors, get AI-powered plans, and share QR tickets. Built for weddings,
            birthdays, festivals, and everything in between.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book">
              <Button size="lg">Get Instant Estimate</Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="secondary">
                See how it works
              </Button>
            </a>
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li>• Real-time pricing calculator</li>
            <li>• AI itinerary & vendor list</li>
            <li>• QR tickets & check-in</li>
            <li>• One-click calendar export</li>
          </ul>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img
              src="/event-dashboard-mock-with-charts-and-booking-summa.jpg"
              alt="Event planner dashboard preview"
              className="w-full h-full object-cover"
            />
          </CardContent>
        </Card>
      </section>

      <section id="features" className="bg-secondary/40 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">Packed with features to help you win</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              ["Instant Estimates", "Adjust attendees and services to see live pricing and fees."],
              ["AI Event Planner", "Get curated timelines, layouts, and vendor suggestions."],
              ["Vendor Marketplace", "Browse verified vendors with ratings and transparent pricing."],
              ["QR Tickets & Check‑in", "Auto-generate scannable passes for guests and staff."],
              ["Referral Links", "Share your unique link and earn credits on bookings."],
              ["Calendar Export", "Add events to Google/Apple/Outlook with one click."],
            ].map(([title, desc]) => (
              <Card key={title}>
                <CardContent className="p-6">
                  <div className="size-8 rounded-md bg-accent mb-4" aria-hidden />
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="marketplace" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Featured vendors</h2>
        <p className="text-muted-foreground mt-2">
          Discover teams trusted for weddings, festivals, and corporate events.
        </p>
        {/* Lightweight vendor preview; full listing on booking page */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <img
                  src={`/vendor-photo-.jpg?height=180&width=320&query=Vendor%20photo%20${i}`}
                  alt={`Vendor ${i}`}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-4">
                  <div className="font-medium">Top Vendor #{i}</div>
                  <div className="text-sm text-muted-foreground">Catering • 4.9 ⭐ • From $599</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/book">
            <Button>Start planning</Button>
          </Link>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Unity Events</div>
          <div className="flex gap-6">
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
