import { useState } from 'react';
import { NewTenantInvitation } from '../types/tenant-invitation';
import { sendInvitation } from '../lib/api/tenant-invitation';

export const useSendTenantInvitation = () => {
  const [isSentSuccess, setIsSentSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendTenantInvitation = async (
    newTenantInvitation: NewTenantInvitation,
    accessToken: string,
  ) => {
    if (!newTenantInvitation || !accessToken) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await sendInvitation(accessToken, newTenantInvitation);
      setIsSentSuccess(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  return { sendTenantInvitation, isSentSuccess, isLoading };
};
