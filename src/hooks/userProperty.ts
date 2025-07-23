'use client';

import { useState } from 'react';
import { NewProperty, Property } from '../types/property';
import { createProperty } from '../lib/api/property';

export const useCreateProperty = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addProperty = async (newProperty: NewProperty, accessToken: string) => {
    if (!newProperty) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await createProperty(newProperty, accessToken);
      setProperty(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { addProperty, property, isLoading };
};
