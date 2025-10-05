'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import { CountrySelectField } from '@/components/forms/CountrySelectField';
import SelectField from '@/components/forms/SelectField';
import { INVESTMENT_GOALS, RISK_TOLERANCE_OPTIONS, PREFERRED_INDUSTRIES } from '@/lib/constants';
import FooterLink from '@/components/forms/FooterLink';
import { signUpWithEmail } from '@/lib/actions/auth.actions';
import { toast } from 'sonner';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'FR',
      investmentGoals: 'Croissance',
      riskTolerance: 'Moyen',
      preferredIndustry: 'Technologie',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) {
        toast.success('Inscription réussie');
        // Forcer un rechargement complet pour s'assurer que la session est bien chargée
        window.location.href = '/';
      } else if (result.error) {
        throw new Error(result.error);
      }
    } catch (e) {
      console.error(e);
      toast.error('Échec de l’inscription', {
        description: e instanceof Error ? e.message : 'Impossible de créer un compte.',
      });
    }
  };

  return (
    <>
      <h1 className='form-title'>Inscription et personnalisation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <InputField
          name='fullName'
          label='Nom complet'
          placeholder='John Doe'
          register={register}
          error={errors.fullName}
          validation={{ required: 'Le nom complet est requis', minLength: 2 }}
        />
        <InputField
          name='email'
          label='Adresse e-mail'
          placeholder='contact@exemple.com'
          register={register}
          error={errors.email}
          validation={{
            required: "L'adresse email est requise",
            pattern: /^\w+@\w+\.\w+$/,
            message: 'Veuillez entrer une adresse email valide',
          }}
        />
        <InputField
          name='password'
          label='Mot de passe'
          placeholder='Saisissez un mot de passe sécurisé'
          type='password'
          register={register}
          error={errors.password}
          validation={{
            required: 'Le mot de passe est requis',
            minLength: { value: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' },
          }}
        />
        <CountrySelectField
          name='country'
          label='Pays'
          control={control}
          error={errors.country}
          required
        />
        <SelectField
          name='investmentGoals'
          label="Objectifs d'investissement"
          placeholder="Sélectionnez votre objectif d'investissement"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name='riskTolerance'
          label='Tolérance au risque'
          placeholder='Sélectionnez votre niveau de risque'
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name='preferredIndustry'
          label='Secteur préféré'
          placeholder='Sélectionnez votre secteur préféré'
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button type='submit' disabled={isSubmitting} className='yellow-btn mt-5 w-full'>
          {isSubmitting ? 'Création du compte...' : 'Commencer votre parcours d’investissement'}
        </Button>
        <FooterLink text='Vous avez déjà un compte ?' linkText='Se connecter' href='/sign-in' />
      </form>
    </>
  );
};

export default SignUp;
