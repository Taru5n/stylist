import { NextResponse } from 'next/server';
import { generateOutfitDescription } from '@/lib/gemini';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { top, bottom, shoes, accessories, occasion, styleArchetype } = await req.json();

    const prompt = `
You are a high-fashion AI stylist. 
The user (Style Archetype: ${styleArchetype}) has composed the following outfit for occasion: ${occasion}:
- Top: ${top?.name} (${top?.color})
- Bottom: ${bottom?.name} (${bottom?.color})
- Shoes: ${shoes?.name} (${shoes?.color})
- Accessories: ${accessories?.map((a: { name: string }) => a.name).join(', ') || 'None'}

Please provide a highly descriptive, cinematic description of how this outfit looks on them, why it works for their archetype, and the overall vibe it projects. Format as a short paragraph.

Return JSON:
{
  "description": "string",
  "vibe": "string",
  "rating": number (1-10)
}
    `;

    const result = await generateOutfitDescription(prompt);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Try-on error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate outfit preview';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
