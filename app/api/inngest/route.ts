import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest/client';
import { sendDailyNewsSummary, sendSignUpEmail } from '@/lib/inngest/functions';

// Configuration du serveur Inngest
const handler = serve({
  client: inngest,
  functions: [sendSignUpEmail, sendDailyNewsSummary],
  // Désactive la vérification de signature en développement
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

// Log de configuration
console.log('=== Configuration Inngest ===');
console.log('Base URL:', process.env.INNGEST_BASE_URL || 'Non défini');
console.log('Event Key:', process.env.INNGEST_EVENT_KEY ? '***' : 'Non défini');
console.log('Signing Key:', process.env.INNGEST_SIGNING_KEY ? '***' : 'Non défini');
console.log('Fonctions chargées:', ['sendSignUpEmail', 'sendDailyNewsSummary']);

// Gestion des erreurs de configuration
if (!process.env.INNGEST_EVENT_KEY || !process.env.INNGEST_SIGNING_KEY) {
  console.error("❌ Erreur: Clés Inngest manquantes dans les variables d'environnement");
} else {
  console.log('✅ Configuration Inngest prête');
}

// Export de la méthode POST uniquement (requise par Inngest)
export const POST = handler;

// Désactive le cache pour cette route
export const dynamic = 'force-dynamic';
