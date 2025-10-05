'use server';
import { inngest } from '@/lib/inngest/client';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
        options: {
          // Force la connexion automatique après l'inscription
          autoSignIn: true
        }
      }
    });

    if (response) {
      await inngest.send({
        name: 'app/user.created',
        data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry },
      });
    }

    return {
      success: true,
      data: response,
      // Inclure les cookies de session dans la réponse
      cookies: response.cookies
    };
  } catch (e: any) {
    console.log('Échec de l\'inscription', e);
    return {
      success: false,
      error: e.message || 'Échec de l\'inscription'
    };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({ 
      body: { email, password },
      // Forcer une nouvelle session
      options: {
        isReauthenticate: false
      }
    });
    
    return { 
      success: true, 
      data: response,
      cookies: response.cookies
    };
  } catch (e: any) {
    console.log('Échec de la connexion', e);
    return { 
      success: false, 
      error: e.message || 'Échec de la connexion' 
    };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log('Échec de la déconnexion', e);
    return { success: false, error: 'Échec de la déconnexion' };
  }
};
