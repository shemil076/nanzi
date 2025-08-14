import { useState } from 'react';
import {
  AcceptInvitationCredentials,
  InvitationWithBookingId,
  NewTenantInvitation,
} from '../types/tenant-invitation';
import {
  acceptInvitation,
  sendInvitation,
  verifyInvitation,
} from '../lib/api/tenant-invitation';

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
      return { success: false, err };
    } finally {
      setIsLoading(false);
    }
  };
  return { sendTenantInvitation, isSentSuccess, isLoading };
};

export const useVerifyTenantInvitationToken = () => {
  const [tenantInvitation, setTenantInvitation] =
    useState<InvitationWithBookingId | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const verifyTenantInvitation = async (token: string) => {
    if (!token) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await verifyInvitation(token);
      setTenantInvitation(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, err };
    } finally {
      setIsLoading(false);
    }
  };

  return { tenantInvitation, isLoading, error, verifyTenantInvitation };
};

export const useAcceptTenantInvitation = () => {
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const acceptTenantInvitation = async (
    acceptInvitationCredentials: AcceptInvitationCredentials,
  ) => {
    if (!acceptInvitationCredentials) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await acceptInvitation(acceptInvitationCredentials);
      setIsAccepted(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, err };
    } finally {
      setIsLoading(false);
    }
  };
  return { acceptTenantInvitation, isAccepted, isLoading };
};
