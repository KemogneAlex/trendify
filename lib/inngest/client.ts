import { Inngest } from 'inngest';

// Configuration de base
const baseConfig = {
  id: 'trendify',
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } },
};

// Configuration spécifique par environnement
const config = {
  ...baseConfig,
  // URL racine du site (Inngest ajoutera automatiquement /api/inngest)
  baseUrl: 'https://trendify-beryl.vercel.app/api/inngest',

  // Activation du mode debug pour plus d'informations
  debug: true,
};

// Vérification de la configuration
if (!config.eventKey) {
  console.warn("Aucune clé d'événement Inngest trouvée. Vérifiez votre configuration.");
}

export const inngest = new Inngest(config);
