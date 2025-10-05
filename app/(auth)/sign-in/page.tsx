'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { signInWithEmail } from '@/lib/actions/auth.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) {
        toast.success('Connexion réussie');
        router.push('/');
      }
    } catch (e) {
      console.error(e);
      toast.error('Échec de la connexion', {
        description: e instanceof Error ? e.message : 'Impossible de se connecter.',
      });
    }
  };

  return (
    <>
      <h1 className='form-title'>Content de vous revoir</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <InputField
          name='email'
          label='Adresse e-mail'
          placeholder='contact@exemple.com'
          register={register}
          error={errors.email}
          validation={{
            required: 'Une adresse e-mail est requise',
            pattern: {
              value: /^\w+@\w+\.\w+$/,
              message: 'Veuillez entrer une adresse e-mail valide',
            },
          }}
        />

        <InputField
          name='password'
          label='Mot de passe'
          placeholder='Entrez votre mot de passe'
          type='password'
          register={register}
          error={errors.password}
          validation={{
            required: 'Un mot de passe est requis',
            minLength: {
              value: 8,
              message: 'Le mot de passe doit contenir au moins 8 caractères',
            },
          }}
        />

        <Button type='submit' disabled={isSubmitting} className='yellow-btn mt-5 w-full'>
          {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
        </Button>

        <FooterLink text="Vous n'avez pas de compte ?" linkText='Créer un compte' href='/sign-up' />
      </form>
    </>
  );
};
export default SignIn;
