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
