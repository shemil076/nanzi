/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';

export default function DashboardRedirectPage() {
  const { user } = useAuth();
  const router = useRouter();

  console.log('user', user);

  useEffect(() => {
    console.log('user', user);
    // if (!user) return;

    if (user) {
      switch (user.role) {
        case 'ADMIN':
          router.push('/dashboard/admin');
          break;
        case 'LANDLORD':
          router.push('/dashboard/landlord');
          break;
        case 'TENANT':
          router.push('/dashboard/tenant');
          break;
        default:
          router.push('/unauthorized');
      }
    }
  }, [user]);

  return <p>Redirecting to your dashboard...</p>;
}
