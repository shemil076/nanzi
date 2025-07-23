/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { NewProperty, Property } from '../types/property';
import { createProperty, fetchProperties } from '../lib/api/property';

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

export const useProperties = (accessToken: string) => {
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProperties = async () => {
    if (!accessToken) {
      setError(new Error('No vehicle found'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchProperties(accessToken);
      setProperties(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadProperties();
    }
  }, [accessToken]);

  return { properties, loadProperties, isLoading, error };
};
