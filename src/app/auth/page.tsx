'use client';

import { useSearchParams } from 'next/navigation';
import SignUp from './components/signup';

const AuthPage = () => {
  const searchParams = useSearchParams();
  const isTenant = searchParams.get('isTenant') === 'true' ? true : false;

  return (
    <div className="flex flex-col items-center p-20">
      <SignUp isTenant={isTenant} />
    </div>
  );
};

export default AuthPage;
