/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  fetchCurrentTenantsPayments,
  fetchPaymentsByProperty,
  fetchTenantsCurrentPendingPayment,
  payEntierPayment,
  payInstallment,
} from '../lib/api/payment';
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

export const useTenantsCurrentPendingPayment = (
  accessToken: string,
  propertyId: string,
) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPayment = async () => {
    if (!accessToken || !propertyId) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchTenantsCurrentPendingPayment(
        accessToken,
        propertyId,
      );
      setPayment(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (accessToken && propertyId) {
      fetchPayment();
    }
  }, [accessToken, propertyId]);

  return { payment, fetchPayment, isLoading, error };
};

export const usePayFullPayment = () => {
  const [paidPayment, setPaidPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const payFullPayment = async (
    accessToken: string,
    paymentId: string,
    amount: number,
  ) => {
    if (!accessToken || !paymentId) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const updatedPayment = await payEntierPayment(
        accessToken,
        paymentId,
        amount,
      );
      setPaidPayment(updatedPayment);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { payFullPayment, paidPayment, isLoading };
};

export const usePayInstallment = () => {
  const [paidPayment, setPaidPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const payInstallmentPayment = async (
    accessToken: string,
    paymentId: string,
    amount: number,
  ) => {
    if (!accessToken || !paymentId) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const updatedPayment = await payInstallment(
        accessToken,
        paymentId,
        amount,
      );
      setPaidPayment(updatedPayment);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { payInstallmentPayment, paidPayment, isLoading };
};
