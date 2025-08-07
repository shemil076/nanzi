/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { User } from '../types/auth';
import { fetchTenants } from '../lib/api/tenant';

export const useSearchTenant = (accessToken: string, query: string) => {
  const [tenants, setTenants] = useState<User[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const searchTenants = async (email: string) => {
    if (!accessToken || !email) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const data = await fetchTenants(accessToken, email);
      setTenants(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query && query.trim() !== '') {
        searchTenants(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { tenants, searchTenants, isLoading, error };
};
