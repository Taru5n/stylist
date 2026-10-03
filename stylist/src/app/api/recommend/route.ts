import { NextResponse } from 'next/server';
import { generateRecommendations } from '@/lib/gemini';
import { GEMINI_RECOMMENDATION_PROMPT } from '@/lib/constants';

export const maxDuration = 60; // Increase timeout for Gemini

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { analysisResult, responses } = body;

    if (!analysisResult) {
      return NextResponse.json({ error: 'No analysis result provided' }, { status: 400 });
    }

    // Build context for the prompt
    const context = `
Analysis Result:
${JSON.stringify(analysisResult, null, 2)}

User Context:
Age: ${responses.age || 'Not specified'}
Height: ${responses.height || 'Not specified'} cm
Weight: ${responses.weight || 'Not specified'} kg
Gender: ${responses.gender || 'Not specified'}

Focus: You must autonomously select styling recommendations that are centered on everyday/daily wear (casual, smart-casual, simple outings, travel, and regular work-wear). Avoid heavy, formal, or highly ornate clothing. Rely strictly on the physical feature analysis (color season, undertone, body proportions) rather than any stated preferences.
    `;

    const recommendations = await generateRecommendations(GEMINI_RECOMMENDATION_PROMPT, context);

    return NextResponse.json(recommendations);
  } catch (error: unknown) {
    console.error('Recommendation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
