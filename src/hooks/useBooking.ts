/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { createBooking, getPendingPropertyByTenant } from '../lib/api/booking';
import { Booking, BookingWithPropertyInfo, NewBooking } from '../types/booking';

export const useCreateBooking = () => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addBooking = async (newBooking: NewBooking, accessToken: string) => {
    if (!newBooking || !accessToken) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await createBooking(newBooking, accessToken);
      setBooking(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { addBooking, booking, isLoading };
};

export const usePendingPropertyBooking = (accessToken: string) => {
  const [pendingPropertyBooking, setPendingPropertyBooking] =
    useState<BookingWithPropertyInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPropertyToOccupyWithBooking = async () => {
    if (!accessToken) {
      setError(new Error('No access'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getPendingPropertyByTenant(accessToken);
      setPendingPropertyBooking(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadPropertyToOccupyWithBooking();
    }
  }, [accessToken]);

  return {
    pendingPropertyBooking,
    loadPropertyToOccupyWithBooking,
    isLoading,
    error,
  };
};
