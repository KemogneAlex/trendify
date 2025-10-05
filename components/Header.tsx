import Link from 'next/link';
import Image from 'next/image';
import NavItems from './NavItems';
import UserDropdown from './UserDropdown';
import { searchStocks } from '@/lib/actions/finnhub.actions';

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();
  return (
    <header className='header sticky top-0'>
      <div className='header-wrapper container'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/assets/icons/logo.svg'
            alt='Trendify logo'
            width={32}
            height={32}
            className='h-8 w-8 cursor-pointer'
          />
          <span className='bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-xl font-bold text-transparent'>
            Trendify
          </span>
        </Link>
        <nav className='hidden sm:block'>
          <NavItems initialStocks={initialStocks} />
        </nav>

        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;
