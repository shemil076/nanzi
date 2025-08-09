import { useState } from 'react';
import { createBooking } from '../lib/api/booking';
import { Booking, NewBooking } from '../types/booking';

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
