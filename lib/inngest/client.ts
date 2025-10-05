import { Inngest } from 'inngest';

const baseConfig = {
  id: 'trendify',
  eventKey: process.env.INNGEST_EVENT_KEY,
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } },
};

// En production, utilisez l'URL de votre application Vercel
const config = process.env.NODE_ENV === 'production'
  ? { ...baseConfig, baseUrl: 'https://trendify-beryl.vercel.app/api/inngest' }
  : baseConfig;

export const inngest = new Inngest(config);
