import { inngest } from '@/lib/inngest/client';
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from '@/lib/inngest/prompts';
import { sendNewsSummaryEmail, sendWelcomeEmail } from '@/lib/nodemailer';
import { getAllUsersForNewsEmail } from '@/lib/actions/user.actions';
import { getWatchlistSymbolsByEmail } from '@/lib/actions/watchlist.actions';
import { getNews } from '@/lib/actions/finnhub.actions';
import { getFormattedTodayDate } from '@/lib/utils';
export const sendSignUpEmail = inngest.createFunction(
  { id: 'sign-up-email' },
  { event: 'app/user.created' },
  async ({ event, step }) => {
    const userProfile = `
            - Pays: ${event.data.country}
            - Objectifs d'investissement: ${event.data.investmentGoals}
            - Tolérance au risque: ${event.data.riskTolerance}
            - Secteur préféré: ${event.data.preferredIndustry}
        `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

    const response = await step.ai.infer('generate-welcome-intro', {
      model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
      body: {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run('send-welcome-email', async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && 'text' in part ? part.text : null) ||
        "Merci d'avoir rejoint Trendify. Vous disposez maintenant des outils pour suivre les marchés et prendre des décisions éclairées.";

      {
        const {
          data: { email, name },
        } = event;

        return await sendWelcomeEmail({ email, name, intro: introText });
      }
    });

    return {
      success: true,
      message: 'Email de bienvenue envoyé avec succès',
    };
  }
);

export const sendDailyNewsSummary = inngest.createFunction(
  { id: 'daily-news-summary' },
  [{ event: 'app/send.daily.news' }, { cron: '0 12 * * *' }],
  async ({ step }) => {
    // Étape 1 : Récupérer tous les utilisateurs abonnés aux e-mails d’actualités
    const users = await step.run('get-all-users', getAllUsersForNewsEmail);

    if (!users || users.length === 0)
      return { success: false, message: 'Aucun utilisateur trouvé pour l’envoi des actualités.' };

    // Étape 2 : Pour chaque utilisateur, récupérer les symboles de sa watchlist et obtenir les actualités correspondantes (ou générales en cas d’absence)
    const results = await step.run('fetch-user-news', async () => {
      const perUser: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];
      for (const user of users as UserForNewsEmail[]) {
        try {
          const symbols = await getWatchlistSymbolsByEmail(user.email);
          let articles = await getNews(symbols);

          // Limiter à 6 articles par utilisateur
          articles = (articles || []).slice(0, 6);

          // Si aucun article trouvé, on récupère les actualités générales
          if (!articles || articles.length === 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }

          perUser.push({ user, articles });
        } catch (e) {
          console.error(
            'daily-news: erreur lors de la préparation des actualités pour',
            user.email,
            e
          );
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });

    // Étape 3 : Générer un résumé des actualités via l’IA
    const userNewsSummaries: { user: UserForNewsEmail; newsContent: string | null }[] = [];

    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          '{{newsData}}',
          JSON.stringify(articles, null, 2)
        );

        const response = await step.ai.infer(`summarize-news-${user.email}`, {
          model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
          body: {
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
          },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const newsContent =
          (part && 'text' in part ? part.text : null) || 'Aucune actualité disponible.';

        userNewsSummaries.push({ user, newsContent });
      } catch (e) {
        console.error('Échec du résumé des actualités pour :', user.email, e);
        userNewsSummaries.push({ user, newsContent: null });
      }
    }

    // Étape 4 : Envoyer les e-mails aux utilisateurs
    await step.run('send-news-emails', async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;

          return await sendNewsSummaryEmail({
            email: user.email,
            date: getFormattedTodayDate(),
            newsContent,
          });
        })
      );
    });

    return {
      success: true,
      message: 'Les e-mails du résumé des actualités quotidiennes ont été envoyés avec succès.',
    };
  }
);
