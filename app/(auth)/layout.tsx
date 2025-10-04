import Link from 'next/link';
import Image from 'next/image';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='auth-layout'>
      <section className='auth-left-section scrollbar-hide-default'>
        <Link href='/' className='auth-logo flex items-center space-x-2 mb-8'>
          <Image
            src='/assets/icons/logo.svg'
            alt='Logo Trendify'
            width={32}
            height={32}
            className='h-8 w-8'
          />
          <span className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent'>
            Trendify
          </span>
        </Link>

        <div className='flex-1 pb-6 lg:pb-8'>{children}</div>
      </section>

      <section className='auth-right-section'>
        <div className='relative z-10 lg:mt-4 lg:mb-16'>
          <blockquote className='auth-blockquote'>
            Trendify a transformé ma liste de suivi en une liste gagnante. Les alertes sont
            précises, et je me sens plus confiant pour agir sur le marché.
          </blockquote>
          <div className='flex items-center justify-between'>
            <div>
              <cite className='auth-testimonial-author'>- John Doe.</cite>
              <p className='text-gray-500 max-md:text-xs'>Investisseur particulier </p>
            </div>
            <div className='flex items-center gap-0.5'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  src='/assets/icons/star.svg'
                  alt='Star'
                  key={star}
                  width={20}
                  height={20}
                  className='h-5 w-5'
                />
              ))}
            </div>
          </div>
        </div>

        <div className='relative flex-1'>
          <Image
            src='/assets/images/dashboard.png'
            alt='Dashboard Preview'
            width={1440}
            height={1150}
            className='auth-dashboard-preview absolute top-0'
          />
        </div>
      </section>
    </main>
  );
};
export default Layout;
