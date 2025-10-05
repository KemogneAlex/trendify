import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE } from '@/lib/nodemailer/templates';
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);

  const mailOptions = {
    from: `"Trendify" <noreply@trendify.com>`,
    to: email,
    subject: `Bienvenue sur Trendify - votre outil boursier est prêt !`,
    text: 'Merci de rejoindre Trendify',
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace('{{date}}', date).replace(
    '{{newsContent}}',
    newsContent
  );

  const mailOptions = {
    from: `"Actualités Trendify" <noreply@trendify.com>`,
    to: email,
    subject: `📈 Résumé des actualités du marché - ${date}`,
    text: `Voici le résumé des actualités boursières du jour de Trendify`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
