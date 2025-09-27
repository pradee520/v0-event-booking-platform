import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: NextRequest) {
  const { eventType, attendees, budget, brief } = await req.json()

  const { text } = await generateText({
    model: "openai/gpt-5-mini",
    prompt: `
You are an elite event planner. Create a concise plan for a ${eventType} with ${attendees} attendees and a budget of ₹${budget}.
Return helpful bullet points with:
- Theme & layout ideas
- High-impact schedule (HH:MM format)
- Vendor shortlist categories (catering, decor, photography, music, venue) with what to ask
- Cost-saving tips and upgrade ideas
- 3 callouts for guest experience
Brief/context: ${brief}
Keep it under 2200 characters and easy to copy into notes.
    `.trim(),
  })

  return NextResponse.json({ text })
}
