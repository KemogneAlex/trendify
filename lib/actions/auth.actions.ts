'use server';
import { inngest } from '@/lib/inngest/client';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
};

type AuthResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string | null;
  cookies?: Array<{
    name: string;
    value: string;
    options: CookieOptions;
  }>;
};

type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  cookies?: Array<{
    name: string;
    value: string;
    options: CookieOptions;
  }>;
  error?: string;
};

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
        // Options de connexion
        rememberMe: true, // Maintient la session
        // L'option autoSignIn n'est pas disponible dans cette version de l'API
      }
      // L'option autoSignIn n'est pas disponible à ce niveau
      // La connexion automatique devra être gérée côté client si nécessaire
    });

    if (response) {
      await inngest.send({
        name: 'app/user.created',
        data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry },
      });
    }

    const result: ApiResponse<AuthResponse> = {
      success: true,
      data: response
    };

    // Ajouter les cookies s'ils existent
    if (response && 'cookies' in response && response.cookies) {
      const cookies = Array.isArray(response.cookies) 
        ? response.cookies 
        : [response.cookies];
        
      result.cookies = cookies.map((cookie: { name: string; value: string; options?: Partial<CookieOptions> }) => ({
        name: cookie.name,
        value: cookie.value,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax' as const,
          path: '/',
          ...(cookie.options || {})
        }
      }));
    }

    return result;
  } catch (e: unknown) {
    console.log("Échec de l'inscription", e);
    
    // Vérifier si l'erreur concerne un utilisateur existant
    const errorMessage = e instanceof Error 
      ? e.message.includes('already exists') || e.message.includes('déjà existant')
        ? 'Un compte avec cette adresse email existe déjà. Essayez de vous connecter ou utilisez une autre adresse email.'
        : e.message
      : "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.";
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await auth.api.signInEmail({
      body: { 
        email, 
        password,
        // Options de connexion
        rememberMe: true // Maintient la session
      }
      // L'option isReauthenticate n'est pas disponible dans cette version de l'API
    });

    const result: ApiResponse<AuthResponse> = {
      success: true,
      data: response
    };

    // Ajouter les cookies s'ils existent
    if (response && 'cookies' in response && response.cookies) {
      const cookies = Array.isArray(response.cookies) 
        ? response.cookies 
        : [response.cookies];
        
      result.cookies = cookies.map((cookie: { name: string; value: string; options?: Partial<CookieOptions> }) => ({
        name: cookie.name,
        value: cookie.value,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax' as const,
          path: '/',
          ...(cookie.options || {})
        }
      }));
    }

    return result;
  } catch (e: unknown) {
    console.log('Échec de la connexion', e);
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Échec de la connexion',
    };
  }
};

export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (e) {
    console.log('Échec de la déconnexion', e);
    return { success: false, error: 'Échec de la déconnexion' };
  }
};
