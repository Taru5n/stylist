import { NextResponse } from 'next/server';
import { analyzeMultipleImages } from '@/lib/gemini';
import { GEMINI_ANALYSIS_PROMPT } from '@/lib/constants';

export const maxDuration = 60; // Increase timeout for Gemini analysis

function getAnalysisErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : '';

  if (message.includes('429') || message.toLowerCase().includes('quota exceeded')) {
    return 'Gemini analysis is temporarily unavailable because this API key has no remaining quota. Enable billing or use a Gemini API key with available quota, then try again.';
  }

  if (message.toLowerCase().includes('api key')) {
    return 'Gemini could not authenticate this API key. Check GEMINI_API_KEY in .env.local and restart the development server.';
  }

  return message || 'Failed to analyze images. Please try again.';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { images, responses = {} } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    // Prepare prompt with questionnaire context
    const contextPrompt = `
${GEMINI_ANALYSIS_PROMPT}

Additional Context from User:
- Age: ${responses.age || 'Not specified'}
- Height: ${responses.height || 'Not specified'} cm
- Weight: ${responses.weight || 'Not specified'} kg
- Gender (if provided): ${responses.gender || 'Not specified'}

Please ensure your style personality and archetype assessment takes this context into account.
`;

    // Parse base64 images
    const imageParts = images.map((img: unknown) => {
      if (typeof img !== 'string' || !img.startsWith('data:')) {
        throw new Error('Each image must be a valid data URL.');
      }

      // Split "data:image/jpeg;base64,..."
      const [header, base64] = img.split(',');
      if (!base64) {
        throw new Error('One of the uploaded images is empty.');
      }
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
      return { base64, mimeType };
    });

    const result = await analyzeMultipleImages(imageParts, contextPrompt);

    // Give it a unique ID
    result.id = crypto.randomUUID();

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: getAnalysisErrorMessage(error) },
      { status: 500 }
    );
  }
}
