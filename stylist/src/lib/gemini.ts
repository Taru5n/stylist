import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  return new GoogleGenerativeAI(apiKey);
}

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

export async function analyzeImage(imageBase64: string, mimeType: string, prompt: string) {
  const model = getGeminiClient().getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings,
    generationConfig: {
      temperature: 0.4,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    },
  ]);

  const response = result.response;
  const text = response.text();
  return JSON.parse(text);
}

export async function analyzeMultipleImages(
  images: { base64: string; mimeType: string }[],
  prompt: string
) {
  const model = getGeminiClient().getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings,
    generationConfig: {
      temperature: 0.4,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
  });

  const parts: Parameters<typeof model.generateContent>[0] = [
    prompt,
    ...images.map((img) => ({
      inlineData: {
        data: img.base64,
        mimeType: img.mimeType,
      },
    })),
  ];

  const result = await model.generateContent(parts);
  const response = result.response;
  const text = response.text();
  return JSON.parse(text);
}

export async function generateRecommendations(prompt: string, context: string) {
  const model = getGeminiClient().getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 16384,
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent([
    prompt,
    `\n\nUser Context:\n${context}`,
  ]);

  const response = result.response;
  const text = response.text();
  return JSON.parse(text);
}

export async function generateOutfitDescription(prompt: string) {
  const model = getGeminiClient().getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings,
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return JSON.parse(text);
}
