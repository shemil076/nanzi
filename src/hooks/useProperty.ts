/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import {
  NewProperty,
  PropertiesOverview,
  Property,
  UpdateProperty,
} from '../types/property';
import {
  createProperty,
  deletePropertyById,
  fetchProperties,
  fetchProperty,
  getCurrentTenant,
  getPropertiesOverview,
  getPropertyToOccupy,
  getTenantsResidence,
  updatePropertyById,
} from '../lib/api/property';
import { Tenant } from '../types/tenant';

export const useCreateProperty = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addProperty = async (newProperty: NewProperty, accessToken: string) => {
    if (!newProperty || !accessToken) {
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

export const useProperty = (accessToken: string, id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProperty = async () => {
    if (!accessToken || !id) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchProperty(accessToken, id);
      setProperty(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && id) {
      loadProperty();
    }
  }, [accessToken, id]);

  return { property, loadProperty, isLoading, error };
};

export const usePropertiesOVerview = (accessToken: string) => {
  const [propertiesOverview, setPropertiesOverview] =
    useState<PropertiesOverview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPropertiesOverview = async () => {
    if (!accessToken) {
      setError(new Error('No access'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getPropertiesOverview(accessToken);
      setPropertiesOverview(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadPropertiesOverview();
    }
  }, [accessToken]);

  return { propertiesOverview, loadPropertiesOverview, isLoading, error };
};

export const useUpdateProperty = () => {
  const [updatedProperty, setUpdatedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProperty = async (
    propertyId: string,
    updatedDetails: UpdateProperty,
    accessToken: string,
  ) => {
    if (!propertyId || !updatedDetails || !accessToken) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await updatePropertyById(
        accessToken,
        propertyId,
        updatedDetails,
      );
      setUpdatedProperty(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProperty, updatedProperty, isLoading };
};

export const useDeleteProperty = () => {
  const [deletedProperty, setDeletedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteProperty = async (propertyId: string, accessToken: string) => {
    if (!propertyId) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }
    try {
      setIsLoading(true);
      const data = await deletePropertyById(accessToken, propertyId);
      setDeletedProperty(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };
  return { deleteProperty, deletedProperty, isLoading, error };
};

export const useTenantsResidence = (accessToken: string) => {
  const [tenantsResidence, setTenantsResidence] = useState<Property | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProperty = async () => {
    if (!accessToken) {
      setError(new Error('No access'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getTenantsResidence(accessToken);
      setTenantsResidence(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadProperty();
    }
  }, [accessToken]);

  return { tenantsResidence, loadProperty, isLoading, error };
};

export const usePropertyToOccupy = (accessToken: string) => {
  const [propertyToOccupy, setPropertyToOccupy] = useState<Property | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPropertyToOccupy = async () => {
    if (!accessToken) {
      setError(new Error('No access'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getPropertyToOccupy(accessToken);
      setPropertyToOccupy(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadPropertyToOccupy();
    }
  }, [accessToken]);

  return { propertyToOccupy, loadPropertyToOccupy, isLoading, error };
};

export const useCurrentTenant = (accessToken: string, propertyId: string) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCurrentTenant = async () => {
    if (!accessToken || !propertyId) {
      setError(new Error('No access'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getCurrentTenant(accessToken, propertyId);
      setCurrentTenant(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchCurrentTenant();
    }
  }, [accessToken]);

  return { currentTenant, fetchCurrentTenant, isLoading, error };
};
