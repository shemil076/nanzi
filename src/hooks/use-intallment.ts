import { useEffect, useState } from 'react';
import { Installment } from '../types/installment';
import { fetchInstallmentsByPayment } from '../lib/api/installment';

export const useInstallments = (accessToken: string, paymentId: string) => {
  const [installments, setInstallment] = useState<Installment[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadInstallments = async () => {
    if (!accessToken || !paymentId) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchInstallmentsByPayment(accessToken, paymentId);
      setInstallment(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && paymentId) {
      loadInstallments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, paymentId]);

  return { installments, loadInstallments, isLoading, error };
};
