/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { User } from '../types/auth';
import { fetchUser } from '../lib/api/user';

export const useUser = (accessToken: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadUser = async () => {
    if (!accessToken) {
      setError(new Error('No access'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchUser(accessToken);
      setUser(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return { user, isLoading, error, loadUser };
};
