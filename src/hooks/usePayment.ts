/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { fetchCurrentTenantsPayments, fetchPaymentsByProperty } from '../lib/api/payment';
import { Payment } from '../types/payment';

export const usePaymentsByProperty = (
  accessToken: string,
  propertyId: string,
) => {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPayments = async () => {
    if (!accessToken || !propertyId) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchPaymentsByProperty(accessToken, propertyId);
      setPayments(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && propertyId) {
      loadPayments();
    }
  }, [accessToken, propertyId]);

  return { payments, loadPayments, isLoading, error };
};

export const useCurrentTenantsPayments = (
  accessToken: string,
  propertyId: string,
) => {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPayments = async () => {
    if (!accessToken || !propertyId) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchCurrentTenantsPayments(accessToken, propertyId);
      setPayments(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && propertyId) {
      loadPayments();
    }
  }, [accessToken, propertyId]);

  return { payments, loadPayments, isLoading, error };
};
