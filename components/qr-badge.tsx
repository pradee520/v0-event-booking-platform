"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

export function QRBadge({ bookingId, name }: { bookingId: string; name: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    QRCode.toCanvas(canvas, JSON.stringify({ bookingId, name }), {
      margin: 1,
      width: 160,
      color: { dark: "#0a0a0a", light: "#ffffff" },
    })
  }, [bookingId, name])

  return (
    <div className="flex items-center gap-3">
      <canvas ref={canvasRef} aria-label="QR ticket" />
      <div>
        <div className="text-xs text-muted-foreground">Booking</div>
        <div className="font-medium">{bookingId.slice(0, 8).toUpperCase()}</div>
      </div>
    </div>
  )
}
