import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
  }

  const { url } = await req.json();
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing photo URL" }, { status: 400 });
  }

  // Only allow Skimmer blob storage URLs
  if (!url.includes("storwebproduction.blob.core.windows.net")) {
    return NextResponse.json({ error: "Only Skimmer photo URLs are supported" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are analyzing a photo taken by a pool service technician during a service visit. Analyze this photo and return a JSON object with these fields:

{
  "category": "One of: Equipment Dataplate, Pressure Gauge, Pool Overview, Filter Maintenance, Equipment Inspection, Basket/Skimmer, Gate/Security, Damage/Repair, Before Photo, After Photo, Chemistry/Readings, Vacuuming, Brushing/Surface, Timer/Automation, Spa/Hot Tub, Water Feature, or Other",
  "confidence": "High, Medium, or Low",
  "description": "2-3 sentence description of what you see in the photo",
  "equipment_detected": "List any equipment visible (brand, type, model if readable) or null",
  "ocr_text": "Any text visible in the photo (dataplate info, gauge readings, labels, stickers) or null",
  "condition_assessment": "Assessment of condition of what's shown (good/fair/poor/damaged) with brief explanation, or null if not applicable",
  "ai_insights": "1-2 actionable insights a pool service company could derive from this photo"
}

Return ONLY the JSON object, no markdown formatting.`,
              },
              {
                type: "image_url",
                image_url: { url, detail: "high" },
              },
            ],
          },
        ],
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `OpenAI API error: ${response.status}` }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No response from AI" }, { status: 502 });
    }

    // Parse the JSON response (strip any markdown code fences if present)
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const analysis = JSON.parse(cleaned);

    return NextResponse.json({ analysis, model: "gpt-4o", cost_estimate: "$0.01" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
